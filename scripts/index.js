import { openPopup, closePopup} from "./utils.js";
import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import * as constant from "./constants.js";

const editFormValidator = new FormValidator(constant.settings, editForm);
const addFormValidator = new FormValidator(constant.settings, addForm);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

function renderCard(cardElement) {
  constant.cards.prepend(cardElement);
}

function createCard(data, selector) {
  const card = new Card(data, selector);
  return card.createCard();
}

constant.initialCards.forEach((cardObj) => {
  renderCard(createCard(cardObj, constant.cardSelector));
});

function updateProfile(event) {
  event.preventDefault();
  fillProfileForm();
  closePopup(constant.editPopup);
}

function fillProfileForm() {
  constant.profileName.textContent = constant.name.value;
  constant.aboutName.textContent = constant.aboutInfo.value;
}

function closePopupWithEscape(event) {
  if (event.key === "Escape") {
    closeOpenedPopup();
  }
}

function closeOpenedPopup() {
  const openedPopups = document.querySelectorAll(".popup__container_active");
  openedPopups.forEach((openedPopup) => closePopup(openedPopup));
}

function showEdit() {
  constant.name.value = constant.profileName.textContent;
  constant.aboutInfo.value = constant.aboutName.textContent;
  editFormValidator.resetValidation();
  openPopup(constant.editPopup);
}

function showAdd() {
  addFormValidator.resetValidation();
  openPopup(constant.addPopup);
}

constant.profileSubmitForm.addEventListener("submit", updateProfile);

constant.cardCreateForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const cardInfo = {
    text: constant.imageTitle.value,
    link: constant.imageUrl.value,
  };
  const newCard = createCard(cardInfo, constant.cardSelector);
  renderCard(newCard);
  closePopup(constant.addPopup);
  constant.cardCreateForm.reset();
});

constant.editButton.addEventListener("click", showEdit);

constant.addButton.addEventListener("click", showAdd);

constant.closeButtons.forEach((button) => {
  button.addEventListener("click", function (event) {
    closeOpenedPopup();
  });
});

constant.popup.addEventListener("mousedown", function (event) {
  if (event.target === event.currentTarget) {
    closeOpenedPopup();
  }
});

export { closeOpenedPopup, closePopupWithEscape};
