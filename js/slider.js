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

