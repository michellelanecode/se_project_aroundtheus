export default class Api {
  constructor(info) {
    this._url = info.url;
    this._headers = info.headers;
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error ${res.status}`);
    }
  }

  getUserInfo() {
    return fetch(this._url + "/users/me", {
      headers: this._headers,
    }).then(this._getResponse);
  }

  updateProfilePhoto(avatarLink) {
    return fetch(this._url + "/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLink,
      }),
    }).then(this._getResponse);
  }

  getAllCards() {
    return fetch(this._url + "/cards", {
      headers: this._headers,
    }).then(this._getResponse);
  }

  createCard(cardName, cardLink) {
    return fetch(this._url + "/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: cardName,
        link: cardLink,
      }),
    }).then(this._getResponse);
  }

  likeCard(cardId, methodType) {
    return fetch(this._url + "/cards/likes/" + cardId, {
      method: methodType,
      headers: this._headers,
    }).then(this._getResponse);
  }

  deleteCard(cardId) {
    return fetch(this._url + "/cards/" + cardId, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getResponse);
  }

  updateUser(userName, aboutUser) {
    return fetch(this._url + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userName,
        about: aboutUser,
      }),
    }).then(this._getResponse);
  }
}
