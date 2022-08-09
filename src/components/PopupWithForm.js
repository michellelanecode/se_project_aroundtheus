import Popup from "./Popup.js";
import Loading from "./Loading.js";
export default class PopupWithForm extends Popup {
  constructor({ popupSelector, submitFunc, userInfo }) {
    super(popupSelector);
    this._submitFunc = submitFunc;
    this._user = userInfo;
    this._inputs = [...this._popupElement.querySelectorAll(".popup__input")];
    this._buttonClasses = [
      ...this._popupElement.querySelector(".popup__button").classList,
    ];
    this._loader = new Loading(".".concat(this._buttonClasses[0]));
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
      this._loader.displayLoading();
      this._submitFunc(this._getInputValues());
      this._loader.hideLoading();
      this.close();
    });
  }

  close() {
    super.close();
    this._popupElement.querySelector(".popup__form").reset();
  }
}
