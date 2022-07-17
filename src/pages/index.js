import "./index.css";
import { FormValidator } from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import * as constant from "../utils/constants.js";

const imagePopup = new PopupWithImage(".popup__image");
imagePopup.setEventListeners();

const cards = new Section({
  items: constant.initialCards,
  renderer: addNewCard,
  classSelector: ".cards",
});
cards.render();

// card functionality
function addNewCard(item) {
  const newCard = new Card(item, "#card", () => {
    imagePopup.open(item);
  });
  const newCardElement = newCard.createCard();
  cards.addItem(newCardElement);
}

// profile functionality
const user = new UserInfo(".profile__title", ".profile__subtitle");

function updateProfile(userInfo) {
  user.setUserInfo(userInfo);
}

function fillProfileForm(userInfo) {
  const currentUser = user.getUserInfo();
  constant.name.value = currentUser.userNameInput;
  constant.aboutInfo.value = currentUser.userInfoInput;
}

function showEdit() {
  fillProfileForm();
  editFormValidator.resetValidation();
  editForm.open();
}

function showAdd() {
  addFormValidator.resetValidation();
  addForm.open();
}

// popup form functionality
const editForm = new PopupWithForm({
  popupSelector: ".popup__edit",
  submitFunc: updateProfile,
  userInfo: user.getUserInfo(),
});
editForm.setEventListeners();

const addForm = new PopupWithForm({
  popupSelector: ".popup__add",
  submitFunc: () => {
    const newInfo = {
      text: document.querySelector("#title-input").value,
      link: document.querySelector("#url-input").value,
    };
    addNewCard(newInfo);
  },
});

addForm.setEventListeners();

const editFormValidator = new FormValidator(constant.settings, editForm);
const addFormValidator = new FormValidator(constant.settings, addForm);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

constant.editButton.addEventListener("click", showEdit);
constant.addButton.addEventListener("click", showAdd);
