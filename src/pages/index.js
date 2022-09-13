//импорты
import "./index.css";

import { config } from "../utils/config.js";

// import { items } from "../utils/items.js";

import { Card } from "../components/Card.js";

import { Section } from "../components/Section.js";

import { UserInfo } from "../components/UserInfo.js";

import { FormValidator } from "../components/FormValidator.js";

import { PopupWithForm } from "../components/PopupWithForm.js";

import { Api } from "../components/Api.js";

import {
  nameNow,
  captionNow,
  avatarNow,
  listElements,
  popupOpenEditButton,
  popupOpenAddButton,
  edit,
  add,
  zoomer,
  ava,
  zoomImg,
  captionImg,
  nameMaybe,
  captionMaybe,
  avatarMaybe,
} from "../utils/consts.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { data } from "autoprefixer";

//создания экземпляров классов
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-50",
  headers: {
    authorization: "119ebd6d-a63a-4e8e-b696-7980dd650d23",
    "Content-Type": "application/json",
  },
});

const userInformation = new UserInfo({
  nameInfo: nameNow,
  captionInfo: captionNow,
  avatarInfo: avatarNow,
});

const popupProfileInfo = new PopupWithForm(edit, config, {
  callback: (data) => {
    userInformation.setUserInfo(data);
    api
      .setUser({
        name: data.name,
        about: data.about,
      })
      .then((info) => {
        console.log(info), userInformation.setUserInfo(info);
        popupProfileInfo.closePopup;
      })
      .catch((err) =>
        console.log(`Ошибка при обновлении информации о пользователе: ${err}`)
      );
    // .finally(() => userInfoPopup.renderLoading(false));
  },
});

const cardsContainer = new Section(
  {
    items: data,
    renderer: createCard,
  },
  listElements
);

const popupAddNewPlace = new PopupWithForm(add, config, {
  callback: (data) => {
    api
      .addCard({
        name: data.placename,
        link: data.link,
      })
      .then((info) => {
        console.log(info);
        cardsContainer.addItem({ name: data.placename, link: data.link });
      })
      .catch((err) => console.log(`Ошибка при добавлении карточки: ${err}`));
  },
});

const popupChangeAvatar = new PopupWithForm(ava, config, {
  callback: (data) => {
    // userInformation.setUserInfo(data);
    console.log(data);
    console.log(data.link);

    api
      .setUserAvatar({
        avatar: data.link,
      })
      .then((info) => {
        userInformation.setUserInfo(info);
        popupProfileInfo.closePopup;
      })
      .catch((err) => console.log(`Ошибка при обновлении аватара: ${err}`));
    // .finally(() => userInfoPopup.renderLoading(false));
  },
});

const zoomImage = new PopupWithImage(zoomer, zoomImg, captionImg);

function createCard(name, link) {
  const card = new Card(name, link, "#template", () =>
    zoomImage.open({ name, link })
  );
  const cardElement = card.createItem();
  return cardElement;
}

//валидация

const formValidators = {};
Array.from(document.forms).forEach((formElement) => {
  formValidators[formElement.name] = new FormValidator(config, formElement);
  formValidators[formElement.name].enableValidation();
});

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

function changingAvatar() {
  popupChangeAvatar.openPopup();
  formValidators["form-avatar"].resetValidation();
}

//слушатели
popupOpenEditButton.addEventListener("click", editing);
popupOpenAddButton.addEventListener("click", adding);
avatarNow.addEventListener("click", changingAvatar);

popupProfileInfo.setEventListeners();
popupAddNewPlace.setEventListeners();

//промис
Promise.all([api.getInitialCards(), api.getUser()])
  .then(([itemsApi, userData]) => {
    // userId = userData._id;
    console.log(userData.name);
    console.log(userData.about);
    console.log(userData.avatar);
    console.log(itemsApi);

    userInformation.setUserInfo({
      name: userData.name,
      about: userData.about,
      avatar: userData.avatar,
    });

    const cardsContainer = new Section(
      {
        items: itemsApi,
        renderer: createCard,
      },
      listElements
    );
    cardsContainer.rendererAll();
  })

  .catch((err) => console.log(`Ошибка загрузки данных: ${err}`));
