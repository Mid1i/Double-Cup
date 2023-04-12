import { cart, cart_block_items, getProduct, createCartItem } from "./createCart.js";

const header_cart_icon = document.getElementById("header-cart-icon");
const cart_icon = document.querySelector(".cart-icon");

const cart_block = document.querySelector(".cart-block");
const cart_amount = document.getElementById("cart-amount");

// The result price in the cart
let result_price = 0;

// Amount of goods in the cart
let amount = 0;

let path = "https://mid1i.github.io/Double-Cup";

document.addEventListener("click", (event) => {
    let arg = event.target;
    let id = arg.id;

    // Tracks clicking on the "Plus" and "Add to the cart" buttons when choosing a product
    if ((arg.classList.contains(`${id}-button`)) || (arg.classList.contains(`${id}-plus`))) {
        plusFunction(id);
    }

    // Tracks clicking on the "Minus" button when choosing a product
    if (arg.classList.contains(`${id}-minus`)) {
        minusFunction(id);
    }

    // Tracks clicking on the "Cart" button
    if ((arg.classList.contains("cart-item")) && (amount != 0)) {
        cart_block.classList.toggle("hide");
    }

    // Tracks clicking on the "Delete" button in the cart
    if (arg.classList.contains(`${id}-delete`)) {
        zeroFunction(id);
    }
    
    // Tracks clicking on the "Go to the Cart" button
    if (id == "cart") {
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

    $(`.${id}-buttons`).removeClass('hide');
    $(`.${id}-button`).addClass('hide');

    $(`.${id}-counter`).html(cart[id]);

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

        $(`.${id}-button`).removeClass('hide');
        $(`.${id}-buttons`).addClass('hide');

        deleteElement(id);

        cart[id] = 0;
    }

    $(`.${id}-counter`).html(cart[id]);

    updatePrice(id);
    updateResultPrice(id, "-");
    amount--;
};

// Deleting the product from the cart
function zeroFunction(id) {
    $(`.${id}-button`).removeClass('hide');
    $(`.${id}-buttons`).addClass('hide');

    $(`.${id}-counter`).html(cart[id]);

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
        cart_icon.style.cssText = "opacity: 1; pointer-events: auto;";
        header_cart_icon.src = `${path}/img/header-icons/cart-full-icon.svg`;
    } else {
        cart_icon.style.cssText = "opacity: 0; pointer-events: none;";
        header_cart_icon.src = `${path}/img/header-icons/cart-icon.svg`;
        cart_block.classList.add("hide");
        amount = 0;
    }
};

// Updating cart sentence
function updateCart() {
    if (amount == 0) {
        cart_amount.innerHTML = "Пусто";
    } else if (amount % 10 == 1 && amount != 11) {
        cart_amount.innerHTML = `${amount} товар`;
    } else if ([2, 3, 4].includes(amount % 10) && !([12, 13, 14].includes(amount))) {
        cart_amount.innerHTML = `${amount} товара`;
    } else {
        cart_amount.innerHTML = `${amount} товаров`;
    }
}

function deleteElement(id) {
    let cart_item = document.querySelector(`.${id}-cart-item`);
    cart_block_items.removeChild(cart_item);
}

// Updating the product price in the cart
function updatePrice(id) {
    let product = getProduct(id);

    $(`.${id}-price`).html(`${cart[id] * product.price}.00 ₽`);
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
