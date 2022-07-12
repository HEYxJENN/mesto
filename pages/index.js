//импорты
import { config } from "../utils/config.js";

import { items } from "../utils/items.js";

import { Card } from "../components/Card.js";

import { Popup } from "../components/Popup.js";

import { Section } from "../components/Section.js";

import { UserInfo } from "../components/UserInfo.js";

import { FormValidator } from "../components/FormValidator.js";

import { PopupWithForm } from "../components/PopupWithForm.js";

import {
  buttonClosePopup,
  nameMaybe,
  captionMaybe,
  nameNow,
  captionNow,
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
  formAdd,
  formEdit,
  popups,
  edit,
  add,
  zoomer,
} from "../utils/consts.js";
import { PopupWithImage } from "../components/PopupWithImage.js";

//создания
const cardsContainer = new Section(
  {
    items: items,
    renderer: createCard,
  },
  listElements
);

const userInfo = new UserInfo({
  nameSelector: nameNow,
  captionSelector: captionNow,
});

const popupProfileInfo = new PopupWithForm(
  edit,
  {
    callback: (data) => {
      userInfo.setUserInfo(data);
    },
  }
  // { callback: userInfo.setUserInfo(userInfo.getUserInfo()) }
);

const popupAddNewPlace = new PopupWithForm(add, {
  callback: (data) => {
    cardsContainer.addItem({ name: data.placename, link: data.link });
  },
});

const zoomImage = new PopupWithImage(zoomer);

function createCard(name, link) {
  const card = new Card(name, link, "#template", () =>
    zoomImage.open({ name, link })
  );
  const cardElement = card.createItem();
  return cardElement;
}

const formValidators = {};
Array.from(document.forms).forEach((formElement) => {
  formValidators[formElement.name] = new FormValidator(config, formElement);
  formValidators[formElement.name].enableValidation();
});

//вызовы
cardsContainer.rendererAll();

//слушатели
popupOpenEditButton.addEventListener("click", function edit() {
  popupProfileInfo.openPopupFORM();

  formValidators["form-edit"].resetValidation();
  console.log("setting listener");
  popupProfileInfo.setEventListenersFORM();
});
popupOpenAddButton.addEventListener("click", function add() {
  popupAddNewPlace.openPopupFORM();
  formValidators["form-add"].resetValidation();
  console.log("setting listener");
  popupAddNewPlace.setEventListenersFORM();
});
