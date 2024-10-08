/*
 * BaseComponent
 */

interface IBaseComponent<O, E> {
    el: E
    options?: O
    events?: {}
}

export default class BaseComponent<O, E = HTMLElement> implements IBaseComponent<O, E> {
    constructor(
        public el: E,
        public options: O,
        public events?: any
    ) {
        this.el = el
        this.options = options
        this.events = {}
    }

    public createCollection(collection: any[], element: any) {
        collection.push({
            id: element?.el?.id || collection.length + 1,
            element
        })
    }

    public fireEvent(evt: string, payload: any = null) {
        if (this.events.hasOwnProperty(evt)) return this.events[evt](payload)
    }

    public on(evt: string, cb: Function) {
        this.events[evt] = cb
    }
}
