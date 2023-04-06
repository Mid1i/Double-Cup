const header_list = document.getElementsByClassName("header-list")[0];
const body = document.querySelector("body");

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('header-menu-burger')) {
        header_list.classList.toggle("active"); 
        body.classList.toggle("lock");   
    }
});
