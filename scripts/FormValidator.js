   export class FormValidator {
       constructor(settingsObj, formElement) {
           this._form = formElement;
           this._inputSelector = settings.inputSelector;
           this._submitButtonSelector = settings.submitButtonSelector;
           this._inactiveButtonClass = settings.inactiveButtonClass;
           this._inputErrorClass = settings.inputErrorClass;
           this._errorClass = settings.errorClass;
           //settings object that stores selectors and form classes, and form element to be validated.
       }

       enableValidation() {
           this._form.addEventListener("submit", (evt) => {
               evt.preventDefault();
           });
           this._setEventListeners(this._form);
       }

       _setEventListeners(form) {
           const allInputs = [...form.querySelectorAll(this._inputSelector)];
           const button = form.querySelector(this._submitButtonSelector);
           allInputs.forEach((input) => {
               input.addEventListener("input", (e) => {
                   this._toggleError(form, input)
                   this._toggleButtonState(allInputs, button, this._inactiveButtonClass)
               });
           });
       }

       _showError(form, input, errorMsg) {
           const errorEl = document.querySelector(`.${input.id}-error`);
           input.classList.add(this._inputErrorClass)
           errorEl.textContent = errorMsg;
           errorEl.classList.add(this._errorClass)
       }

       _hideError() {
           const errorEl = document.querySelector(`.${input.id}-error`);
           input.classList.remove(this._inputErrorClass)
           errorEl.textContent = "";
           errorEl.classList.remove(this._errorClass)
       }

       _toggleError(form, input) {
           if (!input.validity.valid) {
               this._showError(form, input, input.validationMessage);
           } else {
               this._hideError(form, input)
           }
       }

       _enableSubmitButton(button, inactiveButtonClass) {
           button.disabled = false;
           button.classList.remove(inactiveButtonClass)
       }

       _disableSubmitButton(button, inactiveButtonClass) {
           button.disabled = true;
           button.classList.add(inactiveButtonClass)
       }

       _hasInvalidInput(allInputs) {
           return allInputs.some(input => {
               return !input.validity.valid;
           })
       }

       _toggleButtonState(allInputs, button, inactiveButtonClass) {
           if (this._hasInvalidInput(allInputs)) {
               this._disableSubmitButton(button, inactiveButtonClass)
           } else {
               this._enableSubmitButton(button, inactiveButtonClass)
           }
       }

   }

   //will be in input JS... this is the end result

   const settings = {
       formSelector: ".popup__form",
       inputSelector: ".popup__input",
       submitButtonSelector: ".popup__button",
       inactiveButtonClass: "popup__button_disabled",
       inputErrorClass: "popup__input_type_error",
       errorClass: "popup__error_visible"
   }
   const editFormValidator = new FormValidator(settings, editForm);
   const addFormValidator = new FormValidator(settings, addForm);
   editFormValidator.enableValidation();
   addFormValidator.enableValidation();