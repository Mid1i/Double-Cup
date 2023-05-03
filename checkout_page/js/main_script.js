const loader_icon = document.querySelector(".loader__icon"); 
const loader = document.querySelector(".loader");
const body = document.querySelector("body");

const cart_text = document.querySelector(".main-header__text");

let cart, result_price;

let amount = 0;

startSettings();

// Creating special text based on goods amount and price
function startSettings() {
    if ((localStorage.getItem("cart")) || (localStorage.getItem("cart_update"))) {
        if (localStorage.getItem("cart_update")) {
            cart = JSON.parse(localStorage.getItem("cart_update"));
            result_price = localStorage.getItem("result_price_update");
        } else {
            cart = JSON.parse(localStorage.getItem("cart"));
            result_price = localStorage.getItem("result_price");
        }
        
        getAmount();
    
        cart_text.innerHTML = `Оформляем <span>${getCartText()}</span> за <span>${result_price} ₽</span>`;
    }
}

// Getting amount of goods
function getAmount() {
    for (let item in cart) {
        if (cart[item] != 0) {
            amount += cart[item];
        }
    }
}

// Getting "Cart" button text
function getCartText() {
    if (amount % 10 == 1 && amount != 11) {
        return `${amount} товар`;
    } else if ([2, 3, 4].includes(amount % 10) && !([12, 13, 14].includes(amount))) {
        return `${amount} товара`;
    } else {
        return `${amount} товаров`;
    }
}

// Tracks loading of the window for the loading screen display
window.onload = () => {
    setTimeout(() => {
        loader_icon.style.cssText = "opacity: 0;";
        loader.style.cssText = "opacity: 0;";
        body.classList.toggle("no-scroll");
    }, 1000);

    setTimeout(() => {
        loader.style.cssText = "display: none;";
    }, 2000);  
};