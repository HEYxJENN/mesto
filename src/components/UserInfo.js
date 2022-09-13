export class UserInfo {
  constructor({ nameInfo, captionInfo, avatarInfo }) {
    this._nameInfo = nameInfo;
    this._captionInfo = captionInfo;
    this._avatarInfo = avatarInfo;
  }

  setUserInfo = (data) => {
    this._nameInfo.textContent = data.name || "";
    this._captionInfo.textContent = data.about || "";
    this._avatarInfo.src = data.avatar || "";
  };

  getUserInfo = () => {
    return {
      name: this._nameInfo.textContent,
      about: this._captionInfo.textContent,
      avatar: this._avatarInfo.src,
    };
  };
}
