export const profileName = document.querySelector(".profile__title");
export const aboutName = document.querySelector(".profile__subtitle");
export const aboutInfo = document.querySelector(".popup__input_type_about");
export const name = document.querySelector(".popup__input_type_name");
export const editPopup = document.querySelector(".popup__edit");
export const addPopup = document.querySelector(".popup__add");
export const addPopupSubmitButton = addPopup.querySelector(".popup__button");
export const disableButtonClass = "popup__button_disabled";
export const cards = document.querySelector(".cards");
export const photoPopup = document.querySelector(".popup__image-photo");
export const photoTitle = document.querySelector(".popup__image-text");
export const popupImage = document.querySelector(".popup__image");
export const profileSubmitForm = document.querySelector(
  ".popup__form_type_edit"
);
export const cardCreateForm = document.querySelector(".popup__form_type_add");
export const editButton = document.querySelector(".profile__buttons-edit");
export const addButton = document.querySelector(".profile__buttons-add");
export const imageTitle = document.querySelector(".popup__input_type_title");
export const imageUrl = document.querySelector(".popup__input_type_link");
export const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export const initialCards = [
  {
    text: "Scranton",
    link: "images/Scranton.jpeg",
  },
  {
    text: "Silicon Valley",
    link: "images/SiliconValley.png",
  },
  {
    text: "E Corp",
    link: "images/ECorp.jpeg",
  },
  {
    text: "Downton",
    link: "images/Downton.jpeg",
  },
  {
    text: "Pawnee",
    link: "images/pawnee.jpeg",
  },
  {
    text: "Disney World",
    link: "images/disneyworld.jpeg",
  },
];
