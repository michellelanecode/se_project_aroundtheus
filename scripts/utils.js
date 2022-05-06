import { Card } from "./Card.js"

const popup = document.querySelector('.popup');
const profileSubmitForm = document.querySelector('.popup__form_type_edit');
const cardCreateForm = document.querySelector('.popup__form_type_add');
const editButton = document.querySelector(".profile__buttons-edit");
const addButton = document.querySelector('.profile__buttons-add');
const closeButton = document.querySelectorAll('.popup__form-close')
const profileName = document.querySelector(".profile__title");
const aboutName = document.querySelector('.profile__subtitle');
const aboutInfo = document.querySelector('.popup__input_type_about');
const name = document.querySelector('.popup__input_type_name');
const imageTitle = document.querySelector('.popup__input_type_title');
const imageUrl = document.querySelector('.popup__input_type_link');
const editPopup = document.querySelector('.popup__edit');
const addPopup = document.querySelector('.popup__add');
const addPopupSubmitButton = addPopup.querySelector(".popup__button");
const disableButtonClass = "popup__button_disabled"
const cards = document.querySelector(".cards")

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

function updateProfile(event) {
    event.preventDefault();
    fillProfileForm();
    closePopup(editPopup);
};

function closeOpenedPopup() {
    const openedPopup = document.querySelector('.popup__container_active')
    closePopup(openedPopup);
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


function disableSubmitButton(button, inactiveButtonClass) {
    button.disabled = true;
    button.classList.add(inactiveButtonClass)
}

function showAdd() {
    openPopup(addPopup)
    disableSubmitButton(addPopupSubmitButton, disableButtonClass);
}


function fillProfileForm() {
    profileName.textContent = name.value;
    aboutName.textContent = aboutInfo.value;
}

function renderCard(cardElement) {
    cards.prepend(cardElement);
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
    let newCard = new Card(cardInfo, "#card")
    newCard = newCard.createCard()
    renderCard(newCard);
    closePopup(addPopup);
    cardCreateForm.reset();
})

editButton.addEventListener('click', showEdit)

addButton.addEventListener('click', showAdd);

closeButton.forEach((button) => {
    button.addEventListener('click', function(event) {
        closeOpenedPopup();
    })
})

export { closePopup, openPopup, updateProfile, closeOpenedPopup, closePopupWithEscape, fillProfileForm, showAdd, showEdit, disableSubmitButton }