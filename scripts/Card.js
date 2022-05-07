import {openPopup} from "./utils.js"
export class Card {
    constructor(data, cardSelector) {
        this._text = data.text;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._photoPopup =  document.querySelector('.popup__image-photo');
        this._photoTitle = document.querySelector('.popup__image-text');
        this._popupImage = document.querySelector('.popup__image');
        this._cardElement = this._getCardTemplate().cloneNode(true);
        this._likeButton = this._cardElement.querySelector('.card__lovebutton');
        this._deleteButton = this._cardElement.querySelector('.card__deletebutton');
        this._cardImage = this._cardElement.querySelector('.card__image');
    }

    _setEventListeners() {
        this._likeButton.addEventListener("click", (evt) =>{this._updateLikeButton(evt)});
        this._deleteButton.addEventListener("click", this._deletePhoto);
        this._cardImage.addEventListener("click", () => { this._openImagePopup() });
    }

    _getCardTemplate() {
        return document.querySelector(this._cardSelector).content;
    }

    _updateLikeButton(evt) {
        evt.target.classList.toggle("card__lovebutton_active");
    }


    _openImagePopup() {
        this._photoTitle.textContent = this._text;
        this._photoPopup.src = this._link;
       this._photoPopup.alt = this._text;
        this._popupImage.classList.add('popup__container_active')
        openPopup(this._photoPopup)
    }

    _deletePhoto() {
        const elementToRemove = this.closest('.card')
        elementToRemove.remove()
    }

    createCard() {
        this._cardImage.src = this._link;
        this._cardImage.alt = this._text;
        this._cardElement.querySelector('.card__caption').textContent = this._text;
        this._setEventListeners();
        return this._cardElement;
    }

}

