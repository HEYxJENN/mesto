export class UserInfo {
  constructor({ nameInfo, captionInfo }) {
    this._nameInfo = nameInfo;
    this._captionInfo = captionInfo;
  }

  setUserInfo = (data) => {
    this._nameInfo.textContent = data.name || "";
    this._captionInfo.textContent = data.about || "";
  };

  getUserInfo = () => {
    return {
      name: this._nameInfo.textContent,
      about: this._captionInfo.textContent,
    };
  };
}
