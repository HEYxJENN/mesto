const popup = document.querySelector(".popup");
const openPopupButton = document.querySelector(".profile__edit");
const closePopupButton = document.querySelector(".popup__close");
const saveButton = document.querySelector(".popup__save");
const maybename = document.querySelector("#entername");
const maybecaption = document.querySelector("#enterabout");
const namenow = document.querySelector(".profile__name");
const captionnow = document.querySelector(".profile__caption");
const form = document.querySelector(".popup__forms");

const add = document.querySelector(".profile__add");
const popupAdd = document.querySelector("#popup__add");
const popupEdit = document.querySelector("#popup__edit");
const listElements = document.querySelector(".elements")

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



function rednderItems(items) {
  items.forEach((item) => {
    console.log(item);
    listElements.insertAdjacentHtml('beforeend',
    `<li class="element">
    <img class="element__image" src="${item}" alt="Копенгаген.Каналы">
    <div class="element__caption">
      <h2 class="element__name">Дания, Копенгаген</h2>
      <button type="button" class="element__heart">
      </button>
    </div>
  </li> 
  `
    )
    });
} 
rednderItems(items);

/*function rednderItems(initialCards) { 
  initialCards.forEach((card) => {
console.log(card)
listElement.insertAdjacentHtml("beforeend", 
`
<li class="element">
<img class="element__image" src="${initialCards.link}" alt="Грузия. Горы">
<div class="element__caption">
<h2 class="element__name">${initialCards.name}</h2>
<button type="button" class="element__heart">
</button>
</div>
</li>
`)
});
}

rednderItems(card); */


maybename.placeholder = namenow.textContent;
maybecaption.placeholder = captionnow.textContent;

const openpopupEdit = function (element) {
element.classList.add("popup_opened");
};

const openpopupAdd = function () {
  popupAdd.classList.add("popup_opened");
  };
  
const closepopup = function () {
  popup.classList.remove("popup_opened");
};

const closePopupArea = function (event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closepopup(event);
};

function formSubmitHandler(evt) {
  evt.preventDefault();
  const itsaname = maybename.value;
  const itsacaption = maybecaption.value;
  namenow.textContent = itsaname;
  captionnow.textContent = itsacaption;
  closepopup();
}

form.addEventListener("submit", formSubmitHandler);
openPopupButton.addEventListener("click", openpopupEdit(popupEdit));
closePopupButton.addEventListener("click", closepopup);
popup.addEventListener("click", closePopupArea);
add.addEventListener("click", openpopupAdd);
 