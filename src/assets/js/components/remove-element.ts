/*
 * RemoveElement
 */

import { afterTransition } from '../utils'
import BaseComponent from './base'

interface IRemoveElementOptions {
    removeTargetAnimationClass: string
}
interface IRemoveElement {
    options?: IRemoveElementOptions
}
interface ICollectionItem<T> {
    id: string | number
    element: T
}

class RemoveElement extends BaseComponent<IRemoveElementOptions> implements IRemoveElement {
    private readonly removeTargetId: string | null
    private readonly removeTarget: HTMLElement | null
    private readonly removeTargetAnimationClass: string

    constructor(el: HTMLElement, options?: IRemoveElementOptions) {
        super(el, options)

        const data = el.getAttribute('data-remove-element-options')
        const dataOptions: IRemoveElementOptions = data ? JSON.parse(data) : {}
        const concatOptions = {
            ...dataOptions,
            ...options
        }

        this.removeTargetId = this.el.getAttribute('data-remove-element')
        this.removeTarget = document.querySelector(this.removeTargetId)
        this.removeTargetAnimationClass = concatOptions?.removeTargetAnimationClass || 'removing'

        if (this.removeTarget) this.init()
    }

    private init() {
        this.createCollection(window.$RemoveElementCollection, this)

        this.el.addEventListener('click', () => this.remove())
    }

    private remove() {
        if (!this.removeTarget) return false

        this.removeTarget.classList.add(this.removeTargetAnimationClass)

        afterTransition(this.removeTarget, () => {
            this.removeTarget.remove()
        })
    }

    // Static method
    static autoInit() {
        if (!window.$RemoveElementCollection) window.$RemoveElementCollection = []

        document.querySelectorAll('[data-remove-element]:not(.--prevent-on-load-init)').forEach((el: HTMLElement) => {
            if (!window.$RemoveElementCollection.find((elC) => (elC?.element?.el as HTMLElement) === el))
                new RemoveElement(el)
        })
    }
}

declare global {
    interface Window {
        RemoveElement: Function
        $RemoveElementCollection: ICollectionItem<RemoveElement>[]
    }
}

window.addEventListener('load', () => {
    RemoveElement.autoInit()
})

if (typeof window !== 'undefined') {
    window.RemoveElement = RemoveElement
}

export default RemoveElement
