export default class Api {
  constructor(info) {
    this._url = info.url;
    this._headers = info.headers;
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return "Error! Status " + res.status + " " + res.statusText;
    }
  }

  getUserInfo() {
    return fetch(this._url + "/users/me", {
      headers: this._headers,
    }).then(this._getResponse);
  }

  getAllCards() {
    return fetch(this._url + "/cards", {
      headers: this._headers,
    }).then(this._getResponse);
  }
}
