import "./index.css";
import { FormValidator } from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import * as constant from "../utils/constants.js";
import Api from "../components/Api.js";
import Loading from "../components/Loading.js";

const imagePopup = new PopupWithImage(".popup__image");
imagePopup.setEventListeners();

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
    createCard(resData);
  });
});

function updateLikeButton(evt, cardId) {
  evt.target.classList.toggle("card__lovebutton_active");
  if (!evt.target.classList.contains("card__lovebutton_active")) {
    api.removeLike(cardId).then((res) => {
      this.updateLikeCount(res.likes.length);
    });
  } else {
    api.addLike(cardId).then((res) => {
      this.updateLikeCount(res.likes.length);
    });
  }
}

function createCard(item) {
  const cardInfo = {
    name: item.name,
    link: item.link,
    likes: item.likes,
    id: item._id,
    cardOwner: item.owner._id,
  };
  const newCard = new Card(
    cardInfo,
    "#card",
    () => {
      imagePopup.open(item);
    },
    (evt) => {
      deleteCardPopup.open(item, evt);
    },
    user.getId(),
    updateLikeButton
  );
  const newCardElement = newCard.createCard();
  const cards = new Section(cardInfo, addNewCard, ".cards");
  cards.addItem(newCardElement);
}

// card functionality
function addNewCard(item) {
  api.createCard(item.text, item.link).then((res) => {
    createCard(res);
  });
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

// popup form functionality
const addForm = new PopupWithForm({
  popupSelector: ".popup__add",
  submitFunc: (cardInfo) => {
    addNewCard(cardInfo);
  },
});
addForm.setEventListeners();

const editForm = new PopupWithForm({
  popupSelector: ".popup__edit",
  submitFunc: updateProfile,
  userInfo: user.getUserInfo(),
});
editForm.setEventListeners();

const updateForm = new PopupWithForm({
  popupSelector: ".popup__update",
  submitFunc: updateProfilePhoto,
});
updateForm.setEventListeners();

function showEdit() {
  fillProfileForm();
  editFormValidator.resetValidation();
  editForm.open();
}

function showAdd() {
  addFormValidator.resetValidation();
  addForm.open();
}

function updateProfilePhoto() {
  api.updateProfilePhoto(constant.avatarUrl.value).then((res) => {
    user.setUserInfo(res);
  });
}

function fillUpdate(userInfo) {
  const currentUser = user.getUserInfo();
  constant.avatarUrl.value = userInfo.avatar;
}

function showUpdate() {
  api.getUserInfo().then((res) => {
    fillUpdate(res);
    updateFormValidator.resetValidation();
  });
  updateForm.open();
}

const deleteCardPopup = new PopupWithSubmit(".popup__delete", deleteCard);
deleteCardPopup.setEventListeners();
function deleteCard(card, evt) {
  api.deleteCard(card._id).then((res) => evt.parentNode.remove());
}

const editFormValidator = new FormValidator(constant.settings, editForm);
const addFormValidator = new FormValidator(constant.settings, addForm);
const updateFormValidator = new FormValidator(constant.settings, updateForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
updateFormValidator.enableValidation();

constant.profilePhotoIcon.src = constant.iconImage;
constant.profilePhotoIcon.addEventListener("click", showUpdate);
constant.editButton.addEventListener("click", showEdit);
constant.addButton.addEventListener("click", showAdd);
