/*
 * CopyMarkup
 */

import { dispatch } from '../utils'
import BaseComponent from './base'

interface ICopyMarkupOptions {
    targetSelector: string
    wrapperSelector: string
    limit?: number
}
interface ICopyMarkup {
    options?: ICopyMarkupOptions
}
interface ICollectionItem<T> {
    id: string | number
    element: T
}

class CopyMarkup extends BaseComponent<ICopyMarkupOptions> implements ICopyMarkup {
    private readonly targetSelector: string | null
    private readonly wrapperSelector: string | null
    private readonly limit: number | null

    private target: HTMLElement | null
    private wrapper: HTMLElement | null
    private items: HTMLElement[] | null

    constructor(el: HTMLElement, options?: ICopyMarkupOptions) {
        super(el, options)

        const data = el.getAttribute('data-copy-markup')
        const dataOptions: ICopyMarkupOptions = data ? JSON.parse(data) : {}
        const concatOptions = {
            ...dataOptions,
            ...options
        }

        this.targetSelector = concatOptions?.targetSelector || null
        this.wrapperSelector = concatOptions?.wrapperSelector || null
        this.limit = concatOptions?.limit || null
        this.items = []

        if (this.targetSelector) this.init()
    }

    private init() {
        this.createCollection(window.$CopyMarkupCollection, this)

        this.setTarget()
        this.setWrapper()
        this.addPredefinedItems()
        this.el.addEventListener('click', () => this.copy())
    }

    private copy() {
        if (this.limit && this.items.length >= this.limit) return false

        if (this.el.hasAttribute('disabled')) this.el.setAttribute('disabled', '')

        const copiedElement = this.target.cloneNode(true) as HTMLElement

        this.addToItems(copiedElement)

        if (this.limit && this.items.length >= this.limit) this.el.setAttribute('disabled', 'disabled')

        this.fireEvent('copy', copiedElement)
        dispatch('copy.copyMarkup', copiedElement, copiedElement)
    }

    private addPredefinedItems() {
        Array.from(this.wrapper.children)
            .filter((el: HTMLElement) => !el.classList.contains('[--ignore-for-count]'))
            .forEach((el: HTMLElement) => {
                this.addToItems(el)
            })
    }

    private setTarget() {
        const target: HTMLElement =
            typeof this.targetSelector === 'string'
                ? (document.querySelector(this.targetSelector).cloneNode(true) as HTMLElement)
                : ((this.targetSelector as HTMLElement).cloneNode(true) as HTMLElement)

        target.removeAttribute('id')

        this.target = target
    }

    private setWrapper() {
        this.wrapper =
            typeof this.wrapperSelector === 'string'
                ? document.querySelector(this.wrapperSelector)
                : this.wrapperSelector
    }

    private addToItems(item: HTMLElement) {
        const deleteItemButton = item.querySelector('[data-copy-markup-delete-item]')

        if (this.wrapper) this.wrapper.append(item)
        else this.el.before(item)

        if (deleteItemButton) deleteItemButton.addEventListener('click', () => this.delete(item))

        this.items.push(item)
    }

    // Public methods
    public delete(target: HTMLElement) {
        const index = this.items.indexOf(target)

        if (index !== -1) this.items.splice(index, 1)

        target.remove()

        this.fireEvent('delete', target)
        dispatch('delete.copyMarkup', target, target)
    }

    // Static method
    static getInstance(target: HTMLElement | string, isInstance?: boolean) {
        const elInCollection = window.$CopyMarkupCollection.find(
            (el) => el.element.el === (typeof target === 'string' ? document.querySelector(target) : target)
        )

        return elInCollection ? (isInstance ? elInCollection : elInCollection.element) : null
    }

    static autoInit() {
        if (!window.$CopyMarkupCollection) window.$CopyMarkupCollection = []

        document.querySelectorAll('[data-copy-markup]:not(.--prevent-on-load-init)').forEach((el: HTMLElement) => {
            if (!window.$CopyMarkupCollection.find((elC) => (elC?.element?.el as HTMLElement) === el)) {
                const data = el.getAttribute('data-copy-markup')
                const options: ICopyMarkupOptions = data ? JSON.parse(data) : {}

                new CopyMarkup(el, options)
            }
        })
    }
}

declare global {
    interface Window {
        CopyMarkup: Function
        $CopyMarkupCollection: ICollectionItem<CopyMarkup>[]
    }
}

window.addEventListener('load', () => {
    CopyMarkup.autoInit()
})

if (typeof window !== 'undefined') {
    window.CopyMarkup = CopyMarkup
}

export default CopyMarkup
