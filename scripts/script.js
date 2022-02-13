const popup = document.querySelector(".popup");
const openPopupButton = document.querySelector(".profile__edit");
const closePopupButton = document.querySelector(".popup__close");
/*const closePopupArea = document.querySelector(".page"); */

const openpopup = function () {
  popup.classList.add("popup_opened");  
} ;
const closepopup = function () {
  popup.classList.remove("popup_opened");  
} ;

openPopupButton.addEventListener("click", openpopup);
closePopupButton.addEventListener("click", closepopup);
/* closePopupArea.addEventListener("click", closepopup); */



const SaveButton = document.querySelector(".popup__save");
const profilename = document.querySelector(".profile__name");
const maybename = document.querySelector(".popup__name");
console.log (profilename.TextContent);
console.log (maybename.value);

const savepopup = function () {
 profilename.TextContent = maybename.value ;
 /*alert ("fuck u"); */ closepopup ()
};

SaveButton.addEventListener("click", savepopup);