/*переменныеее*/
const buttonClosePopup = document.querySelectorAll(".popup__close");
const nameMaybe = document.querySelector("#entername");
const captionMaybe = document.querySelector("#enterabout");
const nameNow = document.querySelector(".profile__name");
const captionNow = document.querySelector(".profile__caption");
const avatarNow = document.querySelector(".profile__image");
const trashBin = document.querySelector(".element__delete");
const listElements = document.querySelector(".elements");
const itemTemplateContent = document.querySelector("#template").content;

const popupOpenEditButton = document.querySelector(".profile__edit");
const popupOpenAddButton = document.querySelector(".profile__add");
const popupEdit = document.querySelector("#popup__edit");
const popupAdd = document.querySelector("#popup__add");

const zoomImg = document.querySelector(".popup__zoomimg");
const captionImg = document.querySelector(".popup__zoomimg-caption");
const zoom = document.querySelector("#zoomImg");

const placeNameMaybe = document.querySelector("#enterplacename");
const linkMaybe = document.querySelector("#enterlink");
const avatarMaybe = document.querySelector(".enterAvatarLink");

const formEdit = document.querySelector("#form__edit");
const formAdd = document.querySelector("#form__add");

const popups = document.querySelectorAll(".popup");

const edit = "#popup__edit";
const add = "#popup__add";
const zoomer = "#zoomImg";
const ava = "#popup__profile";

export {
  buttonClosePopup,
  nameMaybe,
  captionMaybe,
  nameNow,
  captionNow,
  avatarNow,
  trashBin,
  listElements,
  itemTemplateContent,
  popupOpenEditButton,
  popupOpenAddButton,
  popupEdit,
  popupAdd,
  zoomImg,
  captionImg,
  zoom,
  placeNameMaybe,
  linkMaybe,
  avatarMaybe,
  formAdd,
  formEdit,
  popups,
  edit,
  add,
  zoomer,
  ava,
};
