//импорты
import { config } from "../utils/config.js";

import { items } from "../utils/items.js";

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
const openPopup = function (element) {
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

/*добавление кода*/

function createItem(item) {
  const itemElement = itemTemplateContent.cloneNode(true);
  itemElement.querySelector(".element__name").textContent = item.name;
  itemElement.querySelector(".element__image").src = item.link;
  itemElement.querySelector(".element__image").alt = item.name;
  setEventListeners(itemElement);
  return itemElement;
}

function renderItem(item) {
  listElements.prepend(createItem(item));
}

function renderItems(items) {
  items.forEach(renderItem);
}
renderItems(items);

/*сохранение профиль*/

function formEditSubmitHandler(evt) {
  evt.preventDefault();
  nameNow.textContent = nameMaybe.value;
  captionNow.textContent = captionMaybe.value;
  closePopup(popupEdit);
}

/*лайки*/

function handleLike(event) {
  const itemElement = event.target;
  itemElement.classList.toggle("element__heart_active");
  itemElement.classList.toggle("element__heart");
}

/*удаление*/

function handleDelete(event) {
  const itemElement = event.target.closest(".element");
  itemElement.remove();
}

/*добавление*/

const addPlace = (evt) => {
  evt.preventDefault();
  renderItem({
    name: placeNameMaybe.value,
    link: linkMaybe.value,
  });
  closePopup(popupAdd);
};

/*картинка zoom*/
function zoomImage(evt) {
  zoomImg.src = evt.target.src;
  zoomImg.alt = evt.target.alt;
  captionImg.textContent = evt.target.alt;
  openPopup(zoom);
}

const FormValidators = {};

Array.from(document.forms).forEach((formElement) => {
  FormValidators[formElement.name] = new FormValidator(config, formElement);
  FormValidators[formElement.name].enableValidation();
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

//лайкудалениезум
function setEventListeners(itemElement) {
  itemElement
    .querySelector(".element__delete")
    .addEventListener("click", handleDelete);
  itemElement
    .querySelector(".element__heart")
    .addEventListener("click", handleLike);
  itemElement
    .querySelector(".element__image")
    .addEventListener("click", zoomImage);
}

//нажатиекрестика
document.querySelectorAll(".popup").forEach((element) => {
  element
    .querySelector(".popup__close")
    .addEventListener("click", () => closePopup(element));
});
