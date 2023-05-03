const header_list = document.querySelector(".main-header__list"); 
const body = document.querySelector("body");

const loader = document.querySelector(".loader");
const loader_icon = document.querySelector(".loader__icon"); 

const username = document.querySelector(".js-name");
const email = document.querySelector(".js-email");
const password = document.querySelector(".js-password");

const name_section = document.querySelector(".js-username-section");
const email_section = document.querySelector(".js-email-section");

let userNameItem = localStorage.getItem("username");
let emailItem = localStorage.getItem("email");

let path = "https://mid1i.github.io/Double-Cup/resourses";

startSettings();

document.addEventListener("click", (event) => {
    let arg = event.target;

    // Tracks clicking on the "Menu" button
    if ((arg.classList.contains("main-header__burger")) || (arg.classList.contains("main-header__burger-span"))) {
        document.querySelector(".main-header__burger").classList.toggle("active"); 
        header_list.classList.toggle("active"); 
        body.classList.toggle("no-scroll");  
    }

    if ((arg.classList.contains("js-save")) && (![username.value.trim(), email.value.trim()].includes(""))) {
        localStorage.setItem("username", username.value.trim());
        localStorage.setItem("email", email.value.trim());
    }

    if (arg.classList.contains("form-block__btn-exit")) {
        localStorage.clear();
    }
});

// Tracks clicking on inputs
document.addEventListener("input", (event) => checkElements(event.target));

// Tracks bluring from inputs
document.addEventListener("focus", (event) => checkElements(event.target));

// Checking valid form inputs
function checkElements(arg) {
    if (arg == username) {
        validName();
    }

    if (arg == email) {
        validEmail();
    }
}

// Tracks bluring "Full Name" input
username.onblur = () => {
    username.classList.remove("wrong-input");
    username.classList.remove("right-input");
}

// Tracks bluring "Email" input
email.onblur = () => {
    email.classList.remove("wrong-input");
    email.classList.remove("right-input");
}

// Checking if users fullname input is valid
function validName() {
    if (username.value != "") {
        if (username.value.length <= 10) {
            username.classList.add("right-input");
            username.classList.remove("wrong-input");
            createIcon(name_section, "js-name-icon");
        } else {
            username.classList.add("wrong-input");
            username.classList.remove("right-input");
            removeIcon(name_section, "js-name-icon");
        }
    } else {
        removeIcon(name_section, "js-name-icon");
        username.classList.remove("wrong-input");
        username.classList.remove("right-input");
    }
}

// Checking if users email input is valid
function validEmail() {
    let checker = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
    
    if (email.value != "") {
        if (checker.test(email.value)) {
            email.classList.add("right-input");
            email.classList.remove("wrong-input");
            createIcon(email_section, "js-email-icon");
        } else {
            email.classList.add("wrong-input");
            email.classList.remove("right-input");
            removeIcon(email_section, "js-email-icon");
        }
    } else {
        removeIcon(email_section, "js-email-icon");
        email.classList.remove("wrong-input");
        email.classList.remove("right-input");
    }
}

// Creating check icon when input is right
function createIcon(section, icon_name) {
    if (!document.querySelector(`.${icon_name}`)) {
        let icon = document.createElement("img");
        
        icon.src = `${path}/img/input-icons/check-icon.svg`;
        icon.classList.add("form-block__icon", `${icon_name}`);

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

function startSettings() {
    username.value = userNameItem;
    email.value = emailItem;

    createIcon(name_section, "js-name-icon");
    createIcon(email_section, "js-email-icon");
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
