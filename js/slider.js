$(document).ready(function() {
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
});