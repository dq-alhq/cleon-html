/*
 * DataTable
 */

import { Api } from 'datatables.net'
import { Config } from 'datatables.net-dt'
import { classToClassList, debounce, htmlToElement } from '../utils'
import BaseComponent from './base'

interface IDataTablePagingOptions {
    pageBtnClasses?: string
}
interface IDataTableRowSelectingOptions {
    selectAllSelector?: string
    individualSelector?: string
}
interface IDataTableOptions extends Config {
    pageLength: number
    rowSelectingOptions?: IDataTableRowSelectingOptions
    pagingOptions?: IDataTablePagingOptions
}
interface IDataTable {
    options?: IDataTableOptions
}
interface ICollectionItem<T> {
    id: string | number
    element: T
}

declare var DataTable: any

interface IColumnDef {
    targets: number
    orderable: boolean
}

class Datatable extends BaseComponent<IDataTableOptions> implements IDataTable {
    private readonly concatOptions: IDataTableOptions

    private dataTable: Api

    private readonly table: HTMLTableElement

    private readonly search: HTMLElement | null

    private readonly pageEntities: HTMLSelectElement | HTMLInputElement | null

    private readonly paging: HTMLElement | null
    private readonly pagingPrev: HTMLElement | null
    private readonly pagingNext: HTMLElement | null
    private readonly pagingPages: HTMLElement | null

    private readonly info: HTMLElement | null
    private readonly infoFrom: HTMLElement | null
    private readonly infoTo: HTMLElement | null
    private readonly infoLength: HTMLElement | null

    private rowSelectingAll: HTMLElement | null
    private readonly rowSelectingIndividual: string | null

    private readonly maxPagesToShow: number
    private readonly isRowSelecting: boolean
    private readonly pageBtnClasses: string | null

    constructor(el: HTMLElement, options?: IDataTableOptions, events?: {}) {
        super(el, options, events)

        this.el = typeof el === 'string' ? document.querySelector(el) : el

        // Exclude columns from ordering
        const columnDefs: IColumnDef[] = []
        Array.from(this.el.querySelectorAll('thead th, thead td')).forEach((th: HTMLElement, ind: number) => {
            if (th.classList.contains('--exclude-from-ordering'))
                columnDefs.push({
                    targets: ind,
                    orderable: false
                })
        })

        const data = this.el.getAttribute('data-datatable')
        const dataOptions: IDataTableOptions = data ? JSON.parse(data) : {}

        this.concatOptions = {
            // @ts-ignore
            searching: true,
            lengthChange: false,
            order: [],
            columnDefs: [...columnDefs],
            ...dataOptions,
            ...options
        }

        this.table = this.el.querySelector('table')

        this.search = this.el.querySelector('[data-datatable-search]') ?? null

        this.pageEntities = this.el.querySelector('[data-datatable-page-entities]') ?? null

        this.paging = this.el.querySelector('[data-datatable-paging]') ?? null
        this.pagingPrev = this.el.querySelector('[data-datatable-paging-prev]') ?? null
        this.pagingNext = this.el.querySelector('[data-datatable-paging-next]') ?? null
        this.pagingPages = this.el.querySelector('[data-datatable-paging-pages]') ?? null

        this.info = this.el.querySelector('[data-datatable-info]') ?? null
        this.infoFrom = this.el.querySelector('[data-datatable-info-from]') ?? null
        this.infoTo = this.el.querySelector('[data-datatable-info-to]') ?? null
        this.infoLength = this.el.querySelector('[data-datatable-info-length]') ?? null

        if (this.concatOptions?.rowSelectingOptions)
            this.rowSelectingAll =
                (this.concatOptions?.rowSelectingOptions?.selectAllSelector
                    ? document.querySelector(this.concatOptions?.rowSelectingOptions?.selectAllSelector)
                    : document.querySelector('[data-datatable-row-selecting-all]')) ?? null
        if (this.concatOptions?.rowSelectingOptions)
            this.rowSelectingIndividual =
                this.concatOptions?.rowSelectingOptions?.individualSelector ??
                '[data-datatable-row-selecting-individual]' ??
                null

        if (this.pageEntities) this.concatOptions.pageLength = parseInt(this.pageEntities.value)

        this.maxPagesToShow = 3
        this.isRowSelecting = !!this.concatOptions?.rowSelectingOptions
        this.pageBtnClasses = this.concatOptions?.pagingOptions?.pageBtnClasses ?? null

        this.init()
    }

    private init() {
        this.createCollection(window.$DataTableCollection, this)

        this.initTable()

        if (this.search) this.initSearch()

        if (this.pageEntities) this.initPageEntities()

        if (this.paging) this.initPaging()
        if (this.pagingPrev) this.initPagingPrev()
        if (this.pagingNext) this.initPagingNext()
        if (this.pagingPages) this.buildPagingPages()

        if (this.info) this.initInfo()

        if (this.isRowSelecting) this.initRowSelecting()
    }

    private initTable() {
        this.dataTable = new DataTable(this.table, this.concatOptions)

        if (this.isRowSelecting) this.triggerChangeEventToRow()

        this.dataTable.on('draw', () => {
            if (this.isRowSelecting) this.updateSelectAllCheckbox()
            if (this.isRowSelecting) this.triggerChangeEventToRow()
            this.updateInfo()
            this.updatePaging()
        })
    }

    // Search
    private initSearch() {
        this.search.addEventListener(
            'input',
            debounce((evt: InputEvent) => this.onSearchInput((evt.target as HTMLInputElement).value))
        )
    }

    private onSearchInput(val: string) {
        this.dataTable.search(val).draw()
    }

    // Page entities
    private initPageEntities() {
        this.pageEntities.addEventListener('change', (evt: Event) =>
            this.onEntitiesChange(parseInt((evt.target as HTMLSelectElement).value))
        )
    }

    private onEntitiesChange(entities: number) {
        this.dataTable.page.len(entities).draw()
    }

    // Info
    private initInfo() {
        if (this.infoFrom) this.initInfoFrom()
        if (this.infoTo) this.initInfoTo()
        if (this.infoLength) this.initInfoLength()
    }

    private initInfoFrom() {
        const { start } = this.dataTable.page.info()

        this.infoFrom.innerText = `${start + 1}`
    }

    private initInfoTo() {
        const { end } = this.dataTable.page.info()

        this.infoTo.innerText = `${end}`
    }

    private initInfoLength() {
        const { recordsTotal } = this.dataTable.page.info()

        this.infoLength.innerText = `${recordsTotal}`
    }

    private updateInfo() {
        this.initInfo()
    }

    // Paging
    private initPaging() {
        this.hidePagingIfSinglePage()
    }

    private hidePagingIfSinglePage() {
        const { pages } = this.dataTable.page.info()

        if (pages < 2) {
            this.paging.classList.add('hidden')
            this.paging.style.display = 'none'
        } else {
            this.paging.classList.remove('hidden')
            this.paging.style.display = ''
        }
    }

    private initPagingPrev() {
        this.pagingPrev.addEventListener('click', () => {
            this.onPrevClick()
        })
    }

    private onPrevClick() {
        this.dataTable.page('previous').draw('page')
    }

    private disablePagingArrow(el: HTMLElement, statement: boolean) {
        if (statement) {
            el.classList.add('disabled')
            el.setAttribute('disabled', 'disabled')
        } else {
            el.classList.remove('disabled')
            el.removeAttribute('disabled')
        }
    }

    private initPagingNext() {
        this.pagingNext.addEventListener('click', () => {
            this.onNextClick()
        })
    }

    private onNextClick() {
        this.dataTable.page('next').draw('page')
    }

    private buildPagingPages() {
        this.updatePaging()
    }

    private updatePaging() {
        const { page, pages, length } = this.dataTable.page.info()
        const totalRecords = this.dataTable.rows({ search: 'applied' }).count()
        const totalPages = Math.ceil(totalRecords / length)
        const currentPage = page + 1

        let startPage = Math.max(1, currentPage - Math.floor(this.maxPagesToShow / 2))
        let endPage = Math.min(totalPages, startPage + (this.maxPagesToShow - 1))

        if (endPage - startPage + 1 < this.maxPagesToShow) {
            startPage = Math.max(1, endPage - this.maxPagesToShow + 1)
        }

        this.pagingPages.innerHTML = ''

        if (startPage > 1) {
            this.buildPagingPage(1)

            if (startPage > 2) {
                this.pagingPages.appendChild(htmlToElement(`<span class="ellipsis">...</span>`))
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            this.buildPagingPage(i)
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                this.pagingPages.appendChild(htmlToElement(`<span class="ellipsis">...</span>`))
            }

            this.buildPagingPage(totalPages)
        }

        this.disablePagingArrow(this.pagingPrev, page === 0)
        this.disablePagingArrow(this.pagingNext, page === pages - 1)
        this.hidePagingIfSinglePage()
    }

    private buildPagingPage(counter: number) {
        const { page } = this.dataTable.page.info()
        const pageEl = htmlToElement(`<button type="button"></button>`)
        pageEl.innerText = `${counter}`
        pageEl.setAttribute('data-page', `${counter}`)
        if (this.pageBtnClasses) classToClassList(this.pageBtnClasses, pageEl)
        if (page === counter - 1) pageEl.classList.add('active')

        pageEl.addEventListener('click', () => this.onPageClick(counter))

        this.pagingPages.append(pageEl)
    }

    private onPageClick(counter: number) {
        this.dataTable.page(counter - 1).draw('page')
    }

    // Select row
    private initRowSelecting() {
        this.rowSelectingAll.addEventListener('change', () => this.onSelectAllChange())
    }

    private triggerChangeEventToRow() {
        this.table.querySelectorAll(`tbody ${this.rowSelectingIndividual}`).forEach((el) => {
            el.addEventListener('change', () => {
                this.updateSelectAllCheckbox()
            })
        })
    }

    private onSelectAllChange() {
        let isChecked = (this.rowSelectingAll as HTMLInputElement).checked
        const visibleRows = Array.from(this.dataTable.rows({ page: 'current', search: 'applied' }).nodes())

        visibleRows.forEach((el) => {
            const checkbox = el.querySelector(this.rowSelectingIndividual)

            if (checkbox) checkbox.checked = isChecked
        })

        this.updateSelectAllCheckbox()
    }

    private updateSelectAllCheckbox() {
        const searchRelatedItems = this.dataTable.rows({ search: 'applied' }).count()

        if (!searchRelatedItems) {
            ;(this.rowSelectingAll as HTMLInputElement).checked = false

            return false
        }

        let isChecked = true
        const visibleRows = Array.from(
            this.dataTable
                .rows({
                    page: 'current',
                    search: 'applied'
                })
                .nodes()
        )

        visibleRows.forEach((el) => {
            const checkbox = el.querySelector(this.rowSelectingIndividual)

            if (checkbox && !checkbox.checked) {
                isChecked = false

                return false
            }
        })
        ;(this.rowSelectingAll as HTMLInputElement).checked = isChecked
    }

    // Static methods
    static getInstance(target: HTMLElement | string, isInstance?: boolean) {
        const elInCollection = window.$DataTableCollection.find(
            (el) => el.element.el === (typeof target === 'string' ? document.querySelector(target) : target)
        )

        return elInCollection ? (isInstance ? elInCollection : elInCollection.element.el) : null
    }

    static autoInit() {
        if (!window.$DataTableCollection) window.$DataTableCollection = []

        document.querySelectorAll('[data-datatable]:not(.--prevent-on-load-init)').forEach((el: HTMLElement) => {
            if (!window.$DataTableCollection.find((elC) => (elC?.element?.el as HTMLElement) === el)) new DataTable(el)
        })
    }
}

declare global {
    interface Window {
        DataTable: Function
        $DataTableCollection: ICollectionItem<Datatable>[]
    }
}

window.addEventListener('load', () => {
    let jQuery: any
    if (document.querySelectorAll('[data-datatable]:not(.--prevent-on-load-init)').length) {
        if (typeof jQuery === 'undefined')
            console.error('DataTable: jQuery is not available, please add it to the page.')
        if (typeof DataTable === 'undefined')
            console.error('DataTable: DataTable is not available, please add it to the page.')
    }

    if (typeof DataTable !== 'undefined' && typeof jQuery !== 'undefined') DataTable.autoInit()
})

if (typeof window !== 'undefined') {
    window.DataTable = DataTable
}

export default Datatable
