$(document).ready(function () {
    $('.slider').slider();
});

autoplay()

function autoplay() {
    $('.carousel').carousel('next');
    setTimeout(autoplay, 4500);
}