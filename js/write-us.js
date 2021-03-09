const writeUsLink = document.querySelector(".write-us-link");
const writeUsPopup = document.querySelector(".modal-write-us");
const writeUsClose = writeUsPopup.querySelector(".modal-close");
const writeUsForm = writeUsPopup.querySelector(".write-us-form");
const writeUsName = writeUsPopup.querySelector(".write-us-input-name");
const writeUsEmail = writeUsPopup.querySelector(".write-us-input-email");
const writeUsText = writeUsPopup.querySelector(".write-us-textarea");

let isStorageSupport = true;
let storageName = "";
let storageEmail = "";

try {
    storageName = localStorage.getItem("Name");
    storageEmail = localStorage.getItem("Email");
} catch (err) {
    isStorageSupport = false;
}

writeUsLink.addEventListener("click", function (evt) {
    evt.preventDefault();
    writeUsPopup.classList.add("modal-show");

    if (storageName) {
        writeUsName.value = storageName;

        if (storageEmail) {
            writeUsEmail.value = storageEmail;
            writeUsText.focus();
        } else {
            writeUsEmail.focus();
        }
    } else {
        writeUsName.focus();
    }

});

writeUsClose.addEventListener("click", function (evt) {
    evt.preventDefault();
    writeUsPopup.classList.remove("modal-show");
    writeUsPopup.classList.remove("modal-error");

});

writeUsForm.addEventListener("submit", function (evt) {
    if (!writeUsName.value || !writeUsEmail.value || !writeUsText.value) {
        evt.preventDefault();

        writeUsPopup.classList.remove("modal-error");
        writeUsPopup.offsetWidth = writeUsPopup.offsetWidth;
        writeUsPopup.classList.add("modal-error");
        
    } else {
        if (isStorageSupport) {
            localStorage.setItem("Name", writeUsName.value);
            localStorage.setItem("Email", writeUsEmail.value);
        }
    }
});

window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      if (writeUsPopup.classList.contains("modal-show")) {
        evt.preventDefault();
        writeUsPopup.classList.remove("modal-show");
        writeUsPopup.classList.remove("modal-error");
      }
    }
  });