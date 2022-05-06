export class Card {
    constructor(data, cardSelector) {
        this._text = data.text;
        this._link = data.link;
        this._cardSelector = cardSelector;
    }

    _setEventListeners(likeButton, deleteButton, cardImage) {
        likeButton.addEventListener("click", this._updateLikeButton);
        deleteButton.addEventListener("click", this._deletePhoto);
        cardImage.addEventListener("click", () => { this._openImagePopup() });
    }

    _getCardTemplate() {
        return document.querySelector(this._cardSelector).content;
    }

    _updateLikeButton() {
        this.classList.toggle("card__lovebutton_active");
    }

    _openPopup() {
        const popup = document.querySelector('.popup');
        const popupImage = document.querySelector('.popup__image');
        popup.classList.add('popup_active')
        popupImage.classList.add('popup__container_active')
    }

    _openImagePopup() {
        const photoPopup = document.querySelector('.popup__image-photo');
        const photoTitle = document.querySelector('.popup__image-text');
        photoTitle.textContent = this._text;
        photoPopup.src = this._link;
        photoPopup.alt = this._text;
        this._openPopup()
    }

    _deletePhoto() {
        const elementToRemove = this.closest('.card')
        elementToRemove.remove()
    }

    createCard() {
        const cardElement = this._getCardTemplate().cloneNode(true);
        const cardImage = cardElement.querySelector('.card__image');
        cardImage.src = this._link;
        cardImage.alt = this._text;
        cardElement.querySelector('.card__caption').textContent = this._text;
        const likeButton = cardElement.querySelector('.card__lovebutton');
        const deleteButton = cardElement.querySelector('.card__deletebutton');
        this._setEventListeners(likeButton, deleteButton, cardImage);
        return cardElement;
    }

}