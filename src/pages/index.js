import "./index.css";
import { FormValidator } from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import * as constant from "../utils/constants.js";
import Api from "../components/Api.js";

const imagePopup = new PopupWithImage(".popup__image");
imagePopup.setEventListeners();
let initialCards = [];

// profile functionality
const user = new UserInfo(
  ".profile__title",
  ".profile__subtitle",
  ".profile__photo"
);

const api = new Api({
  url: " https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "a62acfc5-af94-4242-902c-c2cf40c0593c",
    "Content-Type": "application/json",
  },
});

api.getUserInfo().then((res) => {
  user.setUserInfo(res);
});

api.getAllCards().then((res) => {
  res.forEach((resData) => {
    const cardInfo = { name: resData.name, link: resData.link };
    const newCard = new Card(cardInfo, "#card", () => {
      imagePopup.open(item);
    });
    const newCardElement = newCard.createCard();
    const cards = new Section(cardInfo, addNewCard, ".cards");
    cards.addItem(newCardElement);
  });
});

// card functionality
function addNewCard(item) {
  const newCardElement = newCard.createCard();
  cards.addItem(newCardElement);
}

function updateProfile(userInfo) {
  api.updateUser(userInfo.name, userInfo.about).then((res) => {
    user.setUserInfo(res);
  });
}

function fillProfileForm() {
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
  submitFunc: (cardInfo) => {
    addNewCard(cardInfo);
  },
});

addForm.setEventListeners();

const editFormValidator = new FormValidator(constant.settings, editForm);
const addFormValidator = new FormValidator(constant.settings, addForm);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

constant.editButton.addEventListener("click", showEdit);
constant.addButton.addEventListener("click", showAdd);
