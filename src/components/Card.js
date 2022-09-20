// import { likes } from "../utils/consts";
export class Card {
  constructor(
    name,
    link,
    datalikes,
    cardId,
    ownerId,
    id,
    template,
    likeCounter,
    { handlePictureClick, handleLikeImageClick, handleDeleteClick }
  ) {
    this._name = name;
    this._link = link;
    this._likes = datalikes;
    this._cardId = cardId;
    this._id = id;
    this._ownerId = ownerId;
    this._cardSelector = template;
    this._zoomClick = handlePictureClick;
    this._likeClick = handleLikeImageClick;
    this._deleteClick = handleDeleteClick;
    this._likeCounter = likeCounter;

    this._itemElement = this._getTemplate();
    this._deleteButton = this._itemElement.querySelector(".element__delete");
    this._likeButton = this._itemElement.querySelector(".element__heart");
    this._zoomPic = this._itemElement.querySelector(".element__image");
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
    this._itemElement.querySelector(".element__name").textContent = this._name;
    this._zoomPic.src = this._link;
    this._zoomPic.alt = this._name;
    this._setEventListeners();
    this._deleteButton.classList.add(
      this._id === this._ownerId
        ? "element__delete_visible"
        : "element__delete_hidden"
    );
    this.changeLikeView();
    return this._itemElement;
  }

  /*лайки*/
  setLike = (data) => {
    console.log("LIKED");
    this.changeLikeView;
    this._likeButton.classList.toggle("element__heart_active");

    this._itemElement.querySelector(this._likeCounter).textContent =
      data.likes.length;
  };

  isLiked() {
    return Boolean(this._likes.find((item) => item._id === this._id));
  }

  changeLikeView = () => {
    this._itemElement.querySelector(this._likeCounter).textContent =
      this._likes.length;

    if (this.isLiked()) {
      this._likeButton.classList.add("element__heart_active");
    } else {
      this._likeButton.classList.remove("element__heart_active");
    }
  };

  // /*удаление*/
  handleDeleteApproved() {
    this._itemElement.remove();
    this._itemElement = null;
  }

  // id
  getCardId = () => {
    return this._cardId;
  };

  //лайкудалениезумСЛУШАТЕЛИ
  _setEventListeners() {
    this._deleteButton.addEventListener("click", this._deleteClick);

    this._likeButton.addEventListener("click", this._likeClick);

    this._zoomPic.addEventListener("click", this._zoomClick);
  }
}
