const header_list = document.querySelector(".header-list"); 
const body = document.querySelector("body"); 

const login = document.querySelector(".login");
const register = document.querySelector(".register");

const sections = ["fruits", "bread", "sweets", "pasta", "cheese", "milk-products"];

document.addEventListener("click", (event) => {
    let arg = event.target;
    let id = arg.id;

    if (arg.classList.contains("header-menu-burger")) {
        document.querySelector(".header-menu-burger").classList.toggle("active"); 
        header_list.classList.toggle("active"); 
        body.classList.toggle("lock");  
    }
    
    if (sections.includes(id)) {
        $("html, body").animate({
            scrollTop: $(`.${id}_title`).offset().top
        }, 700);
    }
    
    if (id == "login-item") {
        login.classList.add("active_profile");
    }

    if (id == "cross") {
        login.classList.remove("active_profile"); 
        register.classList.remove("active_profile");
    }

    if (id == "register") {
        login.classList.remove("active_profile"); 
        register.classList.add("active_profile");
    }

    if (id == "login") {
        login.classList.add("active_profile"); 
        register.classList.remove("active_profile");
    }
});
