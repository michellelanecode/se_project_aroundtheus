export default class Loading {
  constructor(buttonSelector) {
    this._popupbutton = document.querySelector(buttonSelector);
    this._previousValue = this._popupbutton.textContent;
  }

  displayLoading() {
    this._popupbutton.textContent = "Saving...";
  }

  hideLoading() {
    this._popupbutton.textContent = this._previousValue;
  }
}
