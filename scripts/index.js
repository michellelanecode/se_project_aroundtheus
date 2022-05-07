import {closeOpenedPopup, openPopup, closePopup} from "./utils.js"
import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js"







const profileName = document.querySelector(".profile__title");
const aboutName = document.querySelector('.profile__subtitle');
const aboutInfo = document.querySelector('.popup__input_type_about');
const name = document.querySelector('.popup__input_type_name');
const editPopup = document.querySelector('.popup__edit');
const addPopup = document.querySelector('.popup__add');
const addPopupSubmitButton = addPopup.querySelector(".popup__button");
const disableButtonClass = "popup__button_disabled"
const cards = document.querySelector(".cards")




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

const cardSelector = "#card"

function renderCard(cardElement) {
    cards.prepend(cardElement);
}

 function createCard (data, selector){
   const card =  new Card(data, selector);
    return card.createCard()
}

initialCards.forEach(cardObj => {
    renderCard(createCard(cardObj, cardSelector))
})

function updateProfile(event) {
    event.preventDefault();
    fillProfileForm();
    closePopup(editPopup);
};

function fillProfileForm() {
    profileName.textContent = name.value;
    aboutName.textContent = aboutInfo.value;
}

function closePopupWithEscape(event) {
    if (event.key === "Escape") {
        closeOpenedPopup();
    }
}

function showEdit() {
    name.value = profileName.textContent;
    aboutInfo.value = aboutName.textContent;
    openPopup(editPopup);
}

function showAdd() {
    openPopup(addPopup)
}

export {addPopup, createCard, cardSelector,  updateProfile,  closePopupWithEscape, fillProfileForm, showAdd, showEdit, renderCard }