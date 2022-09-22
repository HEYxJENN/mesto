import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
  constructor(cardSelector, zoom, caption) {
    super(cardSelector);
    this._cardSelector = cardSelector;
    this._zoom = zoom;
    this._caption = caption;
  }
  open({ name, link }) {
    this._zoom.src = link;
    this._zoom.alt = name;
    this._caption.textContent = name;
    super.open();
  }
}
