/*
 * Scrollspy
 */

import { dispatch, getClassProperty } from '../utils'
import BaseComponent from './base'

interface IScrollspy {
    options?: {}
}
interface ICollectionItem<T> {
    id: string | number
    element: T
}

class Scrollspy extends BaseComponent<{}> implements IScrollspy {
    private activeSection: HTMLElement | null
    private readonly links: NodeListOf<HTMLAnchorElement> | null
    private readonly sections: HTMLElement[] | null
    private readonly scrollableId: string | null
    private readonly scrollable: HTMLElement | Document

    constructor(el: HTMLElement, options = {}) {
        super(el, options)

        this.activeSection = null
        this.links = this.el.querySelectorAll('[href]')
        this.sections = []
        this.scrollableId = this.el.getAttribute('data-scrollspy-scrollable-parent')
        this.scrollable = this.scrollableId
            ? (document.querySelector(this.scrollableId) as HTMLElement)
            : (document as Document)

        this.init()
    }

    private init() {
        this.createCollection(window.$ScrollspyCollection, this)

        this.links.forEach((el) => {
            this.sections.push(this.scrollable.querySelector(el.getAttribute('href')))
        })

        Array.from(this.sections).forEach((section: HTMLElement) => {
            if (!section.getAttribute('id')) return false

            this.scrollable.addEventListener('scroll', (evt) => this.update(evt, section))
        })

        this.links.forEach((el) => {
            el.addEventListener('click', (evt) => {
                evt.preventDefault()

                if (el.getAttribute('href') === 'javascript:;') return false

                this.scrollTo(el)
            })
        })
    }

    private update(evt: Event, section: HTMLElement) {
        const globalOffset = parseInt(getClassProperty(this.el, '--scrollspy-offset', '0'))
        const userOffset = parseInt(getClassProperty(section, '--scrollspy-offset')) || globalOffset
        const scrollableParentOffset =
            evt.target === document ? 0 : parseInt(String((evt.target as HTMLElement).getBoundingClientRect().top))
        const topOffset = parseInt(String(section.getBoundingClientRect().top)) - userOffset - scrollableParentOffset
        const height = section.offsetHeight

        if (topOffset <= 0 && topOffset + height > 0) {
            if (this.activeSection === section) return false

            this.links.forEach((el) => {
                el.classList.remove('active')
            })

            const current = this.el.querySelector(`[href="#${section.getAttribute('id')}"]`)

            if (current) {
                current.classList.add('active')

                const group = current.closest('[data-scrollspy-group]')

                if (group) {
                    const parentLink = group.querySelector('[href]')

                    if (parentLink) parentLink.classList.add('active')
                }
            }

            this.activeSection = section
        }
    }

    private scrollTo(link: HTMLAnchorElement) {
        const targetId = link.getAttribute('href')
        const target: HTMLElement = document.querySelector(targetId)
        const globalOffset = parseInt(getClassProperty(this.el, '--scrollspy-offset', '0'))
        const userOffset = parseInt(getClassProperty(target, '--scrollspy-offset')) || globalOffset
        const scrollableParentOffset = this.scrollable === document ? 0 : (this.scrollable as HTMLElement).offsetTop
        const topOffset = target.offsetTop - userOffset - scrollableParentOffset
        const view = this.scrollable === document ? window : this.scrollable
        const scrollFn = () => {
            window.history.replaceState(null, null, link.getAttribute('href'))

            if ('scrollTo' in view) {
                view.scrollTo({
                    top: topOffset,
                    left: 0,
                    behavior: 'smooth'
                })
            }
        }

        const beforeScroll = this.fireEvent('beforeScroll', this.el)
        dispatch('beforeScroll.scrollspy', this.el, this.el)

        if (beforeScroll instanceof Promise) beforeScroll.then(() => scrollFn())
        else scrollFn()
    }

    // Static methods
    static getInstance(target: HTMLElement, isInstance = false) {
        const elInCollection = window.$ScrollspyCollection.find(
            (el) => el.element.el === (typeof target === 'string' ? document.querySelector(target) : target)
        )

        return elInCollection ? (isInstance ? elInCollection : elInCollection.element.el) : null
    }

    static autoInit() {
        if (!window.$ScrollspyCollection) window.$ScrollspyCollection = []

        document.querySelectorAll('[data-scrollspy]:not(.--prevent-on-load-init)').forEach((el: HTMLElement) => {
            if (!window.$ScrollspyCollection.find((elC) => (elC?.element?.el as HTMLElement) === el)) new Scrollspy(el)
        })
    }
}

declare global {
    interface Window {
        Scrollspy: Function
        $ScrollspyCollection: ICollectionItem<Scrollspy>[]
    }
}

window.addEventListener('load', () => {
    Scrollspy.autoInit()
})

if (typeof window !== 'undefined') {
    window.Scrollspy = Scrollspy
}

export default Scrollspy
