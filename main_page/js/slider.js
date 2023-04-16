// Adding a Sales slider
export function salesSlider() {
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
};

// Adding Products sliders for small screens (phones and some tablets)
export function productSlider() {
    if (window.matchMedia("(max-width: 520px)").matches) {
        $(".product-block").not('.slick-initialized').slick({
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
                        speed: 200,
                        swipe: true,
                    }
                }
            ]
        });
    };  
};
