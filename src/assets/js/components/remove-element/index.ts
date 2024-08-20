/*
 * RemoveElement
 */

import { afterTransition } from '../../utils'
import HSBasePlugin from '../base-plugin'

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

class HSRemoveElement extends HSBasePlugin<IRemoveElementOptions> implements IRemoveElement {
    private readonly removeTargetId: string | null
    private readonly removeTarget: HTMLElement | null
    private readonly removeTargetAnimationClass: string

    constructor(el: HTMLElement, options?: IRemoveElementOptions) {
        super(el, options)

        const data = el.getAttribute('data-hs-remove-element-options')
        const dataOptions: IRemoveElementOptions = data ? JSON.parse(data) : {}
        const concatOptions = {
            ...dataOptions,
            ...options
        }

        this.removeTargetId = this.el.getAttribute('data-hs-remove-element')
        this.removeTarget = document.querySelector(this.removeTargetId)
        this.removeTargetAnimationClass = concatOptions?.removeTargetAnimationClass || 'hs-removing'

        if (this.removeTarget) this.init()
    }

    private init() {
        this.createCollection(window.$hsRemoveElementCollection, this)

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
        if (!window.$hsRemoveElementCollection) window.$hsRemoveElementCollection = []

        document
            .querySelectorAll('[data-hs-remove-element]:not(.--prevent-on-load-init)')
            .forEach((el: HTMLElement) => {
                if (!window.$hsRemoveElementCollection.find((elC) => (elC?.element?.el as HTMLElement) === el))
                    new HSRemoveElement(el)
            })
    }
}

declare global {
    interface Window {
        HSRemoveElement: Function
        $hsRemoveElementCollection: ICollectionItem<HSRemoveElement>[]
    }
}

window.addEventListener('load', () => {
    HSRemoveElement.autoInit()

    // Uncomment for debug
    // console.log('Remove element collection:', window.$hsRemoveElementCollection);
})

if (typeof window !== 'undefined') {
    window.HSRemoveElement = HSRemoveElement
}

export default HSRemoveElement
