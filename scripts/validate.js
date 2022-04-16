//remaining tasks before first submission:
//should be able to click on overlay and closePopup()
//should be able to press ESC and closePopup()

function isInputValid(inputs) {
    return inputs.some(input => {
        return !input.validity.valid;
    })
}

function enableButton(button, buttonClass) {
    button.classList.add(buttonClass);
}

function disableButton(button, buttonClass) {
    button.classList.remove(buttonClass)
}


function toggleButton(inputs, button, inactiveButtonClass) {
    if (isInputValid(inputs)) {
        enableButton(button, inactiveButtonClass)
    } else {
        disableButton(button, inactiveButtonClass)
    }
}

function setEventListeners(form, config) {
    const { inputSelector, submitButtonSelector, inactiveButtonClass } = config;
    const allInputs = Array.from(form.querySelectorAll(inputSelector));
    const button = form.querySelector(submitButtonSelector);
    allInputs.forEach((input) => {
        input.addEventListener("input", (e) => {
            isValid(form, input, config)
            toggleButton(allInputs, button, inactiveButtonClass)
        });
    });
};

function enableValidation(config) {
    const { formSelector } = config;
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((form) => {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
        });
        setEventListeners(form, config);
    });
};

function showError(form, input, errormsg, config) {
    const { inputErrorClass, errorClass } = config;
    const errorEl = document.querySelector(`.${input.id}-error`);
    input.classList.add(inputErrorClass)
    errorEl.textContent = errormsg;
    errorEl.classList.add(errorClass)
}

function hideError(form, input, config) {
    const { inputErrorClass, errorClass } = config;
    const errorEl = document.querySelector(`.${input.id}-error`);
    input.classList.remove(inputErrorClass)
    errorEl.textContent = "";
    errorEl.classList.remove(errorClass)
}

function isValid(form, input, config) {
    if (!input.validity.valid) {
        showError(form, input, input.validationMessage, config);
    } else {
        hideError(form, input, config)
    }
}

enableValidation({
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
});