/*
 * TogglePassword
 */

import { classToClassList, debounce, htmlToElement } from '../utils'
import BaseComponent from './base'

interface ISearchItemTemplate {
    type: string
    markup: string
}
interface ISearchItem {
    title: string
    url: string
    description: string
    categories?: string
    type?: string
}
interface ISearchByJsonOptions {
    jsonUrl: string
    minChars?: number
    dropdownTemplate?: string
    dropdownClasses?: string
    dropdownItemTemplate?: string
    dropdownItemTemplatesByType?: ISearchItemTemplate[]
    dropdownItemClasses?: string
    highlightedTextTagName?: string
    highlightedTextClasses?: string
}
interface ISearchByJson {
    options?: ISearchByJsonOptions
}
interface ICollectionItem<T> {
    id: string | number
    element: T
}

class SearchByJson extends BaseComponent<ISearchByJsonOptions, HTMLInputElement> implements ISearchByJson {
    private readonly jsonUrl: string
    private readonly minChars: number

    private json: ISearchItem[]
    private result: ISearchItem[]
    private val: string

    private readonly dropdownTemplate: string
    private readonly dropdownClasses: string
    private readonly dropdownItemTemplate: string
    private readonly dropdownItemTemplatesByType: ISearchItemTemplate[]
    private readonly dropdownItemClasses: string
    private readonly highlightedTextTagName: string
    private readonly highlightedTextClasses: string

    private dropdown: HTMLElement | null

    constructor(el: HTMLInputElement, options?: ISearchByJsonOptions) {
        super(el, options)

        const data = el.getAttribute('data-search-by-json')
        const dataOptions: ISearchByJsonOptions = data ? JSON.parse(data) : {}
        const concatOptions = {
            ...dataOptions,
            ...options
        }

        this.jsonUrl = concatOptions.jsonUrl
        this.minChars = concatOptions.minChars || 3
        this.dropdownTemplate = concatOptions.dropdownTemplate || '<div></div>'
        this.dropdownClasses =
            concatOptions.dropdownClasses ||
            'absolute top-full z-[1] w-full bg-white border border-gray-200 rounded-md hidden mt-2'
        this.dropdownItemTemplate = concatOptions.dropdownItemTemplate || '<div></div>'
        this.dropdownItemTemplatesByType = concatOptions.dropdownItemTemplatesByType || null
        this.dropdownItemClasses =
            concatOptions.dropdownItemClasses ||
            'py-2 px-4 w-full cursor-pointer text-sm hover:bg-gray-300 hover:text-black'
        this.highlightedTextTagName = concatOptions.highlightedTextTagName || 'u'
        this.highlightedTextClasses = concatOptions.highlightedTextClasses || 'bg-green-200'

        if (this.jsonUrl) this.fetchData().then(() => this.init())
    }

    private init() {
        this.createCollection(window.$SearchByJsonCollection, this)

        this.buildDropdown()

        this.el.addEventListener(
            'input',
            debounce((evt: InputEvent) => {
                this.val = (evt.target as HTMLInputElement).value

                if (this.val.length > this.minChars) {
                    this.searchData(this.val)
                } else {
                    this.result = []
                }

                if (this.result.length) {
                    this.dropdown.classList.remove('hidden')
                } else {
                    this.dropdown.classList.add('hidden')
                }

                this.buildItems()
            })
        )
    }

    private async fetchData() {
        await fetch(this.jsonUrl)
            .then((data) => data.json())
            .then((data) => (this.json = data))
    }

    private searchData(val: string) {
        this.result = this.json.filter((el) => {
            const value = val.toLowerCase()
            const title = el.title.toLowerCase()
            const description = el.description.toLowerCase()

            return title.includes(value) || description.includes(value)
        })
    }

    private buildDropdown() {
        this.dropdown = htmlToElement(this.dropdownTemplate)
        if (this.dropdownClasses) classToClassList(this.dropdownClasses, this.dropdown)

        this.el.after(this.dropdown)
    }

    private buildItems() {
        this.dropdown.innerHTML = ''

        this.result.forEach((el) => {
            const link = htmlToElement(`<a class="block" href="${el.url}" target="_blank"></a>`)
            link.append(this.itemTemplate(el))
            this.dropdown.append(link)
        })
    }

    private itemTemplate(el: ISearchItem) {
        const re = new RegExp(this.val, 'gi')
        const newTitle = el.title.replace(
            re,
            `<${this.highlightedTextTagName} class="inline-block ${this.highlightedTextClasses}">${this.val}</${this.highlightedTextTagName}>`
        )
        const newDescription = el.description.replace(
            re,
            `<${this.highlightedTextTagName} class="inline-block ${this.highlightedTextClasses}">${this.val}</${this.highlightedTextTagName}>`
        )
        const templateByType = this.dropdownItemTemplatesByType
            ? this.dropdownItemTemplatesByType.find((template) => template.type === el.type)
            : null
        const template = templateByType
            ? htmlToElement(templateByType.markup)
            : htmlToElement(this.dropdownItemTemplate)
        if (this.dropdownItemClasses) classToClassList(this.dropdownItemClasses, template)
        const title: HTMLElement = template.querySelector('[data-title]')
        if (title) title.append(htmlToElement(`<span>${newTitle}</span>`))
        else template.append(htmlToElement(`<span>${newTitle}</span>`))
        const description: HTMLElement = template.querySelector('[data-description]')
        if (description) description.append(htmlToElement(`<span>${newDescription}</span>`))
        else if (!templateByType) {
            const br = htmlToElement('<br>')
            template.append(br)
            template.append(htmlToElement(`<span>${newDescription}</span>`))
        }

        return template
    }

    // Static method
    static getInstance(target: HTMLElement | string) {
        const elInCollection = window.$SearchByJsonCollection.find(
            (el) => el.element.el === (typeof target === 'string' ? document.querySelector(target) : target)
        )

        return elInCollection ? elInCollection.element : null
    }

    static autoInit() {
        if (!window.$SearchByJsonCollection) window.$SearchByJsonCollection = []

        document
            .querySelectorAll('[data-search-by-json]:not(.--prevent-on-load-init)')
            .forEach((el: HTMLInputElement) => {
                if (!window.$SearchByJsonCollection.find((elC) => (elC?.element?.el as HTMLElement) === el))
                    new SearchByJson(el)
            })
    }
}

declare global {
    interface Window {
        SearchByJson: Function
        $SearchByJsonCollection: ICollectionItem<SearchByJson>[]
    }
}

window.addEventListener('load', () => {
    SearchByJson.autoInit()
})

if (typeof window !== 'undefined') {
    window.SearchByJson = SearchByJson
}

export default SearchByJson
