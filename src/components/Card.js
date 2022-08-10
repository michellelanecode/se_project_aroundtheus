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
    this._cardOwnerId = data.owner._id;
    this._cardId = data._id;
    this._text = data.name;
    this._link = data.link;
    this._likeCount = data.likes.length;
    this._updateLikeButton = updateLikeButton;
    this._handleClick = handleClick;
    this._handleDeleteClick = handleDeleteClick;
    this._cardSelector = cardSelector;
    this._cardElement = this._getCardTemplate().cloneNode(true);
    this._likeButton = this._cardElement.querySelector(".card__lovebutton");
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardLikeCount = this._cardElement.querySelector(".card__like_count");
  }

  _setEventListeners() {
    this._checkForLikes();
    this._likeButton.addEventListener("click", (evt) => {
      this._updateLikeButton(this);
    });
    this._cardImage.addEventListener("click", this._handleClick);
  }

  _getCardTemplate() {
    return document.querySelector(this._cardSelector).content;
  }

  getCardId() {
    return this._cardId;
  }

  getCard() {
    return this;
  }

  updateLikes(likeCount) {
    this._likeButton.classList.toggle("card__lovebutton_active");
    this._likeCount = likeCount;
    this._cardLikeCount.textContent = likeCount;
    this.likeStatus = !this.likeStatus;
  }

  _checkForLikes() {
    this._likes.forEach((like) => {
      if (like._id === this._userId) {
        this._likeButton.classList.toggle("card__lovebutton_active");
        this.likeStatus = true;
      }
    });
  }

  deleteCard() {
    this._deleteButton.closest("li").remove();
  }

  _addDeleteIcon() {
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("card__deletebutton");
    this._cardElement.querySelector(".card").prepend(deleteButton);
    this._deleteButton = this._cardElement.querySelector(".card__deletebutton");
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteClick(this)
    );
  }

  createCard() {
    if (this._cardOwnerId === this._userId) {
      this._addDeleteIcon();
    }
    this._cardImage.src = this._link;
    this._cardImage.alt = this._text;
    this._cardLikeCount.textContent = this._likeCount;
    this._cardElement.querySelector(".card__caption").textContent = this._text;
    this._cardImage.id = this._cardId;
    this._setEventListeners();
    return this._cardElement;
  }
}
