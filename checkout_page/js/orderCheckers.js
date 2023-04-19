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

let path = "https://mid1i.github.io/Double-Cup";

document.addEventListener("click", (event) => {
    let arg = event.target;
    
    if (arg == delivery) {
        delivery_input.placeholder = "Укажите адрес доставки";
        delivery_section.classList.add("active_delivery");
        delivery_map.classList.remove("hide");
    }

    if (arg == pickup) {
        delivery_input.placeholder = "";
        delivery_section.classList.remove("active_delivery");
        delivery_map.classList.add("hide");
    }

    if (arg.classList.contains("js-icon-qiwi")) {
        online_pay.checked = true;
    }
})

document.addEventListener("input", (event) => checkElements(event.target));

document.addEventListener("focus", (event) => checkElements(event.target));

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

fullName.onblur = () => {
    name_section.classList.remove("wrong-input");
    name_section.classList.remove("right-input");
}

phone.onblur = () => {
    phone_section.classList.remove("wrong-input");
    phone_section.classList.remove("right-input");
}

email.onblur = () => {
    email_section.classList.remove("wrong-input");
    email_section.classList.remove("right-input");
}

function validName() {
    let checker = /^[а-яА-Я ]+$/;

    if (fullName.value != "") {
        if (checker.test(fullName.value)) {
            name_section.classList.add("right-input");
            name_section.classList.remove("wrong-input");
            createIcon(name_section, "js-name-icon");
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
}

function validPhone() {
    let checker = /^[\d\+][\d\(\)\ -]{8,14}\d$/;

    if (phone.value != "") {
        if (checker.test(phone.value)) {
            phone_section.classList.add("right-input");
            phone_section.classList.remove("wrong-input");
            createIcon(phone_section, "js-phone-icon");
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
} 

function validEmail() {
    let checker = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
    
    if (email.value != "") {
        if (checker.test(email.value)) {
            email_section.classList.add("right-input");
            email_section.classList.remove("wrong-input");
            createIcon(email_section, "js-email-icon");
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
}

function validAddress() {
    let checker = /^/;
}

function createIcon(section, icon_name) {
    if (!document.querySelector(`.${icon_name}`)) {
        let icon = document.createElement("img");
        
        icon.src = `${path}/resourses/img/input-icons/check-icon.svg`;
        icon.classList.add("section__item__check", `${icon_name}`);

        section.appendChild(icon);
    }
}

function removeIcon(section, icon_name) {
    let icon = document.querySelector(`.${icon_name}`);

    if (icon) {
        section.removeChild(icon);
    }
}
