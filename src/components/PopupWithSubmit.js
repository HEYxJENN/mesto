import { PopupWithForm } from "./PopupWithForm.js";

export class PopupWithSubmit extends PopupWithForm {
  // constructor(cardSelector, configuration, { callback }) {
  // super(cardSelector, configuration, { callback });
  // this._submitHandler = callback;}

  setSubmit(act) {
    this._submitHandler = act;
  }
}

// setEventListeners() {
//   evt.preventDefault();
//   this._submitHandler();
//   super.setEventListeners();
// }
// }

// import { Popup } from "./Popup";

// export class PopupWithSubmit extends Popup {
//   constructor(popupSelector) {
//     super(popupSelector);
//   }
// }
