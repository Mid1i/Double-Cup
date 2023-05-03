const header_list = document.querySelector(".main-header__list"); 
const body = document.querySelector("body"); 

const login = document.querySelector(".js-login__block");
const register = document.querySelector(".js-register__block");

const loader = document.querySelector(".loader");
const loader_icon = document.querySelector(".loader__icon"); 

const username = document.querySelector(".form__input_name");
const email = document.querySelector(".form__input_email");
const password = document.querySelector(".form__input_pass");
const checkbox = document.querySelector(".form__checkbox_input");

const username_login = document.querySelector(".js-name-login");
const password_login = document.querySelector(".js-password-login");

document.addEventListener("click", (event) => {
    let arg = event.target;
    let id = arg.id;
    
    // Tracks clicking on the "Menu" button
    if ((arg.classList.contains("main-header__burger")) || (arg.classList.contains("main-header__burger-span"))) {
        document.querySelector(".main-header__burger").classList.toggle("active"); 
        header_list.classList.toggle("active"); 
        body.classList.toggle("no-scroll");  
    }
    
    // Tracks clicking on the "Login" button
    if (arg.classList.contains("js-login__btn")) {
        login.classList.add("active_profile");
    }

    // Tracks clicking on the "Dont have an account" button
    if (arg.classList.contains("js-register")) {
        login.classList.remove("active_profile"); 
        register.classList.add("active_profile");
    }

    // Tracks clicking on the "Already have an account" button
    if (arg.classList.contains("js-login")) {
        login.classList.add("active_profile"); 
        register.classList.remove("active_profile");
    }
    
    // Tracks clicking on the "Register" button
    if ((id == "register-btn") && (![username.value.trim(), email.value.trim(), password.value.trim()].includes("")) && checkbox.checked) {
        localStorage.setItem("username", username.value.trim());
        localStorage.setItem("email", email.value.trim());
    }

    // Tracks clicking on the "Login" button
    if ((arg.classList.contains("form__btn_login")) && (![username_login.value.trim(), password_login.value.trim()].includes(""))) {
        localStorage.setItem("username", username_login.value.trim());
    }
});

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
