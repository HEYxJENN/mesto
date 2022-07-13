import { Popup } from "./Popup.js";
import { zoomImg, captionImg } from "../utils/consts.js";

export class PopupWithImage extends Popup {
  constructor(cardSelector) {
    super(cardSelector);
    this._cardSelector = cardSelector;
  }
  open({ name, link }) {
    zoomImg.src = link;
    zoomImg.alt = name;
    captionImg.textContent = name;
    super.openPopup();
  }
}
