// global variables

const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lower = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+-=[]{}|;:',.<>?";

const btn = getElement("btn");
const input = getElement("input");
const Copy = getElement("Copy");
let sound = new Audio("./audio/success.mp3");
sound.preload = "auto";

// Utilty Func
function getElement(id) {
  return document.getElementById(id);
}

function GeneratePassword(length = 12) {
  length = parseInt(getElement("length").value) || 12;
  let Passwordchars = `${getElement("uppercase").checked ? upper : ""}${
    getElement("lowercase").checked ? lower : ""
  }${getElement("numbers").checked ? numbers : ""}${
    getElement("symbols").checked ? symbols : ""
  }`;
  if (!Passwordchars) return "";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += Passwordchars[Math.floor(Math.random() * Passwordchars.length)];
  }

  return password;
}

function showAlert(isSuccess = true) {
  let alert = document.querySelector(".alert-container");
  alert.textContent = isSuccess
    ? "Password Generated"
    : "Choose at least one Option";

  if (isSuccess) {
    alert.classList.remove("error");
  } else {
    alert.classList.add("error");
  }
  alert.classList.remove("hide");
  setTimeout(() => {
    alert.classList.add("hide");
  }, 3000);
}

function playSound() {
  sound.currentTime = 0;
  sound.play().catch(() => {});
}

function ChangeCopyText(text) {
  Copy.firstChild.textContent = text;
}

async function copyPasswordToClipboard() {
  if (!input.value) return false;

  try {
    await navigator.clipboard.writeText(input.value);
    return true;
  } catch {
    return false;
  }
}

//#region GeneratePassword

btn.addEventListener("click", () => {
  input.value = GeneratePassword();
  if (!input.value) {
    showAlert(0);
    return;
  }
  showAlert();
  playSound();
});

//#endregion

// Copy Feauture

Copy.addEventListener("click", async () => {
  if (await copyPasswordToClipboard()) {
    ChangeCopyText("Copied");
  } else {
    ChangeCopyText("Empty Field");
  }

  setTimeout(() => {
    ChangeCopyText("Copy");
  }, 1000);
});
