import { Card } from "./Card.js"
import {renderCard, updateProfile, cardSelector, showEdit, showAdd, closePopupWithEscape} from "./index.js"
const popup = document.querySelector('.popup');
const profileSubmitForm = document.querySelector('.popup__form_type_edit');
const cardCreateForm = document.querySelector('.popup__form_type_add');
const editButton = document.querySelector(".profile__buttons-edit");
const addButton = document.querySelector('.profile__buttons-add');
const closeButtons = document.querySelectorAll('.popup__form-close')

function closePopup(popupElement) {
    popup.classList.remove('popup_active')
    popupElement.classList.remove('popup__container_active')
    document.removeEventListener("keydown", closePopupWithEscape)
}
function openPopup(popupElement) {
        popup.classList.add('popup_active')
        popupElement.classList.add('popup__container_active')
        document.addEventListener("keydown", closePopupWithEscape)
}

function closeOpenedPopup() {
    const openedPopups = document.querySelectorAll('.popup__container_active');
    openedPopups.forEach(openedPopup => closePopup(openedPopup))
}


popup.addEventListener('mousedown', function(event) {
    if (event.target === event.currentTarget) {
        closeOpenedPopup()
    }
});


profileSubmitForm.addEventListener('submit', updateProfile);

cardCreateForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const cardInfo = { text: imageTitle.value, link: imageUrl.value }
    const newCard = createCard(cardInfo, cardSelector)
    renderCard(newCard);
    closePopup(addPopup);
    cardCreateForm.reset();
})

editButton.addEventListener('click', showEdit)

addButton.addEventListener('click', showAdd);

closeButtons.forEach((button) => {
    button.addEventListener('click', function(event) {
        closeOpenedPopup();
    })
})

export {closePopup, openPopup, closeOpenedPopup}