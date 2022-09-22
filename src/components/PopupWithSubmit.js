import { PopupWithForm } from "./PopupWithForm.js";

export class PopupWithSubmit extends PopupWithForm {
  setSubmit(act) {
    this._submitHandler = act;
  }
}
