export default class Section {
  constructor(items, renderer, classSelector) {
    this._itemArray = items;
    this._renderer = renderer;
    this._section = document.querySelector(classSelector);
  }

  render() {
    this._itemArray.map((item) => {
      this._renderer(item);
      console.log("Ran");
    });
  }

  addItem(element) {
    console.log(this._section);
    this._section.prepend(element);
  }
}
