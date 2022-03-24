const editButton = document.querySelector(".profile__buttons-edit");
const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__form-close");
const profileName = document.querySelector(".profile__title");
const aboutMe = document.querySelector(".profile__subtitle");
const saveButton = document.querySelector(".popup__form-button");
const modalWindow = document.querySelector(".popup__form");
const loveButtons = document.querySelectorAll(".card__lovebutton");
const name = document.querySelector(".popup__form-field_name");
const aboutInfo = document.querySelector(".popup__form-field_about");

const popUp = function () {
  console.log("running");
  popup.style.visibility = "visible";
};

const closePopup = function () {
  name.value = "";
  aboutInfo.value = "";
  popup.style.visibility = "hidden";
};

const updateProfile = function () {
  event.preventDefault();
  profileName.textContent = name.value;
  aboutMe.textContent = aboutInfo.value;
  name.value = "";
  aboutInfo.value = "";
  popup.style.visibility = "hidden";
};

const loveButtonUpdate = function () {
  if (this.className === "card__lovebutton card__lovebutton_disabled") {
    this.className = "card__lovebutton card__lovebutton_active";
  } else {
    this.className = "card__lovebutton card__lovebutton_disabled";
  }
};

editButton.addEventListener("click", popUp);

closeButton.addEventListener("click", closePopup);

modalWindow.addEventListener("submit", updateProfile);

loveButtons.forEach(function (button) {
  button.addEventListener("click", loveButtonUpdate);
});
