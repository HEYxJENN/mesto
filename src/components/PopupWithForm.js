import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
  constructor(popupSelector, configuration, { callback }) {
    super(popupSelector);
    this._submitHandler = callback;
    this._formElement = this._popupElement.querySelector(".popup__forms");
    this._InputList = Array.from(
      this._formElement.querySelectorAll(configuration.inputSelector)
    );
  }
  _getInputValues = () => {
    const values = {};
    this._InputList.forEach((input) => {
      values[input.id.slice(5)] = input.value;
    });
    return values;
  };

  _handleSubmit = (evt) => {
    evt.preventDefault();
    this._submitHandler(this._getInputValues());
    this.closePopup();
  };

  setEventListeners() {
    this._formElement.addEventListener("submit", this._handleSubmit);
    super.setEventListeners();
  }

  closePopup = () => {
    this._formElement.reset();
    super.closePopup();
  };
}
