export class FormValidator {
  constructor(valConfig, form) {
    this._formSelector = form;
    this._inputSelector = valConfig.inputSelector;
    this._submitButtonSelector = valConfig.submitButtonSelector;
    this._inactiveButtonClass = valConfig.inactiveButtonClass;
    this._inputErrorClass = valConfig.inputErrorClass;
    this._errorClass = valConfig.errorClass;
    this._field = valConfig.field;
    this._invalidInput = valConfig.invalidInput;
    this._inputList = Array.from(
      this._formSelector.querySelectorAll(`${this._inputSelector}`)
    );
    //я ведь правильно понял, что можно оставлять их в констуркторе в таком виде?!
    this._buttonElement = this._formSelector.querySelector(
      this._submitButtonSelector
    );
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formSelector.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
    const errorElementUnderline = this._formSelector.querySelector(
      `.${inputElement.id}`
    );
    errorElementUnderline.classList.add(this._invalidInput);
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._formSelector.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
    const errorElementUnderline = this._formSelector.querySelector(
      `.${inputElement.id}`
    );
    errorElementUnderline.classList.remove(this._invalidInput);
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  enableValidation = () => {
    this._toggleButtonState();
    this._setEventListeners();
  };

  _setEventListeners = () => {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  };

  _enableSubmitButton = () => {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.removeAttribute("disabled");
  };

  _disableSubmitButton = () => {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute("disabled", true);
  };

  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}
