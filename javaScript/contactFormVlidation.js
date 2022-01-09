// specific import
import { getElement } from "./utils.js";

// select item
// select errors msg
const form = getElement(".contact-form");
const nameErrMsg = getElement(".name-error-msg");
const emailErrMsg = getElement(".email-error-msg");
const phoneErrMsg = getElement(".phone-error-msg");
const requestErrMsg = getElement(".request-error-msg");
// select input field
const nameInput = getElement("#name");
const emailInput = getElement("#email");
const phoneInput = getElement("#phone");
const requestInput = getElement("textarea");
// select submit btn
const btn = getElement(".contact-btn");

form.addEventListener("submit", function (e) {
  let nameValidation = false;
  let emailValidation = false;
  let phoneValidation = false;
  let requestValidation = false;

  nameErrMsg.classList.add("hide");
  emailErrMsg.classList.add("hide");
  phoneErrMsg.classList.add("hide");
  requestErrMsg.classList.add("hide");
  //   name validtion
  const nameValue = nameInput.value;
  //   verify if the name strat with space
  if (!nameValue.startsWith(" ")) {
    // verify that name include space
    if (nameValue.includes(" ")) {
      // verify that the name includes only one space
      const lName = nameValue.slice(nameValue.indexOf(" "));
      if (!lName.trim().includes(" ")) {
        nameValidation = true;
      } else {
        nameValidation = false;
        nameErrMsg.classList.remove("hide");
      }
    } else {
      nameValidation = false;
      nameErrMsg.classList.remove("hide");
    }
  } else {
    nameValidation = false;
    nameErrMsg.classList.remove("hide");
  }
  // email validation
  const emailValue = emailInput.value;
  if (!emailValue.startsWith(" ")) {
    emailValidation = true;
  } else {
    emailValidation = false;
    emailErrMsg.classList.remove("hide");
  }
  //   phonevalidation
  const phoneValue = phoneInput.value;
  if (!phoneValue.startsWith(" ")) {
    if (!isNaN(parseInt(phoneValue.trim()))) {
      console.log("phone done");
      phoneValidation = true;
    } else {
      phoneValidation = false;
      phoneErrMsg.classList.remove("hide");
    }
  } else {
    phoneValidation = false;
    phoneErrMsg.classList.remove("hide");
  }

  //   request validation
  const requestValue = requestInput.value;
  if (
    requestValue.length > 0 &&
    !requestValue.startsWith(" ") &&
    requestValue.length < 300
  ) {
  } else {
    requestValidation = false;
    requestErrMsg.classList.remove("hide");
  }

  if (
    !nameValidation ||
    !emailValidation ||
    !phoneValidation ||
    !requestValidation
  ) {
    console.log("prevented");
    e.preventDefault();
  }
});
