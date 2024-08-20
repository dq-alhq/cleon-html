/*
 * TogglePassword
 */

import { dispatch, isFormElement } from '../utils'
import BaseComponent from './base'

interface ITogglePasswordOptions {
    target: string | string[] | HTMLInputElement | HTMLInputElement[]
}
interface ITogglePassword {
    options?: ITogglePasswordOptions
    show(): void
    hide(): void
}
interface ICollectionItem<T> {
    id: string | number
    element: T
}

class TogglePassword extends BaseComponent<ITogglePasswordOptions> implements ITogglePassword {
    private readonly target: string | string[] | HTMLInputElement | HTMLInputElement[] | null
    private isShown: boolean
    private readonly isMultiple: boolean
    private readonly eventType: string

    constructor(el: HTMLElement, options?: ITogglePasswordOptions) {
        super(el, options)

        const data = el.getAttribute('data-toggle-password')
        const dataOptions: ITogglePasswordOptions = data ? JSON.parse(data) : {}
        const concatOptions = {
            ...dataOptions,
            ...options
        }
        const targets: HTMLInputElement[] = []
        if (concatOptions?.target && typeof concatOptions?.target === 'string') {
            const ids = concatOptions?.target.split(',')
            ids.forEach((id) => {
                targets.push(document.querySelector(id) as HTMLInputElement)
            })
        } else if (concatOptions?.target && typeof concatOptions?.target === 'object') {
            ;(concatOptions.target as string[]).forEach((el) => targets.push(document.querySelector(el)))
        } else {
            ;(concatOptions.target as HTMLInputElement[]).forEach((el) => targets.push(el))
        }

        this.target = targets
        this.isShown = this.el.hasAttribute('type') ? (this.el as HTMLInputElement).checked : false
        this.eventType = isFormElement(this.el) ? 'change' : 'click'
        this.isMultiple = this.target.length > 1 && !!this.el.closest('[data-toggle-password-group]')

        if (this.target) this.init()
    }

    private init() {
        this.createCollection(window.$TogglePasswordCollection, this)

        if (!this.isShown) {
            this.hide()
        } else {
            this.show()
        }

        this.el.addEventListener(this.eventType, () => {
            if (this.isShown) {
                this.hide()
            } else {
                this.show()
            }

            this.fireEvent('toggle', this.target)
            dispatch('toggle.toggle-select', this.el, this.target)
        })
    }

    private getMultipleToggles(): TogglePassword[] {
        const group = this.el.closest('[data-toggle-password-group]')
        const toggles = group.querySelectorAll('[data-toggle-password]')
        const togglesInCollection: TogglePassword[] = []

        toggles.forEach((el: HTMLElement) => {
            togglesInCollection.push(TogglePassword.getInstance(el) as TogglePassword)
        })

        return togglesInCollection
    }

    // Public methods
    public show() {
        if (this.isMultiple) {
            const toggles = this.getMultipleToggles()

            toggles.forEach((el: TogglePassword) => (el ? (el.isShown = true) : false))

            this.el.closest('[data-toggle-password-group]').classList.add('active')
        } else {
            this.isShown = true

            this.el.classList.add('active')
        }
        ;(this.target as HTMLInputElement[]).forEach((el) => {
            ;(el as HTMLInputElement).type = 'text'
        })
    }

    public hide() {
        if (this.isMultiple) {
            const toggles = this.getMultipleToggles()

            toggles.forEach((el: TogglePassword) => (el ? (el.isShown = false) : false))

            this.el.closest('[data-toggle-password-group]').classList.remove('active')
        } else {
            this.isShown = false

            this.el.classList.remove('active')
        }
        ;(this.target as HTMLInputElement[]).forEach((el) => {
            ;(el as HTMLInputElement).type = 'password'
        })
    }

    // Static methods
    static getInstance(target: HTMLElement | string, isInstance?: boolean) {
        const elInCollection = window.$TogglePasswordCollection.find(
            (el) => el.element.el === (typeof target === 'string' ? document.querySelector(target) : target)
        )

        return elInCollection ? (isInstance ? elInCollection : elInCollection.element) : null
    }

    static autoInit() {
        if (!window.$TogglePasswordCollection) window.$TogglePasswordCollection = []

        document
            .querySelectorAll('[data-toggle-password]:not(.--prevent-on-load-init)')
            .forEach((el: HTMLInputElement) => {
                if (!window.$TogglePasswordCollection.find((elC) => (elC?.element?.el as HTMLElement) === el))
                    new TogglePassword(el)
            })
    }
}

declare global {
    interface Window {
        TogglePassword: Function
        $TogglePasswordCollection: ICollectionItem<TogglePassword>[]
    }
}

window.addEventListener('load', () => {
    TogglePassword.autoInit()
})

if (typeof window !== 'undefined') {
    window.TogglePassword = TogglePassword
}

export default TogglePassword
