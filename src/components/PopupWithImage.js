import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popupElement.querySelector(".popup__image-photo");
    this._imageText = this._popupElement.querySelector(".popup__image-text");
  }

  open(data) {
    this._image.src = data.link;
    this._image.alt = data.text;
    this._imageText.textContent = data.text;
    super.open();
  }
}
