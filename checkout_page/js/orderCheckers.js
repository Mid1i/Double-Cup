const fullName = document.querySelector(".js-name-input");
const name_section = document.querySelector(".section__item_name");

const phone = document.querySelector(".js-tel-input");
const phone_section = document.querySelector(".section__item_tel");

const email = document.querySelector(".js-email-input");
const email_section = document.querySelector(".section__item_email");

const delivery = document.querySelector(".js-radio-delivery");
const delivery_section = document.querySelector(".section__item_delivery");
const delivery_input = document.querySelector(".section__item__input_delivery");

const pickup = document.querySelector(".js-radio-pickup");

const online_pay = document.querySelector(".js-radio-online");

const delivery_map = document.querySelector(".yandex-map");

let path = "https://mid1i.github.io/Double-Cup/resources";

const promo = document.querySelector(".section__item_input_promo"); 

const comment = document.querySelector(".section__item__input_order");

const error = document.querySelector(".error_name");

const cart_input = document.querySelector("#user_cart");
const token_input = document.querySelector("#jwt_token");

cart_input.value = JSON.parse(localStorage.getItem("cart"));
token_input.value = localStorage.getItem("jwt-token");

document.addEventListener("click", (event) => {
    let arg = event.target;
    
    // Tracks clicking on the "Delivery" radio button
    if (arg == delivery) {
        delivery_input.placeholder = "Укажите адрес доставки";
        delivery_section.classList.add("active_delivery");
        delivery_map.classList.remove("hide");
    }

    // Tracks clicking on the "Pickup" radio button
    if (arg == pickup) {
        delivery_input.placeholder = "";
        delivery_section.classList.remove("active_delivery");
        delivery_map.classList.add("hide");
    }

    // Tracks clicking on the Qiwi icon
    if (arg.classList.contains("js-icon-qiwi")) {
        online_pay.checked = true;
    }
    
    if (arg.classList.contains("form-block__btn")) {
        event.preventDefault();
        if (necessaryData() && deliveryData() && promoData()) {
            let json = {
                "name": fullName.value,
                "phone": phone.value,
                "email": email.value,
                "address": pickup.checked ? "Самовывоз" : delivery_input.value,
                "payment": online_pay.checked ? "online" : "offline",
                "comment": comment.value,
                "promo": promo.value,
                "user-cart": JSON.parse(localStorage.getItem("cart")),
                "jwt-token": localStorage.getItem("jwt-token") 
            }
            console.log(json);
            // localStorage.removeItem("cart");
            // localStorage.removeItem("result_price");
        }
    }
})

function promoData() {
    if (["DOUBLE-CUP-2023", "HAPPY-BIRTHDAY!", "FREE-DOUBLE-2023", ""].includes(promo.value)) {
        return true;
    }
    error.innerHTML = "Промокод неверный";
    return false;
}

function deliveryData() {
    if ((delivery.checked && delivery_input.value != "") || (!delivery.checked && pickup.checked)) {
        return true;
    }

    if (delivery.checked && delivery_input.value == "") {
        error.innerHTML = "Укажите адрес доставки";
    }

    if (!delivery.checked && !pickup.checked) {
        error.innerHTML = "Выберите способ получения заказа";
    }

    return false;
}

function necessaryData() {
    if (validName() && validPhone()) {
        return true;
    }
    error.innerHTML = "Введите корректные данные";
    return false;
}

// Tracks clicking on inputs
document.addEventListener("input", (event) => checkElements(event.target));

// Tracks bluring from inputs
document.addEventListener("focus", (event) => checkElements(event.target));

// Checking valid form inputs
function checkElements(arg) {
    if (arg == fullName) {
        validName();
    }

    if (arg == phone) {
        validPhone();
    }

    if (arg == email) {
        validEmail();
    }
}

// Tracks bluring "Full Name" input
fullName.onblur = () => {
    name_section.classList.remove("wrong-input");
    name_section.classList.remove("right-input");
}

// Tracks bluring "Phone number" input
phone.onblur = () => {
    phone_section.classList.remove("wrong-input");
    phone_section.classList.remove("right-input");
}

// Tracks bluring "Email" input
email.onblur = () => {
    email_section.classList.remove("wrong-input");
    email_section.classList.remove("right-input");
}

// Checking if users fullname input is valid
function validName() {
    let checker = /^[а-яА-Я ]+$/;

    if (fullName.value != "") {
        if (checker.test(fullName.value)) {
            name_section.classList.add("right-input");
            name_section.classList.remove("wrong-input");
            createIcon(name_section, "js-name-icon");
            return true;
        } else {
            name_section.classList.add("wrong-input");
            name_section.classList.remove("right-input");
            removeIcon(name_section, "js-name-icon");
        }
    } else {
        removeIcon(name_section, "js-name-icon");
        name_section.classList.remove("wrong-input");
        name_section.classList.remove("right-input");
    }
    return false;
}

// Checking if users phone input is valid
function validPhone() {
    let checker = /^[\d\+][\d\(\)\ -]{8,14}\d$/;

    if (phone.value != "") {
        if (checker.test(phone.value)) {
            phone_section.classList.add("right-input");
            phone_section.classList.remove("wrong-input");
            createIcon(phone_section, "js-phone-icon");
            return true;
        } else {
            phone_section.classList.add("wrong-input");
            phone_section.classList.remove("right-input");
            removeIcon(phone_section, "js-phone-icon");
        }
    } else {
        removeIcon(phone_section, "js-phone-icon");
        phone_section.classList.remove("wrong-input");
        phone_section.classList.remove("right-input");
    }
    return false;
} 

// Checking if users email input is valid
function validEmail() {
    let checker = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
    
    if (email.value != "") {
        if (checker.test(email.value)) {
            email_section.classList.add("right-input");
            email_section.classList.remove("wrong-input");
            createIcon(email_section, "js-email-icon");
            return true;
        } else {
            email_section.classList.add("wrong-input");
            email_section.classList.remove("right-input");
            removeIcon(email_section, "js-email-icon");
        }
    } else {
        removeIcon(email_section, "js-email-icon");
        email_section.classList.remove("wrong-input");
        email_section.classList.remove("right-input");
    }
    return false;
}

// Creating check icon when input is right
function createIcon(section, icon_name) {
    if (!document.querySelector(`.${icon_name}`)) {
        let icon = document.createElement("img");
        
        icon.src = `${path}/img/input-icons/check-icon.svg`;
        icon.classList.add("section__item__check", `${icon_name}`);

        section.appendChild(icon);
    }
}

// Removing check icon when input is wrong
function removeIcon(section, icon_name) {
    let icon = document.querySelector(`.${icon_name}`);

    if (icon) {
        section.removeChild(icon);
    }
}
