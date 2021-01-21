$("#nav_sidebar").hover(function () {
       $("body").toggleClass("navopen");
});

$(".mobile_toggle").click(function () {
       $("#nav_sidebar").toggleClass("mobile_nav_open");
});