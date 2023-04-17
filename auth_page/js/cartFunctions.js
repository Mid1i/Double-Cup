import { cart, cart_block_items, getProduct, createCartItem, startSettings } from "./createCart.js";

const header_cart_icon = document.querySelector(".js-cart-icon");

const cart_block = document.querySelector(".main-header__cart-block");
const cart_text = document.querySelector(".js-cart-text");

// The result price in the cart
let result_price = 0;

// Amount of goods in the cart
let amount = 0;

let path = "https://mid1i.github.io/Double-Cup/resourses";

window.setTimeout(startCartSettings, 1000);

document.addEventListener("click", (event) => {
    let arg = event.target;
    let id = arg.id;

    // Tracks clicking on the "Plus" and "Add to the cart" buttons when choosing a product
    if ((arg.classList.contains(`js-${id}-btn`)) || (arg.classList.contains(`js-${id}-plus`))) {
        plusFunction(id);
    }

    // Tracks clicking on the "Minus" button when choosing a product
    if (arg.classList.contains(`js-${id}-minus`)) {
        minusFunction(id);
    }

    // Tracks clicking on the "Cart" button
    if ((arg.classList.contains("js-cart-btn")) && (amount != 0)) {
        cart_block.classList.toggle("hide");
    }

    // Tracks clicking on the "Delete" button in the cart
    if (arg.classList.contains(`js-${id}-delete`)) {
        zeroFunction(id);
    }
    
    // Tracks clicking on the "Go to the Cart" button
    if (arg.classList.contains("js-icon")) {
        $("html, body").animate({
            scrollTop: 0
        }, 700);
    }

    checkOrder();
    updateCart();
});

// Adding a product to the cart and changing its quantity
function plusFunction(id) {
    cart[id]++;

    $(`.js-${id}-btns`).removeClass('hide');
    $(`.js-${id}-btn`).addClass('hide');

    $(`.js-${id}-counter`).html(cart[id]);

    if (cart[id] == 1) {
        createCartItem(id);
    }

    updatePrice(id);
    updateResultPrice(id, "+");
    amount++;
};

// Changing the quantity of the product
function minusFunction(id) {
    cart[id]--;

    if (cart[id] <= 0) {    

        $(`.js-${id}-btn`).removeClass('hide');
        $(`.js-${id}-btns`).addClass('hide');

        deleteElement(id);

        cart[id] = 0;
    }

    $(`.js-${id}-counter`).html(cart[id]);

    updatePrice(id);
    updateResultPrice(id, "-");
    amount--;
};

// Deleting the product from the cart
function zeroFunction(id) {
    $(`.js-${id}-btn`).removeClass('hide');
    $(`.js-${id}-btns`).addClass('hide');

    $(`.js-${id}-counter`).html(cart[id]);

    deleteElement(id);
    updateResultPrice(id, 0);

    amount -= cart[id];
    cart[id] = 0;
}

// Checking amount of goods in the cart
function checkOrder() {
    let check = 0;

    for (let id in cart) {
        if (cart[id] > 0) {
            check += 1;
        }
    }

    if (check != 0) {
        header_cart_icon.src = `${path}/img/header-icons/cart-full-icon.svg`;
    } else {
        header_cart_icon.src = `${path}/img/header-icons/cart-icon.svg`;
        cart_block.classList.add("hide");
        amount = 0;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("result_price", result_price);
};

// Updating cart sentence
function updateCart() {
    if (amount == 0) {
        cart_text.innerHTML = "Пусто";
    } else if (amount % 10 == 1 && amount != 11) {
        cart_text.innerHTML = `${amount} товар`;
    } else if ([2, 3, 4].includes(amount % 10) && !([12, 13, 14].includes(amount))) {
        cart_text.innerHTML = `${amount} товара`;
    } else {
        cart_text.innerHTML = `${amount} товаров`;
    }
}

function deleteElement(id) {
    let cart_item = document.querySelector(`.${id}-cart-item`);
    cart_block_items.removeChild(cart_item);
}

// Updating the product price in the cart
function updatePrice(id) {
    let product = getProduct(id);

    $(`.js-${id}-price`).html(`${cart[id] * product.price}.00 ₽`);
}

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

    $(".result__price").html(`${result_price}.00 ₽`);
}

function startCartSettings() {
    if ((localStorage.getItem("cart_update")) || (localStorage.getItem("cart"))) {
        if (localStorage.getItem("cart_update")) {
            startSettings("cart_update");
            result_price = Number(localStorage.getItem("result_price_update"));
        } else {
            startSettings("cart");
            result_price = Number(localStorage.getItem("result_price"));
        }
    
        for (let item in cart) {
            amount += cart[item];
        }

        updateCart();
        checkOrder();
        $(".result__price").html(`${result_price}.00 ₽`);
    }
}
