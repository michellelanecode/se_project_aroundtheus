export default class Api {
  constructor(info) {
    this._url = info.url;
    this._headers = info.headers;
    this._displayLoadingButton = document.querySelector(".popup__button");
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return "Error! Status " + res.status + " " + res.statusText;
    }
  }

  _displayLoading() {
    console.log(this._displayLoadingButton);
    this._loadingPreviousValue = this._displayLoadingButton.textContent;
    this._displayLoadingButton.textContent = "Saving...";
    console.log(this._loadingPreviousValue);
  }

  _hideLoading() {
    console.log(this._displayLoadingButton, this._loadingPreviousValue);
    this._displayLoadingButton.textContent = this._loadingPreviousValue;
  }

  getUserInfo() {
    return fetch(this._url + "/users/me", {
      headers: this._headers,
    })
      .then(this._getResponse)
      .catch((err) => {
        console.log(err);
      });
  }

  updateProfilePhoto(avatarLink) {
    this._displayLoading();
    return fetch(this._url + "/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLink,
      }),
    })
      .then(this._getResponse)
      .then(() => {
        this._hideLoading();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getAllCards() {
    return fetch(this._url + "/cards", {
      headers: this._headers,
    })
      .then(this._getResponse)
      .catch((err) => {
        console.log(err);
      });
  }

  createCard(cardName, cardLink) {
    return fetch(this._url + "/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: cardName,
        link: cardLink,
      }),
    })
      .then(this._getResponse)
      .catch((err) => {
        console.log(err);
      });
  }

  addLike(cardId) {
    return fetch(this._url + "/cards/likes/" + cardId, {
      method: "PUT",
      headers: this._headers,
    })
      .then(this._getResponse)
      .catch((err) => {
        console.log(err);
      });
  }

  removeLike(cardId) {
    return fetch(this._url + "/cards/likes/" + cardId, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._getResponse)
      .catch((err) => {
        console.log(err);
      });
  }

  deleteCard(cardId) {
    return fetch(this._url + "/cards/" + cardId, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._getResponse)
      .catch((err) => {
        console.log(err);
      });
  }

  updateUser(userName, aboutUser) {
    return fetch(this._url + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userName,
        about: aboutUser,
      }),
    })
      .then(this._getResponse)
      .catch((err) => {
        console.log(err);
      });
  }
}
