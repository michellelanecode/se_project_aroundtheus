import { closeOpenedPopup, openPopup, closePopup } from "./utils.js";
import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import * as constants from "./constants.js";

const editFormValidator = new FormValidator(settings, editForm);
const addFormValidator = new FormValidator(settings, addForm);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

function renderCard(cardElement) {
  cards.prepend(cardElement);
}

function createCard(data, selector) {
  const card = new Card(data, selector);
  return card.createCard();
}

initialCards.forEach((cardObj) => {
  renderCard(createCard(cardObj, cardSelector));
});

function updateProfile(event) {
  event.preventDefault();
  fillProfileForm();
  closePopup(editPopup);
}

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
  editFormValidator.resetValidation();
  openPopup(editPopup);
}

function showAdd() {
  addFormValidator.resetValidation();
  openPopup(addPopup);
}

export {
  createCard,
  updateProfile,
  closePopupWithEscape,
  fillProfileForm,
  showAdd,
  showEdit,
  renderCard,
};
