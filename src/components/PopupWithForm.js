import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, submitFunc, userInfo }) {
    super(popupSelector);
    this._submitFunc = submitFunc;
    this._user = userInfo;
    this._inputs = [...this._popupElement.querySelectorAll(".popup__input")];
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
      this._submitFunc(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
  }
}
