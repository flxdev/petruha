function initSliderHeader() {
    var swiper = new Swiper('.swiper-container-header', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 30
    });
}

initSliderHeader();