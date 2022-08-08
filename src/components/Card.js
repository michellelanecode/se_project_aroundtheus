export default class Card {
  constructor(
    data,
    cardSelector,
    handleClick,
    handleDeleteClick,
    userId,
    updateLikeButton
  ) {
    this._likes = data.likes;
    this._userId = userId;
    this._cardOwnerId = data.cardOwner;
    this._cardId = data.id;
    this._text = data.name;
    this._link = data.link;
    this._likeCount = data.likes.length;
    this._updateLikeButton = updateLikeButton.bind(this);
    this._handleClick = handleClick;
    this._handleDeleteClick = handleDeleteClick;
    this._cardSelector = cardSelector;
    this._cardElement = this._getCardTemplate().cloneNode(true);
    this._likeButton = this._cardElement.querySelector(".card__lovebutton");
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardLikeCount = this._cardElement.querySelector(".card__like_count");
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", (evt) => {
      this._updateLikeButton(evt, this._cardId);
    });
    this._cardImage.addEventListener("click", this._handleClick);
  }

  _getCardTemplate() {
    return document.querySelector(this._cardSelector).content;
  }

  updateLikeCount(likeCount) {
    this._likeCount = likeCount;
    this._cardLikeCount.textContent = likeCount;
  }

  _checkForLikes() {
    this._likes.forEach((like) => {
      if (like._id === this._userId) {
        this._likeButton.classList.toggle("card__lovebutton_active");
      }
    });
  }

  _addDeleteIcon() {
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("card__deletebutton");
    this._cardElement.querySelector(".card").prepend(deleteButton);
    this._deleteButton = this._cardElement.querySelector(".card__deletebutton");
    this._deleteButton.addEventListener("click", (evt) =>
      this._handleDeleteClick(evt.target)
    );
  }

  createCard() {
    if (this._cardOwnerId === this._userId) {
      this._addDeleteIcon();
    }
    this._checkForLikes();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._text;
    this._cardLikeCount.textContent = this._likeCount;
    this._cardElement.querySelector(".card__caption").textContent = this._text;
    this._cardImage.id = this._cardId;
    this._setEventListeners();
    return this._cardElement;
  }
}
