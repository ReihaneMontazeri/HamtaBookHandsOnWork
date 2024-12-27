
document.addEventListener("DOMContentLoaded", function () {
    // Initialize the main swiper (for comments)
    var swiper = new Swiper(".mySwiper", {
        loop: true,
        spaceBetween: 10,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    // Initialize the thumbnail swiper (for user images)
    var swiper2 = new Swiper(".mySwiper2", {
        loop: true,
        spaceBetween: 10,
        thumbs: {
            swiper: swiper,  // Link the main swiper to the thumbnail swiper
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
});
