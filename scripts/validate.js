function showError(form, input, errorMsg, config) {
    const { inputErrorClass, errorClass } = config;
    const errorEl = document.querySelector(`.${input.id}-error`);
    input.classList.add(inputErrorClass)
    errorEl.textContent = errorMsg;
    errorEl.classList.add(errorClass)
}

function hideError(form, input, config) {
    const { inputErrorClass, errorClass } = config;
    const errorEl = document.querySelector(`.${input.id}-error`);
    input.classList.remove(inputErrorClass)
    errorEl.textContent = "";
    errorEl.classList.remove(errorClass)
}

function toggleError(form, input, config) {
    if (!input.validity.valid) {
        showError(form, input, input.validationMessage, config);
    } else {
        hideError(form, input, config)
    }
}

const hasInvalidInput = function(inputs) {
    return inputs.some(input => {
        return !input.validity.valid;
    })
}
const enableSubmitButton = function(button, inactiveButtonClass) {
    button.disabled = false;
    button.classList.remove(inactiveButtonClass)
}

const disableSubmitButton = function(button, inactiveButtonClass) {
    button.disabled = true;
    button.classList.add(inactiveButtonClass)
}

function toggleButton(inputs, button, inactiveButtonClass) {
    if (hasInvalidInput(inputs)) {
        disableSubmitButton(button, inactiveButtonClass)
    } else {
        enableSubmitButton(button, inactiveButtonClass)
    }
}



function setEventListeners(form, config) {
    const { inputSelector, submitButtonSelector, inactiveButtonClass } = config;
    const allInputs = [...form.querySelectorAll(inputSelector)];
    const button = form.querySelector(submitButtonSelector);
    allInputs.forEach((input) => {
        input.addEventListener("input", (e) => {
            toggleError(form, input, config)
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

enableValidation({
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
});