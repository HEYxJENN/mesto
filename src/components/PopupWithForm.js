import { Popup } from "./Popup.js";
import { add } from "../utils/consts.js";
import { config } from "../utils/config.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, { callback }) {
    super(popupSelector);

    this._submitHandler = callback;
    this._formElement = document
      .querySelector(`${popupSelector}`)
      .querySelector(".popup__forms");
    this._InputList = Array.from(
      this._formElement.querySelectorAll(config.inputSelector)
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
    console.log(evt);
    evt.preventDefault();
    this._submitHandler(this._getInputValues());
    this.closePopup();
  };

  setEventListenersFORM() {
    this._popup = document.querySelector(`${this._popupSelector}`);
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        this.closePopup();
      }
      if (evt.target.classList.contains("popup__close")) {
        this.closePopup();
      }
    });
    this._formElement.addEventListener("submit", this._handleSubmit);
  }

  openPopupFORM() {
    console.log(this._popupSelector);
    console.log(this._submitHandler);

    if (this._popupSelector === add) {
      this._formElement.reset();
    }
    super.openPopup();
  }

  closePopup() {
    super.closePopup();
    this._formElement.reset();
  }
}
