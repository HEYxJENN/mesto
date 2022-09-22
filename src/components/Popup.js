export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(`${this._popupSelector}`);
  }

  open() {
    this._popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", this._closePopupByEsc);
    this.setEventListeners();
  }

  close() {
    document.removeEventListener("keydown", this._closePopupByEsc);
    this._popupElement.classList.remove("popup_opened");
  }

  _closePopupByEsc = (evt) => {
    if (evt.key === "Escape") {
      this.closePopup();
    }
  };

  _closeByOverlay = (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      this.close();
    }
    if (evt.target.classList.contains("popup__close")) {
      this.close();
    }
  };

  setEventListeners() {
    // this._popup = document.querySelector(`${this._popupSelector}`);
    this._popupElement.addEventListener("mousedown", this._closeByOverlay);
  }
}
