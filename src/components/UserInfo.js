export default class UserInfo {
  constructor(userNameSelector, userInfoSelector, userAvatarSelector) {
    this._userAvatar = document.querySelector(userAvatarSelector);
    this._userName = document.querySelector(userNameSelector);
    this._userInfo = document.querySelector(userInfoSelector);
  }

  getUserInfo() {
    return {
      userNameInput: this._userName.textContent,
      userInfoInput: this._userInfo.textContent,
      userAvatar: this._userAvatar,
    };
  }

  getId() {
    return this._userId;
  }

  setUserInfo(userInfo) {
    this._userName.textContent = userInfo.name;
    this._userInfo.textContent = userInfo.about;
    this._userAvatar.src = userInfo.avatar;
    this._userAvatar.alt = userInfo.name;
    this._userId = userInfo._id;
  }
}
