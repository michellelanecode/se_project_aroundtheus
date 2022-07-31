export default class Section {
  constructor({ items, renderer, classSelector }) {
    this._itemArray = items;
    this._renderer = renderer;
    this._section = document.querySelector(classSelector);
  }

  render() {
    this._itemArray.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._section.prepend(element);
  }
}
