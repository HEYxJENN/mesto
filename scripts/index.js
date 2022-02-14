const popup = document.querySelector(".popup");
const openPopupButton = document.querySelector(".profile__edit");
const closePopupButton = document.querySelector(".popup__close");
const SaveButton = document.querySelector(".popup__save");
const maybename = document.querySelector(".popup__name");
const maybecaption = document.querySelector(".popup__about");
const namenow = document.querySelector(".profile__name"); 
const captionnow = document.querySelector(".profile__caption");
const form = document.querySelector(".popup__forms");

const openpopup = function () {
  maybename.placeholder = namenow.textContent;
  maybecaption.placeholder = captionnow.textContent;
  popup.classList.add("popup_opened");  
} ;
const closepopup = function () {
  popup.classList.remove("popup_opened");  
} ;

const closePopupArea = function(event) {
  console.log(event.target, event.currentTarget)
  if (event.target !== event.currentTarget) {
    return
  }
  closepopup(event);
  }
  
openPopupButton.addEventListener("click", openpopup);
closePopupButton.addEventListener("click", closepopup);
popup.addEventListener ("click",closePopupArea)

savepopup = function() {
const itsaname = maybename.value;
const itsacaption = maybecaption.value;
console.log (itsaname);
console.log (itsacaption);
namenow.textContent = itsaname;
captionnow.textContent = itsacaption;
console.log (namenow);
console.log (captionnow);
closepopup () ;
console.log (maybename.placeholder)
} ;

SaveButton.addEventListener("click", savepopup);


form.addEventListener('keypress', function(event) {
  if (event.keyCode == 13) {
    savepopup(); }
} );

