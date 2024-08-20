/*
 * ThemeSwitch
 */

import BaseComponent from './base'
interface IThemeSwitchOptions {
    theme?: 'dark' | 'light' | 'default'
}
interface IThemeSwitch {
    options?: IThemeSwitchOptions
    setAppearance(theme: string, isSaveToLocalStorage: boolean, isSetDispatchEvent: boolean): void
}
interface ICollectionItem<T> {
    id: string | number
    element: T
}

class ThemeSwitch extends BaseComponent<IThemeSwitchOptions> implements IThemeSwitch {
    public theme: string

    constructor(el: HTMLElement, options?: IThemeSwitchOptions) {
        super(el, options)

        const data = el.getAttribute('data-theme-switch')
        const dataOptions: IThemeSwitchOptions = data ? JSON.parse(data) : {}
        const concatOptions = {
            ...dataOptions,
            ...options
        }

        this.theme = concatOptions?.theme || localStorage.getItem('theme') || 'default'

        this.init()
    }

    private init() {
        this.createCollection(window.$ThemeSwitchCollection, this)

        if (this.theme !== 'default') this.setAppearance()
    }

    private setResetStyles() {
        const style = document.createElement('style')

        style.innerText = `*{transition: unset !important;}`
        style.setAttribute('data-appearance-onload-styles', '')

        document.head.appendChild(style)

        return style
    }

    private addSystemThemeObserver() {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({ matches }) => {
            if (matches) this.setAppearance('dark', false)
            else this.setAppearance('default', false)
        })
    }

    private removeSystemThemeObserver() {
        window.matchMedia('(prefers-color-scheme: dark)').removeEventListener
    }

    // Public methods
    public setAppearance(theme = this.theme, isSaveToLocalStorage = true, isSetDispatchEvent = true) {
        const html = document.querySelector('html')
        const resetStyles = this.setResetStyles()

        if (isSaveToLocalStorage) localStorage.setItem('theme', theme)
        if (theme === 'auto') theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'default'

        html.classList.remove('light', 'dark', 'default', 'auto')
        html.classList.add(theme)

        setTimeout(() => resetStyles.remove())

        if (isSetDispatchEvent) window.dispatchEvent(new CustomEvent('on-appearance-change', { detail: theme }))
    }

    // Static methods
    static getInstance(target: HTMLElement | string) {
        const elInCollection = window.$ThemeSwitchCollection.find(
            (el) => el.element.el === (typeof target === 'string' ? document.querySelector(target) : target)
        )

        return elInCollection ? elInCollection.element : null
    }

    static autoInit() {
        if (!window.$ThemeSwitchCollection) window.$ThemeSwitchCollection = []

        const toggleObserveSystemTheme = (el: ThemeSwitch) => {
            if (localStorage.getItem('theme') === 'auto') el.addSystemThemeObserver()
            else el.removeSystemThemeObserver()
        }

        document.querySelectorAll('[data-theme-switch]:not(.--prevent-on-load-init)').forEach((el: HTMLElement) => {
            if (!window.$ThemeSwitchCollection.find((elC) => (elC?.element?.el as HTMLElement) === el)) {
                const switchTheme = new ThemeSwitch(el)
                ;(switchTheme.el as HTMLInputElement).checked = switchTheme.theme === 'dark'

                toggleObserveSystemTheme(switchTheme)

                switchTheme.el.addEventListener('change', (evt) => {
                    const theme = (evt.target as HTMLInputElement).checked ? 'dark' : 'default'
                    switchTheme.setAppearance(theme)

                    toggleObserveSystemTheme(switchTheme)
                })
            }
        })

        document
            .querySelectorAll('[data-theme-click-value]:not(.--prevent-on-load-init)')
            .forEach((el: HTMLElement) => {
                const theme = el.getAttribute('data-theme-click-value')
                const switchTheme = new ThemeSwitch(el)

                toggleObserveSystemTheme(switchTheme)

                switchTheme.el.addEventListener('click', () => {
                    switchTheme.setAppearance(theme)

                    toggleObserveSystemTheme(switchTheme)
                })
            })
    }
}

declare global {
    interface Window {
        ThemeSwitch: Function
        $ThemeSwitchCollection: ICollectionItem<ThemeSwitch>[]
    }
}

window.addEventListener('load', () => {
    ThemeSwitch.autoInit()
})

if (window.$ThemeSwitchCollection) {
    window.addEventListener('on-appearance-change', (evt: Event & { detail: string }) => {
        window.$ThemeSwitchCollection.forEach((el) => {
            ;(el.element.el as HTMLInputElement).checked = evt.detail === 'dark'
        })
    })
}

if (typeof window !== 'undefined') {
    window.ThemeSwitch = ThemeSwitch
}

export default ThemeSwitch
