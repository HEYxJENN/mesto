//импорты
import { config } from "../utils/config.js";

import { items } from "../utils/items.js";

import { Card } from "../components/Card.js";

import { Popup } from "../components/Popup.js";

import { PopupWithForm } from "../components/PopupWithForm.js";

import { PopupWithImage } from "../components/PopupWithImage.js";

import { Section } from "../components/Section.js";

import { UserInfo } from "../components/UserInfo.js";

import { FormValidator } from "../components/FormValidator.js";

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
} from "../utils/consts.js";

// //функции открытия
// export const openPopup = function (element) {
//   element.classList.add("popup_opened");

//   document.addEventListener("keydown", closePopupByEsc);
// };

// const openProfilePopup = function (element) {
//   formEdit.reset();
//   nameMaybe.value = nameNow.textContent;
//   captionMaybe.value = captionNow.textContent;
//   formValidators["form-edit"].resetValidation();
//   openPopup(element);
// };

const openAddPopup = function (element) {
  formAdd.reset();
  formValidators["form-add"].resetValidation();
  openPopup(element);
};

// //функции закрытия
// const closePopup = function (element) {
//   document.removeEventListener("keydown", closePopupByEsc);

//   element.classList.remove("popup_opened");
// };

// popups.forEach((popup) => {
//   popup.addEventListener("mousedown", (evt) => {
//     if (evt.target.classList.contains("popup_opened")) {
//       closePopup(popup);
//     }
//     if (evt.target.classList.contains("popup__close")) {
//       closePopup(popup);
//     }
//   });
// });

// function closePopupByEsc(evt) {
//   if (evt.key === "Escape") {
//     const popup = document.querySelector(".popup_opened");
//     closePopup(popup);
//   }
// }

/*сохранение профиль*/

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameNow.textContent = nameMaybe.value;
  captionNow.textContent = captionMaybe.value;
  closePopup(popupEdit);
}

// //создание карточки
// function createCard(name, link) {
//   const card = new Card(name, link, "#template", config);
//   const cardElement = card.createItem();
//   return cardElement;
// }

// //добавление новых карточек
// const addPlace = (evt) => {
//   evt.preventDefault();
//   listElements.prepend(createCard(placeNameMaybe.value, linkMaybe.value));
//   closePopup(popupAdd);
// };

// //включение валидации
// const formValidators = {};
// Array.from(document.forms).forEach((formElement) => {
//   formValidators[formElement.name] = new FormValidator(config, formElement);
//   formValidators[formElement.name].enableValidation();
// });

// // SECTION //отрисовка начальных карточек
// items.forEach((item) => {
//   listElements.prepend(createCard(item.name, item.link));
// });

//слушатели
//открытия
popupOpenEditButton.addEventListener("click", () =>
  openProfilePopup(popupEdit)
);
popupOpenAddButton.addEventListener("click", () => openAddPopup(popupAdd));

//сабмита
popupEdit.addEventListener("submit", handleProfileFormSubmit);
popupAdd.addEventListener("submit", addPlace);
