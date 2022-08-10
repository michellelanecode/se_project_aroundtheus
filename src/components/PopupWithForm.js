import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor({ popupSelector, submitFunc }) {
    super(popupSelector);
    this._submitFunc = submitFunc;
    this._inputs = [...this._popupElement.querySelectorAll(".popup__input")];
    this._submitButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    const inputVal = {};
    this._inputs.forEach((field) => {
      inputVal[field.name] = field.value;
    });
    return inputVal;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitFunc(this, this._getInputValues());
    });
  }

  close() {
    super.close();
    this._popupElement.querySelector(".popup__form").reset();
  }
}
