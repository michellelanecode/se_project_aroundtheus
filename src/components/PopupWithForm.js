import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, submitFunc }) {
    super(popupSelector);
    this._submitFunc = submitFunc;
    this._inputs = [...this._popupElement.querySelectorAll(".popup__input")];
  }

  _getInputValues() {
    const inputVal = {};
    this._inputs.forEach((field) => {
      inputVal[field.id] = field.value;
    });
    return inputVal;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener("submit", (evt) => {
      this._submitFunc(evt);
      this.close();
    });
  }

  close() {
    super.close();
    this._popupElement.reset();
  }
}
