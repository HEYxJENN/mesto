/*переменные*/
//эти переменные с замечаниями были не нужны, они из старой версии.Сейчас есть другие.
const buttonСlosePopup = document.querySelectorAll(".popup__close");
const nameMaybe = document.querySelector("#entername");
const captionMaybe = document.querySelector("#enterabout");
const nameNow = document.querySelector(".profile__name");
const captionNow = document.querySelector(".profile__caption");
const trashBin = document.querySelector(".element__delete");
const listElements = document.querySelector(".elements");
const itemTemplateContent = document.querySelector("#template").content;

/*открытие + закрытие */
const popupOpenEditButton = document.querySelector(".profile__edit");
const popupOpenAddButton = document.querySelector(".profile__add");
const popupEdit = document.querySelector("#popup__edit");
const popupAdd = document.querySelector("#popup__add");

const openPopup = function (element) {
  nameMaybe.placeholder = nameNow.textContent;
  captionMaybe.placeholder = captionNow.textContent;
  document.addEventListener("keydown", closePopupByEsc);
  element.classList.add("popup_opened");
  element
    .querySelector(".popup__close")
    .addEventListener("click", () => closePopup(element), { once: true });
};

const closePopup = function (element) {
  nameMaybe.value = "";
  captionMaybe.value = "";
  placeNameMaybe.value = "";
  linkMaybe.value = "";
  element.classList.remove("popup_opened");
};

const closePopupArea = function (event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closePopup(event.target);
};

popupOpenEditButton.addEventListener("click", () => openPopup(popupEdit));
popupOpenAddButton.addEventListener("click", () => openPopup(popupAdd));

buttonСlosePopup.forEach((item) => item.addEventListener("click", closePopup));

function closePopupByEsc(evt) {
  console.log(evt.key);
  if (evt.key === "Escape") {
    closePopup;
  }
}

popupAdd.addEventListener("click", closePopupArea);
popupEdit.addEventListener("click", closePopupArea);

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
  const itsaname = nameMaybe.value;
  const itsacaption = captionMaybe.value;
  nameNow.textContent = itsaname;
  captionNow.textContent = itsacaption;
  closePopup(popupEdit);
}

popupEdit.addEventListener("submit", formEditSubmitHandler);

/*лайки*/

function handleLike(event) {
  const itemElement = event.target;
  itemElement.classList.toggle("element__heart_active");
  itemElement.classList.toggle("element__heart");
}

/*удаление*/
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

function handleDelete(event) {
  const itemElement = event.target.closest(".element");
  itemElement.remove();
}

/*добавление*/

const placeNameMaybe = document.querySelector("#enterplacename");
const linkMaybe = document.querySelector("#enterlink");

const addPlace = (evt) => {
  evt.preventDefault();
  renderItem({
    name: placeNameMaybe.value,
    link: linkMaybe.value,
  });
  closePopup(popupAdd);
};

popupAdd.addEventListener("submit", addPlace);

/*картинка zoom*/

const zoomImg = document.querySelector(".popup__zoomimg");
const captionImg = document.querySelector(".popup__zoomimg-caption");
const zoom = document.querySelector("#zoomImg");

function zoomImage(evt) {
  zoomImg.src = evt.target.src;
  zoomImg.alt = evt.target.alt;
  captionImg.textContent = evt.target.alt;
  openPopup(zoom);
}

zoom.addEventListener("click", closePopupArea);
