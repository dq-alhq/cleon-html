/*
 * ToggleCount
 */

import BaseComponent from './base'

interface IToggleCountOptions {
    target: string | HTMLInputElement
    min: number
    max: number
    duration: number
}
interface IToggleCount {
    options?: IToggleCountOptions
    countUp(): void
    countDown(): void
}
interface ICollectionItem<T> {
    id: string | number
    element: T
}

class ToggleCount extends BaseComponent<IToggleCountOptions> implements IToggleCount {
    private readonly target: HTMLInputElement | null
    private readonly min: number | null
    private readonly max: number | null
    private readonly duration: number | null
    private isChecked: boolean

    constructor(el: HTMLElement, options?: IToggleCountOptions) {
        super(el, options)

        const data = el.getAttribute('data-toggle-count')
        const dataOptions: IToggleCountOptions = data ? JSON.parse(data) : {}
        const concatOptions = {
            ...dataOptions,
            ...options
        }

        this.target = concatOptions?.target
            ? typeof concatOptions?.target === 'string'
                ? (document.querySelector(concatOptions.target) as HTMLInputElement)
                : concatOptions.target
            : null
        this.min = concatOptions?.min || 0
        this.max = concatOptions?.max || 0
        this.duration = concatOptions?.duration || 700

        this.isChecked = (this.target as HTMLInputElement).checked || false

        if (this.target) this.init()
    }

    private init() {
        this.createCollection(window.$ToggleCountCollection, this)

        if (this.isChecked) this.el.innerText = String(this.max)

        this.target.addEventListener('change', () => {
            this.isChecked = !this.isChecked

            this.toggle()
        })
    }

    private toggle() {
        if (this.isChecked) this.countUp()
        else this.countDown()
    }

    private animate(from: number, to: number) {
        let startTimestamp = 0

        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp
            const progress = Math.min((timestamp - startTimestamp) / this.duration, 1)

            this.el.innerText = String(Math.floor(progress * (to - from) + from))

            if (progress < 1) window.requestAnimationFrame(step)
        }

        window.requestAnimationFrame(step)
    }

    // Public methods
    public countUp() {
        this.animate(this.min, this.max)
    }

    public countDown() {
        this.animate(this.max, this.min)
    }

    // Static methods
    static getInstance(target: HTMLElement | string, isInstance?: boolean) {
        const elInCollection = window.$ToggleCountCollection.find(
            (el) => el.element.el === (typeof target === 'string' ? document.querySelector(target) : target)
        )

        return elInCollection ? (isInstance ? elInCollection : elInCollection.element) : null
    }

    static autoInit() {
        if (!window.$ToggleCountCollection) window.$ToggleCountCollection = []

        document.querySelectorAll('[data-toggle-count]:not(.--prevent-on-load-init)').forEach((el: HTMLElement) => {
            if (!window.$ToggleCountCollection.find((elC) => (elC?.element?.el as HTMLElement) === el))
                new ToggleCount(el)
        })
    }
}

declare global {
    interface Window {
        ToggleCount: Function
        $ToggleCountCollection: ICollectionItem<ToggleCount>[]
    }
}

window.addEventListener('load', () => {
    ToggleCount.autoInit()
})

if (typeof window !== 'undefined') {
    window.ToggleCount = ToggleCount
}

export default ToggleCount
