document.addEventListener('click', (event) => {
    if (event.target.classList.contains('header-menu-burger')) {
        $(".header-list, .header-bottom-list, .bottom-list").toggleClass("active"); 
        $("body").toggleClass("lock");   
    }
});