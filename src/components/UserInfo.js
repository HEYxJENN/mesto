export class UserInfo {
  constructor({ nameSelector, captionSelector }) {
    this._nameSelector = nameSelector;
    this._captionSelector = captionSelector;
  }

  setUserInfo = (data) => {
    console.log(data);
    this._nameSelector.textContent = data.name || "";
    this._captionSelector.textContent = data.about || "";
  };

  getUserInfo = () => {
    return {
      name: this._nameSelector.textContent,
      about: this._captionSelector.textContent,
    };
  };
}
