import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, submitFunc) {
    super(popupSelector);
    this._submitFunc = submitFunc;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitFunc(this._cardToRemoveId, this.cardToDeleteNode);
      this.close();
    });
  }

  open(item, evt) {
    super.open();
    this._cardToRemoveId = item;
    this.cardToDeleteNode = evt;
  }
}
