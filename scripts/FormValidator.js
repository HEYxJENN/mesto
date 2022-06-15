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
    const inputList = Array.from(
      this._formSelector.querySelectorAll(`${this._inputSelector}`)
    );
    const buttonElement = this._formSelector.querySelector(
      this._submitButtonSelector
    );

    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      this.disableSubmitButton(buttonElement);
    } else {
      this._enableSubmitButton(buttonElement);
    }
  };

  _enableSubmitButton = (buttonElement) => {
    buttonElement.classList.remove(this._inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  };

  disableSubmitButton = (buttonElement) => {
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  };
}
