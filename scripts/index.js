//импорты
import { config } from "../utils/config.js";

import { items } from "../utils/items.js";

import { Card } from "./card.js";

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
} from "../utils/consts.js";

import { FormValidator } from "./FormValidator.js";

//функции открытия
export const openPopup = function (element) {
  element.classList.add("popup_opened");

  document.addEventListener("keydown", closePopupByEsc);
};

const openProfilePopup = function (element) {
  element.querySelector(".popup__forms").reset();
  nameMaybe.placeholder = nameNow.textContent;
  captionMaybe.placeholder = captionNow.textContent;

  FormValidators["form-edit"].disableSubmitButton(
    element.querySelector(".popup__save")
  );
  openPopup(element);
};

const openAddPopup = function (element) {
  element.querySelector(".popup__forms").reset();
  FormValidators["form-add"].disableSubmitButton(
    element.querySelector(".popup__save")
  );
  openPopup(element);
};

//функции закрытия
const closePopup = function (element) {
  document.removeEventListener("keydown", closePopupByEsc);

  element.classList.remove("popup_opened");
};

function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
}

const closePopupArea = function (event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closePopup(event.target);
};

/*сохранение профиль*/

function formEditSubmitHandler(evt) {
  evt.preventDefault();
  nameNow.textContent = nameMaybe.value;
  captionNow.textContent = captionMaybe.value;
  closePopup(popupEdit);
}

/*добавление*/

const addPlace = (evt) => {
  evt.preventDefault();

  const card = new Card(
    placeNameMaybe.value,
    linkMaybe.value,
    "#template",
    config
  );
  const cardElement = card.createItem();
  listElements.prepend(cardElement);

  closePopup(popupAdd);
};

//включение валидации
const FormValidators = {};

Array.from(document.forms).forEach((formElement) => {
  FormValidators[formElement.name] = new FormValidator(config, formElement);
  FormValidators[formElement.name].enableValidation();
});

//Перебор итемс
items.forEach((item) => {
  const card = new Card(item.name, item.link, "#template", config);
  const cardElement = card.createItem();
  listElements.prepend(cardElement);
});

//слушатели
//открытия
popupOpenEditButton.addEventListener("click", () =>
  openProfilePopup(popupEdit)
);
popupOpenAddButton.addEventListener("click", () => openAddPopup(popupAdd));
//закрытия
popupAdd.addEventListener("click", closePopupArea);
popupEdit.addEventListener("click", closePopupArea);
zoom.addEventListener("click", closePopupArea);

//сабмита
popupEdit.addEventListener("submit", formEditSubmitHandler);
popupAdd.addEventListener("submit", addPlace);

//нажатиекрестика
document.querySelectorAll(".popup").forEach((element) => {
  element
    .querySelector(".popup__close")
    .addEventListener("click", () => closePopup(element));
});
