export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(`${this._popupSelector}`);
  }

  openPopup() {
    this._popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", this._closePopupByEsc);
    this.setEventListeners;
  }

  closePopup() {
    document.removeEventListener("keydown", this._closePopupByEsc);
    document
      .querySelector(`${this._popupSelector}`)
      .classList.remove("popup_opened");
  }

  _closePopupByEsc = (evt) => {
    if (evt.key === "Escape") {
      this.closePopup();
    }
  };

  _closeByOverlay = (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      this.closePopup();
    }
    if (evt.target.classList.contains("popup__close")) {
      this.closePopup();
    }
  };

  setEventListeners = () => {
    // this._popup = document.querySelector(`${this._popupSelector}`);
    this._popupElement.addEventListener("mousedown", this._closeByOverlay);
  };
}
