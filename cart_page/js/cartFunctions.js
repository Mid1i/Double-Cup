import { cart, cart_section, getProduct, gettingWeight, changeCart, createCartItem } from "./createCart.js";

const body = document.querySelector("body");

const goods_amount = document.querySelectorAll(".js-counter");
const order_section = document.querySelector(".order");
const empty_section = document.querySelector(".empty-block");

const cart_alert = document.querySelector(".max-amount-block");

// The result price in the cart
let result_price = Number(localStorage.getItem("result_price"));

let amount = 0;

window.setTimeout(startSettings, 1000);

document.addEventListener("click", (event) => {
    let arg = event.target;
    let id = arg.id;

    // Tracks clicking on the "Plus" and "Add to the cart" buttons when choosing a product
    if (arg.classList.contains(`${id}-plus`)) {
        event.preventDefault();
        plusFunction(id);
    }

    // Tracks clicking on the "Minus" button when choosing a product
    if (arg.classList.contains(`${id}-minus`)) {
        event.preventDefault();
        minusFunction(id);
    }

    // Tracks clicking on the "Delete" button in the cart
    if (arg.classList.contains(`${id}-delete`)) {
        zeroFunction(id);
    }

    // Tracks clicking on the "Return goods" button in the cart
    if (arg.classList.contains("empty-block__return")) {
        returnGoods();
    }

    // Tracks clicking on the "OK" button when its max amount
    if (arg.classList.contains("max-amount-block__btn")) {
        cart_alert.classList.add("hide-element");
        body.classList.remove("lock");
    }

    checkOrder();
    updateCart();
});

// Adding a product to the cart and changing its quantity
function plusFunction(id) {
    let product = getProduct(id);

    if (cart[id] >= 25) {
        cart_alert.classList.remove("hide-element");
        body.classList.add("lock");
    } else {
        cart[id]++;

        $(`.${id}-counter`).html(cart[id]);

        updatePrice(id);
        updateResultPrice(id, "+");

        $(`.${id}-weight`).html(gettingWeight(product, cart[id]));
        amount++;
    } 
    
    localStorage.setItem("cart_update", JSON.stringify(cart));
    localStorage.setItem("result_price_update", result_price);
};

// Changing the quantity of the product
function minusFunction(id) {
    let product = getProduct(id);

    if (cart[id] <= 25) {
        cart_alert.classList.add("hide-element");
        cart[id]--;

        if (cart[id] <= 0) {    
            deleteElement(id);
            cart[id] = 0;
        }

        $(`.${id}-counter`).html(cart[id]);

        updatePrice(id);
        updateResultPrice(id, "-");

        $(`.${id}-weight`).html(gettingWeight(product, cart[id]));
        amount--;

        localStorage.setItem("cart_update", JSON.stringify(cart));
        localStorage.setItem("result_price_update", result_price);
    }
};

// Deleting the product from the cart
function zeroFunction(id) {
    cart_alert.classList.add("hide-element");

    $(`.${id}-counter`).html(cart[id]);

    deleteElement(id);
    updateResultPrice(id, 0);

    amount -= cart[id];
    cart[id] = 0;

    localStorage.setItem("cart_update", JSON.stringify(cart));
    localStorage.setItem("result_price_update", result_price);
}

// Checking amount of goods in the cart
function checkOrder() {
    let check = 0;

    for (let id in cart) {
        if (cart[id] > 0) {
            check += 1;
        }
    }

    if (check == 0) {
        amount = 0;
        cart_section.classList.add("hide");
        order_section.classList.add("hide");
        empty_section.classList.remove("hide");
        document.querySelector(".js-counter").classList.add("hide");
    }
};

// Updating cart sentence
function updateCart() {
    if (amount == 0) {
        goods_amount.forEach((item) => {
            item.innerHTML = "0 товаров";
        });
    } else if (amount % 10 == 1 && amount != 11) {
        goods_amount.forEach((item) => {
            item.innerHTML = `${amount} товар`;
        });
    } else if ([2, 3, 4].includes(amount % 10) && !([12, 13, 14].includes(amount))) {
        goods_amount.forEach((item) => {
            item.innerHTML = `${amount} товара`;
        });
    } else {
        goods_amount.forEach((item) => {
            item.innerHTML = `${amount} товаров`;
        });
    }
};

function deleteElement(id) {
    let cart_item = document.querySelector(`.${id}-item`);
    let cart_sep = document.querySelector(`.${id}-sep`)
    cart_section.removeChild(cart_item);
    cart_section.removeChild(cart_sep);
};

// Updating the product price in the cart
function updatePrice(id) {
    let product = getProduct(id);

    $(`.${id}-price`).html(`${cart[id] * product.price}.00 ₽`);
};

// Updating the result price in the cart 
function updateResultPrice(id, step) {
    let product = getProduct(id);

    switch (step) {
        case "+":
            result_price += Number(product.price);
            break;
        case "-":
            result_price -= Number(product.price);
            break;
        case 0:
            result_price -= Number(product.price) * cart[id];
            break;
        default:
            break;
    }

    $(".order__price").html(`${result_price}.00 ₽`);
};

function startSettings() {

    if (localStorage.getItem("cart_update")) {
        localStorage.removeItem("cart_update");
    }

    for (let item in cart) {
        amount += cart[item];

        if (cart[item]) {
            createCartItem(item);
        }
    }

    $(".order__price").html(`${result_price}.00 ₽`);

    updateCart();
};

function returnGoods() {
    result_price = Number(localStorage.getItem("result_price"));

    changeCart();
    startSettings();

    cart_section.classList.remove("hide");
    order_section.classList.remove("hide");
    empty_section.classList.add("hide");
    document.querySelector(".js-counter").classList.remove("hide");
}
