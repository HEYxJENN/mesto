/*переменныеее*/
const buttonClosePopup = document.querySelectorAll(".popup__close");
const nameMaybe = document.querySelector("#entername");
const captionMaybe = document.querySelector("#enterabout");
const nameNow = document.querySelector(".profile__name");
const captionNow = document.querySelector(".profile__caption");
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

enableValidation(config);

//функции открытия
const openPopup = function (element) {
  element.classList.add("popup_opened");

  document.addEventListener("keydown", closePopupByEsc);
};

const openProfilePopup = function (element) {
  element.querySelector(".popup__forms").reset();
  nameMaybe.placeholder = nameNow.textContent;
  captionMaybe.placeholder = captionNow.textContent;
  disableSubmitButton(element.querySelector(".popup__save"), config);
  openPopup(element);
};

const openAddPopup = function (element) {
  element.querySelector(".popup__forms").reset();
  disableSubmitButton(element.querySelector(".popup__save"), config);
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
const items = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

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
//зума

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
