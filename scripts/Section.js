import { createCard } from './index.js';

export class Section {
    constructor({ items, renderer }, selector) {
        this._items = items;
        this._renderer = renderer;
        this._container = selector;
    }

    renderElement() {
        //use renderer to render items on the page
        this._items.forEach(item => {
            this._renderer(item);
        })
    }

    addItem(element) {
        // take dom element and add it to container
        this._container.prepend(element);
    }
}