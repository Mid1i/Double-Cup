document.addEventListener('click', (event) => {
    if (event.target.classList.contains('header-menu-burger')) {
        $(".header-list").toggleClass("active"); 
        $("body").toggleClass("lock");   
    }
});