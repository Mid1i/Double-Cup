import { createLoginButton, createProfileButton } from "./createProfile.js";

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

let userNameItem = localStorage.getItem("username");

// Creating the "Login" or "Profile" button
if (userNameItem) {
    createProfileButton(userNameItem);
    localStorage.clear();
} else {
    createLoginButton();
}

document.addEventListener("click", (event) => {
    let arg = event.target;
    let id = arg.id;

    // Tracks clicking on the "Menu" button
    if (arg.classList.contains("main-header__burger")) {
        document.querySelector(".main-header__burger").classList.toggle("active"); 
        header_list.classList.toggle("active"); 
        body.classList.toggle("lock");  
    }
    
    // Tracks clicking on the "Login" button
    if (arg.classList.contains("js-login__btn")) {
        login.classList.add("active_profile");
    }

    // Tracks clicking on the "Cross" button when closing the login window
    if (arg.classList.contains("js-quit")) {
        login.classList.remove("active_profile"); 
        register.classList.remove("active_profile");
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
        localStorage.setItem("password", password.value.trim());
    }
});

// Tracks loading of the window for the loading screen display
window.onload = () => {
    setTimeout(() => {
        loader_icon.style.cssText = "opacity: 0;";
        loader.style.cssText = "opacity: 0;";
        body.classList.toggle("lock");
    }, 1000);

    setTimeout(() => {
        loader.classList.toggle("hide");
    }, 1700);  
};
