import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(data) {
    this._popupElement.querySelector(".popup__image-photo").src = data.link;
    this._popupElement.querySelector(".popup__image-photo").alt = data.text;
    this._popupElement.querySelector(".popup__image-text").textContent =
      data.text;
    super.open();
  }
}
