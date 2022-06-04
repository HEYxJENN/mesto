const config = {
  formSelector: ".popup__forms",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "popup__forms-input-error_active",
  field: ".popup__forms-fieldset",
};

const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  showConfig
) => {
  const { inputErrorClass, errorClass } = showConfig;
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
  const errorElementUnderline = formElement.querySelector(
    `.${inputElement.id}`
  );
  errorElementUnderline.classList.add("popup__input_invalid");
};

const hideInputError = (formElement, inputElement, hideConfig) => {
  const { inputErrorClass, errorClass } = hideConfig;
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
  const errorElementUnderline = formElement.querySelector(
    `.${inputElement.id}`
  );
  errorElementUnderline.classList.remove("popup__input_invalid");
};

const checkInputValidity = (formElement, inputElement, checkConfig) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      checkConfig
    );
  } else {
    hideInputError(formElement, inputElement, checkConfig);
  }
};

const setEventListenersV = (formElement, listenersConfig) => {
  const { inputSelector, submitButtonSelector } = listenersConfig;
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, listenersConfig);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, listenersConfig);
      toggleButtonState(inputList, buttonElement, listenersConfig);
    });
  });
};

const enableValidation = (validationConfig) => {
  const { formSelector, field } = validationConfig;
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    const fieldList = Array.from(formElement.querySelectorAll(field));
    fieldList.forEach((fieldset) => {
      setEventListenersV(fieldset, validationConfig);
    });
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, buttonConfig) {
  const { inactiveButtonClass } = buttonConfig;
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
}
