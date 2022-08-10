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

const imagePopup = new PopupWithImage(".popup__image");
imagePopup.setEventListeners();
const cardSection = new Section([], initialCardRender, ".cards");

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

//initalize profile and cards

Promise.all([api.getUserInfo(), api.getAllCards()])
  // destructure the response
  .then(([userData, cards]) => {
    user.setUserInfo(userData);
    cards.map((card) => {
      const newCard = createNewCard(card);
      cardSection.addItem(newCard.createCard());
    });
  })
  .catch((err) => {
    console.log(err);
  });

function initialCardRender(section, item) {
  item = item.createCard();
  section.addItem(item);
}

//likebutton functionality

function updateLikeButton(card) {
  let method = "PUT";
  if (card.likeStatus) {
    method = "DELETE";
  }
  api
    .likeCard(card.getCardId(), method)
    .then((res) => {
      card.updateLikes(res.likes.length);
    })
    .catch((err) => {
      console.log(err);
    });
}

function createNewCard(item) {
  const newCard = new Card(
    item,
    "#card",
    () => {
      imagePopup.open(item);
    },
    getCardToDelete,
    user.getId(),
    updateLikeButton
  );
  return newCard;
}

// card functionality
function addNewCard(popup, item) {
  popup.renderLoading(true);
  api
    .createCard(item.text, item.link)
    .then((res) => {
      const newCard = createNewCard(res);
      cardSection.addItem(newCard.createCard());
      addForm.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popup.renderLoading(false);
    });
}

// add card form functionality
const addForm = new PopupWithForm({
  popupSelector: ".popup__add",
  submitFunc: addNewCard,
});
addForm.setEventListeners();

function showAdd() {
  addFormValidator.resetValidation();
  addForm.open();
}

//edit profile functionality
const editForm = new PopupWithForm({
  popupSelector: ".popup__edit",
  submitFunc: updateProfile,
});
editForm.setEventListeners();

function showEdit() {
  fillProfileForm();
  editFormValidator.resetValidation();
  editForm.open();
}

function updateProfile(section, userInfo) {
  editForm.renderLoading(true);

  api
    .updateUser(userInfo.name, userInfo.about)
    .then((res) => {
      user.setUserInfo(res);
      editForm.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      editForm.renderLoading(false);
    });
}

function fillProfileForm() {
  const currentUser = user.getUserInfo();
  constant.name.value = currentUser.userNameInput;
  constant.aboutInfo.value = currentUser.userInfoInput;
}

// update avatar functionality

const updateForm = new PopupWithForm({
  popupSelector: ".popup__update",
  submitFunc: updateProfilePhoto,
});
updateForm.setEventListeners();

function showUpdate() {
  updateForm.resetValidation;
  updateForm.open();
}

function updateProfilePhoto(section, link) {
  updateForm.renderLoading(true);
  api
    .updateProfilePhoto(link.link)
    .then((res) => {
      user.setUserInfo(res);
      updateForm.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      updateForm.renderLoading(false);
    });
}

const deleteCardPopup = new PopupWithSubmit(".popup__delete", deleteCard);
deleteCardPopup.setEventListeners();

function getCardToDelete(card) {
  deleteCardPopup.open(card);
}

function deleteCard(card) {
  api
    .deleteCard(card.getCardId())
    .then((res) => {
      card.deleteCard();
      deleteCardPopup.close();
    })
    .catch((err) => console.log(err));
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
