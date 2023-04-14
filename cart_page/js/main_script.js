import { createLoginButton, createProfileButton } from "./createProfile.js";

const header_list = document.querySelector(".header-list"); 
const body = document.querySelector("body"); 

const login = document.querySelector(".login");
const register = document.querySelector(".register");

const loader = document.querySelector(".loader");
const loader_icon = document.querySelector(".loader__icon"); 

const username = document.querySelector(".name-input");
const email = document.querySelector(".email-input");
const password = document.querySelector(".pass-input");
const checkbox = document.querySelector(".form-checkbox__input");

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
    if (arg.classList.contains("header-menu-burger")) {
        document.querySelector(".header-menu-burger").classList.toggle("active"); 
        header_list.classList.toggle("active"); 
        body.classList.toggle("lock");  
    }
    
    // Tracks clicking on the "Login" button
    if (id == "login-item") {
        login.classList.add("active_profile");
    }

    // Tracks clicking on the "Cross" button when closing the login window
    if (id == "cross") {
        login.classList.remove("active_profile"); 
        register.classList.remove("active_profile");
    }

    // Tracks clicking on the "Dont have an account" button
    if (id == "register") {
        login.classList.remove("active_profile"); 
        register.classList.add("active_profile");
    }

    // Tracks clicking on the "Already have an account" button
    if (id == "login") {
        login.classList.add("active_profile"); 
        register.classList.remove("active_profile");
    }
    
    // Tracks clicking on the "Register" button
    if ((id == "register-button") && (![username.value.trim(), email.value.trim(), password.value.trim()].includes("")) && checkbox.checked) {
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
        loader.style.cssText = "display: none;";
    }, 2000);  
};
