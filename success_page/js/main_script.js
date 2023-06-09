const body = document.querySelector("body"); 

const loader = document.querySelector(".loader");
const loader_icon = document.querySelector(".loader__icon"); 

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
