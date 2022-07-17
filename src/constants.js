const scrantonImage = new URL("./images/Scranton.jpeg", import.meta.url);
const siliconVImage = new URL("./images/SiliconValley.png", import.meta.url);
const pawneeImage = new URL("./images/pawnee.jpeg", import.meta.url);
const ecorpImage = new URL("./images/ECorp.jpeg", import.meta.url);
const downtonImage = new URL("./images/Downton.jpeg", import.meta.url);
const disneyImage = new URL("./images/disneyworld.jpeg", import.meta.url);

export const profileName = document.querySelector(".profile__title");
export const aboutName = document.querySelector(".profile__subtitle");
export const aboutInfo = document.querySelector(".popup__input_type_about");
export const name = document.querySelector(".popup__input_type_name");
export const editPopup = document.querySelector(".popup__edit");
export const addPopup = document.querySelector(".popup__add");
export const addPopupSubmitButton = addPopup.querySelector(".popup__button");
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
    link: scrantonImage,
  },
  {
    text: "Silicon Valley",
    link: siliconVImage,
  },
  {
    text: "E Corp",
    link: ecorpImage,
  },
  {
    text: "Downton",
    link: downtonImage,
  },
  {
    text: "Pawnee",
    link: pawneeImage,
  },
  {
    text: "Disney World",
    link: disneyImage,
  },
];
