import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor({ popupSelector, submitFunc }) {
    super(popupSelector);
    this._submitFunc = submitFunc;
    this._inputs = [...this._popupElement.querySelectorAll(".popup__input")];
    this._submitButton = this._popupElement.querySelector(".popup__button");
    this._submitButtonText = this._submitButton.textContent;
    this._form = this._popupElement.querySelector(".popup__form");
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
  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  close() {
    super.close();
    this._form.reset();
  }
}
