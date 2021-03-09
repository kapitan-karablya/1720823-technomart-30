const cartButtons = document.querySelectorAll(".buy-item");
const cartPopup = document.querySelector(".modal-add-to-cart");
const cartClose = cartPopup.querySelector(".modal-close");


cartButtons.forEach((cartButton) => cartButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    cartPopup.classList.add("modal-show");
}));


cartClose.addEventListener("click", function (evt) {
    evt.preventDefault();
    cartPopup.classList.remove("modal-show");
});


window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
        if (cartPopup.classList.contains("modal-show")) {
            evt.preventDefault();
            cartPopup.classList.remove("modal-show");
        }
    }
});
