import * as utils from "./utils.js"
import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js"

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

const initialCards = [{
        text: "Scranton",
        link: "images/Scranton.jpeg"
    },
    {
        text: "Silicon Valley",
        link: "images/SiliconValley.png"
    },
    {
        text: "E Corp",
        link: "images/ECorp.jpeg"
    },
    {
        text: "Downton",
        link: "images/Downton.jpeg"
    },
    {
        text: "Pawnee",
        link: "images/pawnee.jpeg"
    },
    {
        text: "Disney World",
        link: "images/disneyworld.jpeg"
    }
];

//render initial cards
const cards = document.querySelector('.cards');
const cardSelector = "#card"
const renderCard = function(cardElement) {
    cards.prepend(cardElement);
}

initialCards.forEach(cardObj => {
    const card = new Card(cardObj, cardSelector)
    const cardElement = card.createCard();
    renderCard(cardElement)
})