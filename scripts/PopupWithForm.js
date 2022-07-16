import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, submitFunc }) {
    super(popupSelector);
    this._popupElement = document.querySelector(popupSelector);
    this._submitFunc = submitFunc;
  }

  _getInputValues() {
    let inputVal = {};
    const fields = [...this._popupElement.querySelectorAll(".popup__input")];
    fields.forEach((field) => {
      inputVal[field.name] = field.value;
    });
    return inputVal;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener("submit", (evt) => {
      this._submitFunc(evt);
      super.close();
    });
  }

  close() {
    super.close();
  }
}
