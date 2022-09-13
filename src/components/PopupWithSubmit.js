import { Popup } from "./Popup";

export class PopupWithSubmit extends Popup {
  constructor(cardSelector, { callback }) {
    super(cardSelector);
    this._submitHandler = callback;
  }

  setEventListeners() {
    evt.preventDefault();
    this._submitHandler();
    super.setEventListeners;
  }
}
