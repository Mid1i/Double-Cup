const section = document.querySelector(".header-buttons");

let path = "https://mid1i.github.io/Double-Cup";

export function createLoginButton() {
    let image = document.createElement("img");
    image.id = "login-item";
    image.src = `${path}/img/header-icons/login-icon.svg`;

    let image_wrapper = document.createElement("div");
    image_wrapper.classList.add("button__image");
    image_wrapper.id = "login-item";
    image_wrapper.appendChild(image);

    let text = document.createElement("div");
    text.classList.add("button__text");
    text.id = "login-item";
    text.innerHTML = "Вход";

    let button = document.createElement("button");
    button.classList.add("header-login", "button");
    button.id = "login-item";
    button.append(image_wrapper, text);

    section.prepend(button);
}

export function createProfileButton(UserName) {
    let image = document.createElement("img");
    image.id = "profile-item";
    image.src = `${path}/img/header-icons/profile-icon.svg`;

    let image_wrapper = document.createElement("div");
    image_wrapper.classList.add("button__image");
    image_wrapper.id = "profile-item";
    image_wrapper.appendChild(image);

    let text = document.createElement("div");
    text.classList.add("button__text");
    text.id = "profile-item";
    text.innerHTML = UserName;

    let button = document.createElement("button");
    button.classList.add("header-login", "button");
    button.id = "profile-item";
    button.append(image_wrapper, text);

    section.prepend(button);
}
