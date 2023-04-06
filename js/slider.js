$(document).ready(() => {
    $('.slider').slick({
        arrows: false,
        autoplay: true,
        autoplaySpeed: 10000,
        dots: false,
        easing: 'linear',
        fade: true,
        slidesToShow: 1,
        speed: 800,
        swipe: false,
        waitForAnimation: true
    });
    ProductSlider();
});

function ProductSlider() {
    if (window.matchMedia("(max-width: 520px)").matches) {
        $(".products").not('.slick-initialized').slick({
            responsive: [
                {
                    breakpoint: 9999,
                    settings: "unslick"
                },
                {
                    breakpoint: 520,
                    settings: {
                        arrows: true,
                        dots: false,
                        easing: 'linear',
                        slidesToShow: 1,
                        speed: 800,
                        swipe: true,
                        waitForAnimation: true
                    }
                }
            ]
        });
    };  
};

window.onresize = () => ProductSlider();