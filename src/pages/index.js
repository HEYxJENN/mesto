//импорты
import "./index.css";

import { config } from "../utils/config.js";

import { items } from "../utils/items.js";

import { Card } from "../components/Card.js";

import { Section } from "../components/Section.js";

import { UserInfo } from "../components/UserInfo.js";

import { FormValidator } from "../components/FormValidator.js";

import { PopupWithForm } from "../components/PopupWithForm.js";

import {
  nameNow,
  captionNow,
  listElements,
  popupOpenEditButton,
  popupOpenAddButton,
  edit,
  add,
  zoomer,
  zoomImg,
  captionImg,
  nameMaybe,
  captionMaybe,
} from "../utils/consts.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { data } from "autoprefixer";

//создания
const cardsContainer = new Section(
  {
    items: items,
    renderer: createCard,
  },
  listElements
);

const userInformation = new UserInfo({
  nameInfo: nameNow,
  captionInfo: captionNow,
});

const popupProfileInfo = new PopupWithForm(edit, config, {
  callback: (data) => {
    userInformation.setUserInfo(data);
  },
});
// popupProfileInfo.setEventListeners();

const popupAddNewPlace = new PopupWithForm(add, config, {
  callback: (data) => {
    cardsContainer.addItem({ name: data.placename, link: data.link });
  },
});
// popupAddNewPlace.setEventListeners;

const zoomImage = new PopupWithImage(zoomer, zoomImg, captionImg);

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

//функции
function editing() {
  const dataGet = userInformation.getUserInfo();
  nameMaybe.value = dataGet.name;
  captionMaybe.value = dataGet.about;

  popupProfileInfo.openPopup();
  formValidators["form-edit"].resetValidation();
}

function adding() {
  popupAddNewPlace.openPopup();
  formValidators["form-add"].resetValidation();
}

//слушатели
popupOpenEditButton.addEventListener("click", editing);
popupOpenAddButton.addEventListener("click", adding);
