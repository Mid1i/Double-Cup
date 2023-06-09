const section = document.querySelector(".main-header__btns-block");

let path = "https://mid1i.github.io/Double-Cup/resources";

// Creating the "Login" button 
export function createLoginButton() {
    let image = document.createElement("img");
    image.classList.add("js-login__btn")
    image.src = `${path}/img/header-icons/login-icon.svg`;

    let image_wrapper = document.createElement("div");
    image_wrapper.classList.add("btn__icon", "js-login__btn");
    image_wrapper.appendChild(image);

    let text = document.createElement("p");
    text.classList.add("btn__text", "js-login__btn");
    text.innerHTML = "Вход";

    let button = document.createElement("button");
    button.classList.add("login__btn", "btn", "js-login__btn");
    button.append(image_wrapper, text);

    section.prepend(button);
}

// Creating the "Profile" button
export function createProfileButton(UserName) {
    let image = document.createElement("img");
    image.classList.add("js-profile");
    image.src = `${path}/img/header-icons/profile-icon.svg`;

    let image_wrapper = document.createElement("div");
    image_wrapper.classList.add("btn__icon", "js-profile");
    image_wrapper.appendChild(image);

    let text = document.createElement("p");
    text.classList.add("btn__text", "js-profile");
    text.innerHTML = UserName;

    let button = document.createElement("button");
    button.classList.add("login__btn", "btn", "js-profile");
    button.append(image_wrapper, text);

    let link = document.createElement("a");
    link.classList.add("profile__btn");
    link.href = `./profile_page.html?username=${UserName}`;
    link.append(button);

    section.prepend(link);
}
