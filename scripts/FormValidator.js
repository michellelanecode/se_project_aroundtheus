 export class FormValidator {
     constructor(settings, formElement) {
         this._form = formElement;
         this._inputSelector = settings.inputSelector;
         this._submitButtonSelector = settings.submitButtonSelector;
         this._inactiveButtonClass = settings.inactiveButtonClass;
         this._inputErrorClass = settings.inputErrorClass;
         this._errorClass = settings.errorClass;
        this._button = this._form.querySelector(this._submitButtonSelector)
     }

     enableValidation() {
         this._form.addEventListener("submit", (evt) => {
             evt.preventDefault();
         });
         this._setEventListeners();
     }

     _setEventListeners() {
         const allInputs = Array.from(this._form.querySelectorAll(this._inputSelector));
         allInputs.forEach((input) => {
             input.addEventListener("input", (e) => {
                 this._toggleError(input)
                 this._toggleButtonState(allInputs)
             });
         });
     }

     _showError(input, errorMsg) {
         const errorEl = this._form.querySelector(`.${input.id}-error`);
         input.classList.add(this._inputErrorClass)
         errorEl.textContent = errorMsg;
         errorEl.classList.add(this._errorClass)
     }

     _hideError(input) {
         const errorEl = this._form.querySelector(`.${input.id}-error`);
         input.classList.remove(this._inputErrorClass)
         errorEl.textContent = "";
         errorEl.classList.remove(this._errorClass)
     }

     _toggleError(input) {
         if (!input.validity.valid) {
             this._showError(input, input.validationMessage);
         } else {
             this._hideError(input)
         }
     }

     _enableSubmitButton(button) {
         this._button.disabled = false;
         this._button.classList.remove(this._inactiveButtonClass)
     }

     _disableSubmitButton() {
         this._button.disabled = true;
         this._button.classList.add(this._inactiveButtonClass)
     }

     _hasInvalidInput(allInputs) {
         return allInputs.some(input => {
             return !input.validity.valid;
         })
     }

     _toggleButtonState(allInputs) {
         if (this._hasInvalidInput(allInputs)) {
             this._disableSubmitButton()
         } else {
             this._enableSubmitButton()
         }
     }

 }