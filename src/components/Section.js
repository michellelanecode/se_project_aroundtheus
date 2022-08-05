export default class Section {
  constructor(items, renderer, classSelector) {
    this._itemArray = items;
    this._renderer = renderer;
    this._section = document.querySelector(classSelector);
  }

  render() {
    return this._itemArray.map((item) => {
      return this._renderer(item);
    });
  }

  addItem(element) {
    return this._section.prepend(element);
  }
}
