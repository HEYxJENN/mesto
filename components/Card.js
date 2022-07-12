//ненужныевроде
// // import { openPopup } from "../pages/index.js";
// import { zoomImg, zoom, captionImg } from "../utils/consts.js";
// import { Popup } from "./Popup";

//НУЖНЫЕ если попапимг
import { zoomer } from "../utils/consts.js";
import { PopupWithImage } from "./PopupWithImage.js";

export class Card {
  constructor(name, link, template, callback) {
    this._name = name;
    this._link = link;
    this._cardSelector = template;
    this._callback = callback;
    // this._handleCardClick = handleCardClick;
  }

  /*добавление кода*/

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }

  createItem() {
    this._itemElement = this._getTemplate();
    this._itemElement.querySelector(".element__name").textContent = this._name;
    this._itemElement.querySelector(".element__image").src = this._link;
    this._itemElement.querySelector(".element__image").alt = this._name;
    this._deleteButton = this._itemElement.querySelector(".element__delete");
    this._likeButton = this._itemElement.querySelector(".element__heart");
    this._zoomPic = this._itemElement.querySelector(".element__image");
    this._setEventListeners();
    return this._itemElement;
  }

  /*лайки*/

  _handleLike = () => {
    console.log(this._itemElement);
    this._likeButton.classList.toggle("element__heart_active");
    this._likeButton.classList.toggle("element__heart");
  };

  // /*удаление*/
  _handleDelete = () => {
    this._itemElement.remove();
  };

  // ЗУМ; не подставляет линк и нейм, только кардселектор
  _handleImage = () => {
    // this._handleCardClick({ name: this._name, link: this._link });
    // const zoomPopup = new PopupWithImage(zoomer, {
    //   nameIS: this._name,
    //   link: this._link,
    // });
    this._callback();
  };

  //лайкудалениезумСЛУШАТЕЛИ
  _setEventListeners() {
    this._deleteButton.addEventListener("click", this._handleDelete);

    this._likeButton.addEventListener("click", this._handleLike);

    this._zoomPic.addEventListener("click", this._handleImage);
    // this._zoomImage БЫЛО
    //почему не оставить так, зачем выносить?
  }
}

// БЫЛО // /*картинка zoom*/
// _zoomImage = () => {
//   console.log(this._itemElement);
//   zoomImg.src = this._link;
//   captionImg.textContent = this._name;
//   zoomImg.alt = this._name;
//   openPopup(zoom);
// };
