import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, submitFunc) {
    super(popupSelector);
    this._submitFunc = submitFunc;
    this._submitButtonText = this._submitButton.textContent;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitFunc(this._cardToDelete);
    });
  }

  open(item) {
    super.open();
    this._cardToDelete = item;
  }
}
