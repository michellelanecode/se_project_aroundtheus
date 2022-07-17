export default class UserInfo {
  constructor(userNameSelector, userInfoSelector) {
    this._userName = document.querySelector(userNameSelector);
    this._userInfo = document.querySelector(userInfoSelector);
  }

  getUserInfo() {
    return {
      userNameInput: this._userName.textContent,
      userInfoInput: this._userInfo.textContent,
    };
  }

  setUserInfo(userInfo) {
    this._userName.textContent = userInfo.name;
    this._userInfo.textContent = userInfo.about;
  }
}
