export class FormValidator {
  constructor(settings, formElement) {
    this._formElement = formElement;
    this._form = this._formElement._popupElement;
    this._inputSelector = settings.inputSelector;

    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._button = this._form.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
  }

  enableValidation() {
    this._toggleButtonState();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  }

  _setEventListeners() {
    this._inputList.forEach((input) => {
      input.addEventListener("input", (e) => {
        this._toggleError(input);
        this._toggleButtonState();
      });
    });
  }
  _showError(input, errorMsg) {
    const errorEl = this._form.querySelector(`.${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    errorEl.textContent = errorMsg;
    errorEl.classList.add(this._errorClass);
  }

  _hideError(input) {
    const errorEl = this._form.querySelector(`.${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    errorEl.textContent = "";
    errorEl.classList.remove(this._errorClass);
  }

  _toggleError(input) {
    if (!input.validity.valid) {
      this._showError(input, input.validationMessage);
    } else {
      this._hideError(input);
    }
  }

  _enableSubmitButton() {
    this._button.disabled = false;
    this._button.classList.remove(this._inactiveButtonClass);
  }

  _disableSubmitButton() {
    this._button.disabled = true;
    this._button.classList.add(this._inactiveButtonClass);
  }

  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((input) => this._hideError(input));
  }
}
