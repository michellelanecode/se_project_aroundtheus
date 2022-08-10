export default class Section {
  constructor(items, renderer, classSelector) {
    this._itemArray = items;
    this._renderer = renderer;
    this._section = document.querySelector(classSelector);
  }

  render() {
    return this._itemArray.map((item) => {
      return this._renderer(this, item);
    });
  }

  addItem(element) {
    return this._section.prepend(element);
  }

  removeItem(element) {
    this._section.removeChild(element);
  }
}
