$(document).ready(function () {
    $('.slider').slider();

    $("#testButton").on("click", function (e) {
        $.ajax({
            method: "GET",
            url: "/api/db/quiz"
        }).then(function (results) {
            console.log(results)
        }).catch(function (err) {
            console.log(err);
        });
        // location.href = "/profile"
    })

});

autoplay()

function autoplay() {
    $('.carousel').carousel('next');
    setTimeout(autoplay, 4500);

}