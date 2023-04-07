const header_list = document.getElementsByClassName("header-list")[0];
const body = document.querySelector("body"); 

const sections = ["fruits", "bread", "sweets", "pasta", "cheese", "milk"];

document.addEventListener('click', (event) => {
    let arg = event.target;
    let id = arg.id;

    if (arg.classList.contains('header-menu-burger')) {
        header_list.classList.toggle("active"); 
        body.classList.toggle("lock");   
    }
    
    if (sections.includes(id)) {
        $("html, body").animate({
            scrollTop: $(`.${id}_title`).offset().top
        }, 700);
    }
});
