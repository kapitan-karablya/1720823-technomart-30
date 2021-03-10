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

const sliderList = document.querySelector(".slider-list");
const sliderItems = document.querySelectorAll(".slide");
const sliderControls = document.querySelectorAll(".slider-button");
const sliderLeft = document.querySelector(".slider-button-left");
const sliderRigth = document.querySelector(".slider-button-rigth");
const sliderListWidth = parseFloat(getComputedStyle(sliderList).width);
const itemWidth = parseFloat(getComputedStyle(sliderItems[0]).width);
let positionCurrentItem = 0;
let transform = 0;
let items = []; 

sliderItems.forEach(function (item, index) {
    items.push({ item: item, position: index, transform: 0 });
});

let position = {
    getItemMin: function () {
        let indexItem = 0;
        items.forEach(function (item, index) {
            if (item.position < items[indexItem].position) {
                indexItem = index;
            }
        });
        return indexItem;
    },
    getItemMax: function () {
        let indexItem = 0;
        items.forEach(function (item, index) {
            if (item.position > items[indexItem].position) {
                indexItem = index;
            }
        });
        return indexItem;
    },
    getMin: function () {
        return items[position.getItemMin()].position;
    },
    getMax: function () {
        return items[position.getItemMax()].position;
    }
};

let transformItem = function (direction) {
    let nextItem;
    if (direction === 'right') {
        positionCurrentItem++;
        if (positionCurrentItem > position.getMax()) {
            nextItem = position.getItemMin();
            items[nextItem].position = position.getMax() + 1;
            items[nextItem].transform += items.length * 100;
            items[nextItem].item.style.transform = 'translateX(' + items[nextItem].transform + '%)';
        }
        transform -= 100;
    }
    if (direction === 'left') {
        positionCurrentItem--;
        if (positionCurrentItem < position.getMin()) {
            nextItem = position.getItemMax();
            items[nextItem].position = position.getMin() - 1;
            items[nextItem].transform -= items.length * 100;
            items[nextItem].item.style.transform = 'translateX(' + items[nextItem].transform + '%)';
        }
        transform += 100;
    }
    sliderList.style.transform = 'translateX(' + transform + '%)';
};

sliderControls.forEach(function (item) {
    item.addEventListener('click', function (evt) {
        if (evt.target.classList.contains('slider-button')) {
            evt.preventDefault();
            var direction = evt.target.classList.contains('slider-button-right') ? 'right' : 'left';
            transformItem(direction);
        }
    })
});

const mapLink = document.querySelector(".map-link");
const mapPopup = document.querySelector(".modal-map");
const mapClose = mapPopup.querySelector(".modal-close");

mapLink.addEventListener("click", function (evt) {
    evt.preventDefault();
    mapPopup.classList.add("modal-show");
});

mapClose.addEventListener("click", function (evt) {
    evt.preventDefault();
    mapPopup.classList.remove("modal-show");
});

window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
        if (mapPopup.classList.contains("modal-show")) {
            evt.preventDefault();
            mapPopup.classList.remove("modal-show");
        }
    }
});

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
