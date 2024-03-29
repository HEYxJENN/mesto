//импорты
import "./index.css";

import { config } from "../utils/config.js";

import { Card } from "../components/Card.js";

import { Section } from "../components/Section.js";

import { UserInfo } from "../components/UserInfo.js";

import { FormValidator } from "../components/FormValidator.js";

import { PopupWithForm } from "../components/PopupWithForm.js";

import { PopupWithSubmit } from "../components/PopupWithSubmit.js";

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
  likes,
  submit,
} from "../utils/consts.js";
import { PopupWithImage } from "../components/PopupWithImage.js";

//создания экземпляров классов
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-50",
  headers: {
    authorization: "119ebd6d-a63a-4e8e-b696-7980dd650d23",
    "Content-Type": "application/json",
  },
});

let userID = null;

const userInformation = new UserInfo({
  nameInfo: nameNow,
  captionInfo: captionNow,
  avatarInfo: avatarNow,
});

const popupProfileInfo = new PopupWithForm(edit, config, {
  callback: (data) => {
    userInformation.setUserInfo(data);
    popupProfileInfo.loading(true);
    api
      .setUser({
        name: data.name,
        about: data.about,
      })
      .then((info) => {
        console.log(info), userInformation.setUserInfo(info);
        popupProfileInfo.close;
      })
      .catch((error) =>
        console.log(`Ошибка при обновлении информации о пользователе: ${error}`)
      )
      .finally(() => popupProfileInfo.renderLoading(false));
  },
});

const popupSubmit = new PopupWithSubmit(submit, config, { renderer: () => {} });

const cardsContainer = new Section(
  {
    items: {},
    renderer: createCard,
  },
  listElements
);

const popupAddNewPlace = new PopupWithForm(add, config, {
  callback: (data) => {
    popupAddNewPlace.loading(true);
    api
      .addCard({
        name: data.placename,
        link: data.link,
      })
      .then((info) => {
        console.log(info);
        cardsContainer.addItem(info);
      })
      .catch((error) =>
        console
          .log(`Ошибка при добавлении карточки: ${error}`)
          .finally(popupAddNewPlace.loading(false))
      );
  },
});

const popupChangeAvatar = new PopupWithForm(ava, config, {
  callback: (data) => {
    popupChangeAvatar.loading(true);
    api
      .setUserAvatar({
        avatar: data.linkAv,
      })
      .then((info) => {
        userInformation.setUserInfo(info);
      })
      .catch((error) => console.log(`Ошибка при обновлении аватара: ${error}`))
      .finally(() => popupChangeAvatar.loading(false));
  },
});

const zoomImage = new PopupWithImage(zoomer, zoomImg, captionImg);

function createCard(name, link, datalikes, cardId, ownerId) {
  const card = new Card(
    name,
    link,
    datalikes,
    cardId,
    ownerId,
    userID,
    "#template",
    likes,
    {
      handlePictureClick: () => {
        zoomImage.open({ name, link });
      },

      handleLikeImageClick: () => {
        console.log(card.isLiked()),
          api
            .changeLikeStatus(card.getCardId(), !card.isLiked())
            .then((datalikes) => card.setLike(datalikes))
            .catch((error) =>
              console.log(`Ошибка постановки лайка:   ${error}`)
            );
      },

      handleDeleteClick: () => {
        console.log(card.getCardId());
        popupSubmit.setSubmit(() => {
          api
            .removeCard(card.getCardId())
            .then(() => {
              card.handleDeleteApproved();
            })
            .catch((error) =>
              console.log(`Ошибка удаления карточки:   ${error}`)
            );
          // .finally ()
        });

        popupSubmit.open();
      },
    }
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
function openEditProfileForm() {
  const dataGet = userInformation.getUserInfo();
  nameMaybe.value = dataGet.name;
  captionMaybe.value = dataGet.about;
  formValidators["form-edit"].resetValidation();
  popupProfileInfo.open();
}

function openAddCardForm() {
  popupAddNewPlace.open();
  formValidators["form-add"].resetValidation();
}

function openUpdateAvatarForm() {
  popupChangeAvatar.open();
  formValidators["form-avatar"].resetValidation();
}

//слушатели
popupOpenEditButton.addEventListener("click", openEditProfileForm);
popupOpenAddButton.addEventListener("click", openAddCardForm);
avatarNow.addEventListener("click", openUpdateAvatarForm);

popupProfileInfo.setEventListeners();
popupAddNewPlace.setEventListeners();

//промис
Promise.all([api.getInitialCards(), api.getUser()])
  .then(([itemsApi, userData]) => {
    userID = userData._id;

    userInformation.setUserInfo({
      name: userData.name,
      about: userData.about,
      avatar: userData.avatar,
    });

    cardsContainer.renderItems(itemsApi.reverse());

    console.log(userID);
  })

  .catch((error) => console.log(`Ошибка загрузки данных: ${error}`));
