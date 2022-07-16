export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(popupSelector);
    this._handleClickEvent = this._handleOutsideClick.bind(this);
    this._handleEsc = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add("popup__container_active");
    document.querySelector(".popup").classList.add("popup_active");
    document.addEventListener("keydown", this._handleEsc);
    document.addEventListener("click", this._handleClickEvent);
  }

  close() {
    this._popupElement.classList.remove("popup__container_active");
    document.querySelector(".popup").classList.remove("popup_active");
    document.removeEventListener("keydown", this._handleEsc);
    document.removeEventListener("click", this._handleClickEvent);
  }

  _handleEscClose(event) {
    if (event.key == "Escape") {
      this.close();
    }
  }

  _handleOutsideClick(event) {
    if (event.target.classList.contains("popup_active")) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement
      .querySelector(".popup__form-close")
      .addEventListener("click", () => this.close());
  }
}
