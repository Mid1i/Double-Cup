const header_list = document.querySelector(".main-header__list"); 
const body = document.querySelector("body");

const loader = document.querySelector(".loader");
const loader_icon = document.querySelector(".loader__icon"); 

document.addEventListener("click", (event) => {
    let arg = event.target;
    let id = arg.id;

    // Tracks clicking on the "Menu" button
    if ((arg.classList.contains("main-header__burger")) || (arg.classList.contains("main-header__burger-span"))) {
        document.querySelector(".main-header__burger").classList.toggle("active"); 
        header_list.classList.toggle("active"); 
        body.classList.toggle("no-scroll");  
    }
    
    // Tracks clicking on the "Exit" button
    if (arg.classList.contains("main-content__btn")) {
        localStorage.clear();
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
