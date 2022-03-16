/*переменные*/
const popup = document.querySelector(".popup");
const openPopupButton = document.querySelector(".profile__edit");
const closePopupButton = document.querySelector(".popup__close");
const saveButton = document.querySelector(".popup__save");
const maybename = document.querySelector("#entername");
const maybecaption = document.querySelector("#enterabout");
const namenow = document.querySelector(".profile__name");
const captionnow = document.querySelector(".profile__caption");
const form = document.querySelector(".popup__forms");
const trashBin = document.querySelector(".element__delete");
const listElements = document.querySelector(".elements")
const itemTemplateContent=document.querySelector("#template").content;

/*открытие + закрытие */
const openPopupEditButton = document.querySelector(".profile__edit");
const openPopupAddButton = document.querySelector(".profile__add");
const popupEdit = document.querySelector("#popup__edit");
const popupAdd = document.querySelector("#popup__add");

const openpopup = function(element) {
      element.classList.add("popup_opened");
}; 

maybename.placeholder = namenow.textContent;
maybecaption.placeholder = captionnow.textContent;

const closepopup = function () {
  popup.classList.remove("popup_opened");
};


const closePopupArea = function (event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closepopup(event);
};

openPopupEditButton.addEventListener("click", () => openpopup(popupEdit) );
openPopupAddButton.addEventListener("click", () => openpopup(popupAdd));

closePopupButton.addEventListener("click",closepopup);


popup.addEventListener("click", closePopupArea);

/*добавление кода*/
const items = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


function rednderItem(item) {
  console.log(item.name);
    const itemElement= itemTemplateContent.cloneNode(true);
    itemElement.querySelector(".element__name").textContent = item.name;
    itemElement.querySelector(".element__image").src= item.link;
    itemElement.querySelector(".element__image").alt= item.name;
    setEventListeners(itemElement); 
    listElements.appendChild(itemElement);
}

function renderItems(items) {
  items.forEach(rednderItem);
} 
renderItems(items);

/*сохранение*/
function formSubmitHandler(evt) {
  evt.preventDefault();
  const itsaname = maybename.value;
  const itsacaption = maybecaption.value;
  namenow.textContent = itsaname;
  captionnow.textContent = itsacaption;
  closepopup();
}

form.addEventListener("submit", formSubmitHandler);

/*лайки*/

/*удаление*/
function setEventListeners(itemElement) {
  itemElement.querySelector(".element__delete").addEventListener("click", handleDelete)
}

function handleDelete (event) {
  const itemElement = event.target.closest(".element");
  itemElement.remove();
}

setEventListeners(itemElement); 


