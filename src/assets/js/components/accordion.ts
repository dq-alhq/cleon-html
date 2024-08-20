/*
 * Accordion
 */

import { afterTransition, dispatch } from '../utils'

interface IAccordionTreeViewStaticOptions {}
interface IAccordionTreeView {
    el: HTMLElement | null
    options?: IAccordionTreeViewStaticOptions
}
interface IAccordionOptions {}
interface IAccordion {
    options?: IAccordionOptions
    show(): void
    hide(): void
}
interface ICollectionItem<T> {
    id: string | number
    element: T
}

import BaseComponent from './base'

class Accordion extends BaseComponent<IAccordionOptions> implements IAccordion {
    private readonly toggle: HTMLElement | null
    public content: HTMLElement | null
    private readonly group: HTMLElement | null
    private readonly isAlwaysOpened: boolean

    static selectable: IAccordionTreeView[]

    constructor(el: HTMLElement, options?: IAccordionOptions, events?: {}) {
        super(el, options, events)

        this.toggle = this.el.querySelector('.accordion-toggle') || null
        this.content = this.el.querySelector('.accordion-content') || null
        this.group = this.el.closest('.accordion-group') || null
        this.isAlwaysOpened = this.group.hasAttribute('data-accordion-always-open') || false

        if (this.toggle && this.content) this.init()
    }

    private init() {
        this.createCollection(window.$AccordionCollection, this)

        this.toggle.addEventListener('click', (evt: Event) => {
            evt.stopPropagation()

            if (this.el.classList.contains('active')) {
                this.hide()
            } else {
                this.show()
            }
        })
    }

    // Public methods
    public show() {
        if (
            this.group &&
            !this.isAlwaysOpened &&
            this.group.querySelector(':scope > .accordion.active') &&
            this.group.querySelector(':scope > .accordion.active') !== this.el
        ) {
            const currentlyOpened = window.$AccordionCollection.find(
                (el) => el.element.el === this.group.querySelector(':scope > .accordion.active')
            )

            currentlyOpened.element.hide()
        }

        if (this.el.classList.contains('active')) return false

        this.el.classList.add('active')
        if (this?.toggle?.ariaExpanded) this.toggle.ariaExpanded = 'true'

        this.content.style.display = 'block'
        this.content.style.height = '0'
        setTimeout(() => {
            this.content.style.height = `${this.content.scrollHeight}px`
        })

        afterTransition(this.content, () => {
            this.content.style.display = 'block'
            this.content.style.height = ''

            this.fireEvent('open', this.el)
            dispatch('open..accordion', this.el, this.el)
        })
    }

    public hide() {
        if (!this.el.classList.contains('active')) return false

        this.el.classList.remove('active')
        if (this?.toggle?.ariaExpanded) this.toggle.ariaExpanded = 'false'

        this.content.style.height = `${this.content.scrollHeight}px`
        setTimeout(() => {
            this.content.style.height = '0'
        })

        afterTransition(this.content, () => {
            this.content.style.display = ''
            this.content.style.height = '0'

            this.fireEvent('close', this.el)
            dispatch('close..accordion', this.el, this.el)
        })
    }

    // Static methods
    static getInstance(target: HTMLElement | string, isInstance?: boolean) {
        const elInCollection = window.$AccordionCollection.find(
            (el) => el.element.el === (typeof target === 'string' ? document.querySelector(target) : target)
        )

        return elInCollection ? (isInstance ? elInCollection : elInCollection.element.el) : null
    }

    static show(target: HTMLElement) {
        const elInCollection = window.$AccordionCollection.find(
            (el) => el.element.el === (typeof target === 'string' ? document.querySelector(target) : target)
        )

        if (elInCollection && elInCollection.element.content.style.display !== 'block') elInCollection.element.show()
    }

    static hide(target: HTMLElement) {
        const elInCollection = window.$AccordionCollection.find(
            (el) => el.element.el === (typeof target === 'string' ? document.querySelector(target) : target)
        )

        if (elInCollection && elInCollection.element.content.style.display === 'block') elInCollection.element.hide()
    }

    static autoInit() {
        if (!window.$AccordionCollection) window.$AccordionCollection = []

        document.querySelectorAll('.accordion:not(.--prevent-on-load-init)').forEach((el: HTMLElement) => {
            if (!window.$AccordionCollection.find((elC) => (elC?.element?.el as HTMLElement) === el)) new Accordion(el)
        })
    }

    static treeView() {
        if (!document.querySelectorAll('.accordion-treeview-root').length) return false

        this.selectable = []

        document.querySelectorAll('.accordion-treeview-root').forEach((el: HTMLElement) => {
            const data = el?.getAttribute('data-accordion-options')
            const options: IAccordionTreeViewStaticOptions = data ? JSON.parse(data) : {}

            this.selectable.push({
                el,
                options: { ...options }
            })
        })

        if (this.selectable.length)
            this.selectable.forEach((item) => {
                const { el } = item

                el.querySelectorAll('.accordion-selectable').forEach((_el: HTMLElement) => {
                    _el.addEventListener('click', (evt: Event) => {
                        evt.stopPropagation()

                        this.toggleSelected(item, _el)
                    })
                })
            })
    }

    static toggleSelected(root: IAccordionTreeView, item: HTMLElement) {
        if (item.classList.contains('selected')) item.classList.remove('selected')
        else {
            root.el
                .querySelectorAll('.accordion-selectable')
                .forEach((el: HTMLElement) => el.classList.remove('selected'))
            item.classList.add('selected')
        }
    }

    // Backward compatibility
    static on(evt: string, target: HTMLElement, cb: Function) {
        const elInCollection = window.$AccordionCollection.find(
            (el) => el.element.el === (typeof target === 'string' ? document.querySelector(target) : target)
        )

        if (elInCollection) elInCollection.element.events[evt] = cb
    }
}

declare global {
    interface Window {
        Accordion: Function
        $AccordionCollection: ICollectionItem<Accordion>[]
    }
}

window.addEventListener('load', () => {
    Accordion.autoInit()

    if (document.querySelectorAll('.accordion-treeview-root').length) Accordion.treeView()
})

if (typeof window !== 'undefined') {
    window.Accordion = Accordion
}

export default Accordion
