function initSliderHeader() {
    var swiper = new Swiper('.swiper-container-header', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 30,
        simulateTouch: false,
        speed: 900,
    });
}

function initScrollOrdering() {
    Revealator.effects_padding = '-350';
}

function initMenu() {
    var clearSetTimeout;
    var menuDelay = 200;
    $('.js-menu-category .menu_categories li a').on('mouseover', function (e) {
        var __self = this;
        var _e = e;
        // $('body').addClass('modal-open');
        clearSetTimeout = setTimeout(function () {
            var fade = 0;
            if (!globalSetting.menuFirstOpen) {
                fade = 200;
                globalSetting.menuFirstOpen = true;
                menuDelay = 0;
            }
            else fade = 200;
            if ($(__self).data('index') == undefined) _e.preventDefault();
            else {
                //находим нужную вкладку
                var thisTab = $('.js-menu-category-content').find("[data-index='" + $(__self).data('index') + "']")
                var thisTabActivIndex = $('.js-menu-category').find('.menu_categories').find('.active').data('index');
                var thisTabActiv = $('.js-menu-category-content').find("[data-index='" + thisTabActivIndex + "']")

                //добавление активного пункта меню
                $('.js-menu-category').find('.menu_categories').children().find('a').removeClass('active').addClass('no-active');
                $(__self).addClass('active').removeClass('no-active');
                //показываем ее и скрываем остальные
                if (thisTabActivIndex == undefined) {
                    thisTab.toggle().addClass('slideRight').css({
                        'left': '16%'
                    });
                }


                $('.js-menu-category-content-item').css({
                    'left': '16%'
                });

                thisTabActiv.slideUp({
                    duration: 0,
                    complete: function () {
                        thisTab.slideToggle(0).removeClass('slideRight');
                    }
                });

                // thisTab.slideToggle(fade).siblings().slideToggle(0);
                thisTab.find('.js-menu-hover').children().first().addClass('active').siblings().removeClass('active');
                thisTab.find('.wrapp_content').css("display", "none");
                thisTab.find('.wrapp_content').first().css("display", "inline-block");

                $('body').addClass('overflow-hidden');
                $('.overlow-bg').css({
                    'opacity': '.5',
                    'pointer-events': 'all'
                });
                initSliderHeader();
            }
        }, menuDelay);

    });

    $('.js-menu-category .menu_categories li a.menu-no').on('mouseover', function (e) {
        var openPopup = $('.openWhiteMenu');
        clearTimeout(clearSetTimeout,100);
        $('.js-menu-category-content-item').css({
            'left': '-150%'
        });
        $('.js-menu-category-content-item').fadeOut(100);
        $('.js-menu-category').find('.menu_categories').children().find('a').removeClass('active').removeClass('no-active');
        if(openPopup.length === 1){

        } else {
            $('body').removeClass('overflow-hidden');
            $('.overlow-bg').css({
                'opacity': '0',
                'pointer-events': 'none'
            });
        }
    });

    $('.js-menu-category .menu_categories li a').on('mouseleave', function (e) {

        clearTimeout(clearSetTimeout);
        globalSetting.menuFirstOpen = false;
    });

    $('.js-menu-category').on('mouseleave', function (e) {
        var openPopup = $('.openWhiteMenu');
        clearTimeout(clearSetTimeout);
        // $('body').removeClass('modal-open');
        menuDelay = 200;
        $('.js-menu-category-content-item').css({
            'left': '-150%'
        });
        $('.js-menu-category-content-item').fadeOut(200);
        $('.js-menu-category').find('.menu_categories').children().find('a').removeClass('active').removeClass('no-active');
        if(openPopup.length === 1){

        } else {
            $('body').removeClass('overflow-hidden');
            $('.overlow-bg').css({
                'opacity': '0',
                'pointer-events': 'none'
            });
        }

    });
}

function initSetting() {
    globalSetting.menuFirstOpen = false;
    globalSetting.menuOtherDel1 = false;
}

var globalSetting = [];


function formResponse(form) {
    var findPopup = form.is('[data-modal]');
    var openPopup = form.data('modal');
    if (form.closest('.wrapper-white-feedback').length) {
        var cont = form.closest('.wrapper-white-feedback'),
            resp = cont.next('.response');
        if (resp.length) {
            cont.fadeOut("slow", function () {
                resp.fadeIn("slow");
            });
        }
    }
    else if(findPopup == true){
        $.fancybox.open({
            src: openPopup,
            type : 'inline'
        });
    }
}

function initValidForm() {
    var form_valid = $(".js-form");
    if (form_valid.length) {
        form_valid.each(function () {
            var form_this = $(this);
            $.validate({
                form: form_this,
                borderColorOnError: true,
                scrollToTopOnError: false,
                modules: 'html5',
                onSuccess: function ($form) {
                    formResponse(form_this);

                    return false;
                }
            });
        });
    }
}

function initTabsForm() {
    $('.block-white-block_btn-tabs .tab-link').click(function () {
        var tab_id = $(this).attr('data-tabs');

        var topActive = $('#tabs-2').hasClass('current-f');

        $('.block-white-block_btn-tabs .tab-link').removeClass('current-f');
        $('.wrapper-white-block-tabs').removeClass('current-f');

        $(this).addClass('current-f');
        $("#" + tab_id).addClass('current-f');

        if(topActive === false){
            $('.wrapper-white-block').find('.block-white-tabs').addClass('top-margin')
        } else {
            $('.wrapper-white-block').find('.block-white-tabs').removeClass('top-margin')
        }
    })
}

function initRegMenu() {
    $('.btn-personal-area').click(function () {
        if ($('.openWhiteMenu').length) {
            $('body').removeClass('overflow-hidden');
            $('.container-white-block').removeClass('openWhiteMenu').css({
                'left': '-300%'
            });
            $('.block-white-tabs').hide(1000);
            $('.overlow-bg').css({
                'opacity': '0',
                'pointer-events': 'none'
            });
            $('.menu_categories').css({
                // 'pointer-events': 'initial'
            });
            $('.wrapper-btn-personal-area').css({
                'pointer-events': 'initial',
                'opacity': '.7'
            });
        } else {
            $('body').addClass('overflow-hidden');
            $('.container-white-block').addClass('openWhiteMenu').css({
                'left': '100%'
            });
            $('.block-white-tabs').show();
            $('.block-white-feedback').hide();
            $('.overlow-bg').css({
                'opacity': '.5',
                'pointer-events': 'all'
            });
            $('.menu_categories').css({
                // 'pointer-events': 'none'
            });
            $('.wrapper-btn-personal-area').css({
                'pointer-events': 'none',
                'opacity': '.7'
            });
        }
        initSliderHeader();
    });
}


function initFormFeedback() {
    $('.js-btn').click(function () {
        if ($('.openWhiteMenu').length) {
            $('body').removeClass('overflow-hidden');
            $('.container-white-block').removeClass('openWhiteMenu').css({
                'left': '-300%'
            });
            $('.overlow-bg').css({
                'opacity': '0',
                'pointer-events': 'none'
            });

            $('.menu_categories').css({
                // 'pointer-events': 'initial'
            });
        } else {
            $('body').addClass('overflow-hidden');
            $('.container-white-block').addClass('openWhiteMenu').css({
                'left': '100%'
            });
            $('.block-white-feedback').show();
            $('.block-white-tabs').hide();
            $('.overlow-bg').css({
                'opacity': '.5',
                'pointer-events': 'all'
            });

            $('.menu_categories').css({
                // 'pointer-events': 'none'
            });
        }
    });
}

function initSearchBtn() {
    $('.btn-search').click(function () {
        if ($('.open-search').length) {
            $('.wrapper-search-block')
                .removeClass('open-search')
                .css({
                    'width': '52px',
                    'padding': '0'
                });
            $('.input-search').css({'background-color': 'transparent'});
            $('.input-search').css({'padding': '0', 'color': 'rgba( 255, 255, 255, 0)'});
        } else {
            $('.wrapper-search-block')
                .addClass('open-search')
                .css({
                    'width': '500px',
                });
            $('.input-search').css({'background-color': 'rgba(94, 94, 94, .5)'});
            $('.input-search').focus().css({'padding': '0 50px', 'color': 'rgba( 255, 255, 255, 1)'});
        }
    });
    $('.input-search').blur(function () {
        $('.wrapper-search-block')
            .removeClass('open-search')
            .css({
                'width': '52px',
                'padding': '0'
            });
        $('.input-search').css({'background-color': 'transparent'});
        $('.input-search').css({'padding': '0', 'color': 'rgba( 255, 255, 255, 0)'});
    })
}

function initSelect() {
    var closeSelect = $(".select2").select2();
    $(".select2").select2();
}

function initBigPopup() {
    $('.js-big-popup').click(function () {
        if ($('.openWhiteMenu').length) {
            $('body').removeClass('overflow-hidden');
            $('.container-text-popup').removeClass('openWhiteMenu').css({
                'left': '-300%'
            });
            $('.overlow-bg').css({
                'opacity': '0',
                'pointer-events': 'none'
            });

            $('.menu_categories').css({
                // 'pointer-events': 'initial'
            });

            $('.wrapper-btn-personal-area').css({
                'pointer-events': 'initial',
                'opacity': '1'
            });
        } else {
            $('body').addClass('overflow-hidden');
            $('.container-recipes').css({
                'display': 'none'
            });
            $('.container-share').css({
                'display': 'flex'
            });
            $('.container-text-popup').addClass('openWhiteMenu').css({
                'left': '16%'
            });
            $('.overlow-bg').css({
                'opacity': '.5',
                'pointer-events': 'all'
            });

            $('.menu_categories').css({
                // 'pointer-events': 'none'
            });
            $('.wrapper-btn-personal-area').css({
                'pointer-events': 'none',
                'opacity': '.7'
            });
        }
    });

    $('.js-big-popup-recipes').click(function () {
        if ($('.openWhiteMenu').length) {
            $('body').removeClass('overflow-hidden');
            $('.container-text-popup').removeClass('openWhiteMenu').css({
                'left': '-300%'
            });
            $('.overlow-bg').css({
                'opacity': '0',
                'pointer-events': 'none'
            });

            $('.menu_categories').css({
                // 'pointer-events': 'initial'
            });

            $('.wrapper-btn-personal-area').css({
                'pointer-events': 'initial',
                'opacity': '1'
            });
        } else {
            $('body').addClass('overflow-hidden');
            $('.container-recipes').css({
                'display': 'flex'
            });
            $('.container-share').css({
                'display': 'none'
            });
            $('.container-text-popup').addClass('openWhiteMenu').css({
                'left': '16%'
            });
            $('.overlow-bg').css({
                'opacity': '.5',
                'pointer-events': 'all'
            });

            $('.menu_categories').css({
                // 'pointer-events': 'none'
            });
            $('.wrapper-btn-personal-area').css({
                'pointer-events': 'none',
                'opacity': '.7'
            });
            initSwiperIngredients();
            initSticky();
            initSwiperRecipes();
        }
    });
}


// Для зартыия попапа
function initClosePopup() {
    $('body').on('click','.js-close', function (e) {
        if($('.openWhiteMenu').length == 1){

            $('body').removeClass('overflow-hidden');
            $('.container-text-popup').removeClass('openWhiteMenu').css({
                'left': '-300%'
            });
            $('.container-white-block').removeClass('openWhiteMenu').css({
                'left': '-300%'
            });
            $('.block-white-tabs').hide(1000);
            $('.overlow-bg').css({
                'opacity': '0',
                'pointer-events': 'none'
            });

            $('.menu_categories').css({
                // 'pointer-events': 'initial'
            });

            $('.wrapper-btn-personal-area').css({
                'pointer-events': 'initial',
                'opacity': '1'
            });


            if(typeof arParams !== undefined){
                window.history.pushState(null, null,  arParams.URI);
            }
        }
        e.stopPropagation();
    })
}

function initSliderHistory() {
    $('.box-slider-company').slick({
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        adaptiveHeight: true,
        speed: 300,
    });

    $('.box-slider-company').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        $('.box-slider-company_nav a').removeClass('active');
        $('.box-slider-company_nav a').eq(nextSlide).addClass('active');
    });

    $('.box-slider-company_nav a').on( "click", function() {
        $('.box-slider-company_nav a').removeClass('active');
        $(this).addClass('active');
        $('.box-slider-company li').eq( $(this).index() ).click();
    });


}

function initSwiperCompany() {
    var swiper = new Swiper('.swiper-slider-content', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 30,
        effect: 'fade',
        simulateTouch: false,
        autoHeight: true,
        fade: {
            crossFade: true
        },
        speed: 500
    });
}

function initAnchor() {

    $("a.link-anchor-menu").click(function() {
        var elementClick = $(this).attr("href");
        var destination = $(elementClick).offset().top - 100;
        jQuery("html:not(:animated),body:not(:animated)").animate({
            scrollTop: destination
        }, 800);
        return false;
    });
}

function initTabs() {
    $('.container-tabs-btn .tabs-link').click(function () {
        var tab_id = $(this).attr('data-tab');

        $('.container-tabs-btn .tabs-link').removeClass('current-t');
        $('.container-content').removeClass('current-t');
        $(this).addClass('current-t');
        $("#"+tab_id).addClass('current-t');
    })
}

function initTabsCompany() {
    var swiperRecipes = $('.tabs-link').data('data-tab-c', 'tab-contact-2');

    $('.row-tabs-company .tabs-link').click(function () {
        var tab_id = $(this).attr('data-tab-c');

        $('.row-tabs-company .tabs-link').removeClass('current-t');
        $('.container-contact').removeClass('current-t');
        $(this).addClass('current-t');
        $("#"+tab_id).addClass('current-t');
    });

    swiperRecipes.click(function () {
        initSwiperRecipes();
    });
}

// function initTabsC() {
//     $('.container-tabs-btn .tabs-link').click(function () {
//         $('.container-tabs-btn .tabs-link').removeClass('current-t');
//         $('.container-content').removeClass('current-t');
//         $(this).addClass('current-t');
//     })
// }

function initSelectMulti() {
    window.test = $('.filter-sel').SumoSelect({
        csvDispCount: 1,
        okCancelInMulti: true,
        isClickAwayOk: false,
        captionFormat : '{0}',
        captionFormatAllSelected: '{0}',
        forceCustomRendering: true,
        locale :  ['Применить', 'Очистить', 'Select All']
    });

    $('.btnCancel').on('click', function(){
        var numberFilter = $(this).closest('.SumoSelect').find('.filter-sel').data("number-filter");
        var thisClear = $(this).closest('.SumoSelect').find('.SelectBox').hasClass('filter-true');
        if(thisClear === true){
            $(this).closest('.SumoSelect').find('.SelectBox').removeClass('filter-true');
            $(this).closest('.SumoSelect').find('.SelectBox > label').removeClass('filter-clear-this');
            $(this).closest('.button-dropdown').find('.filter-clear').removeClass('open-clear')
        }
        $('.filter-sel')[numberFilter].sumo.unSelectAll(i);
        ajaxFilter($(this));
    });

    $('.filter-clear').on('click', function(){
        var numberFilter = $(this).closest('.block-filter').find('.filter-sel').data("number-filter");
        var openClear = $(this).closest('.block-filter').find('.filter-clear').hasClass('open-clear');
        if(openClear === true){
            $(this).closest('.block-filter').find('.filter-clear').removeClass('open-clear');
            $(this).closest('.block-filter').find('.SelectBox').removeClass('filter-true');
            $(this).closest('.block-filter').find('.SelectBox > label').removeClass('filter-clear-this');
        }
        $('.filter-sel')[numberFilter].sumo.unSelectAll(i);

        if($('.open-clear').length < 1){
            $('.button-reset-filter').removeClass('open-reset-filter');
        }
        ajaxFilter($(this));
    });

    $('.button-reset-filter').on('click', function(){
        var num = $('.SumoSelect').length;

        $('.SumoSelect').find('.SelectBox').removeClass('filter-true');
        $('.SumoSelect').find('.SelectBox > label').removeClass('filter-clear-this');
        $('.block-filter').find('.filter-clear').removeClass('open-clear');
        $('.button-reset-filter').removeClass('open-reset-filter');
        for(var i=0; i<num; i++){
            $('.filter-sel')[i].sumo.unSelectAll(i);
        }
        ajaxFilter($(this));
    });

    $('.btnOk').on('click', function () {
        var searchClass = $(this).closest('.SumoSelect').find('.SelectBox > span').hasClass('placeholder');
        var filterTxt = $(this).closest('.SumoSelect').find('.filter-sel').data("filter-txt");
        if (searchClass === true){
            $(this).closest('.button-dropdown').find('.SelectBox').removeClass('filter-true');
            $(this).closest('.button-dropdown').find('.SelectBox > label').removeClass('filter-clear-this');
            $(this).closest('.button-dropdown').find('.filter-clear').removeClass('open-clear')
        } else {
            $(this).closest('.button-dropdown').find('.SelectBox').addClass('filter-true');
            $(this).closest('.button-dropdown').find('.SelectBox > label').addClass('filter-clear-this');
            $(this).closest('.button-dropdown').find('.filter-true > span').attr('data-before',filterTxt);
            $(this).closest('.button-dropdown').find('.filter-clear').addClass('open-clear');
            $('.button-reset-filter').addClass('open-reset-filter');
        }
        ajaxFilter($(this));
    });

    $('.block-filter select').each(function (i, select) {
        if(!select.value.length) return;
        var dataText = $(select).attr('data-filter-txt');
        $(select).closest('.SumoSelect').find('.SelectBox').addClass('filter-true');
        $(select).closest('.SumoSelect').find('.SelectBox > span').attr('data-before',dataText);
        $(select).closest('.button-dropdown').find('.filter-clear').addClass('open-clear');
        $('.button-reset-filter').addClass('open-reset-filter');
    });
}

function initSwiperProduct1() {
    var swiper = new Swiper('.swiper-container-product', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        spaceBetween: 30,
        simulateTouch: false
    });
}

function initSwiperRecipes() {
    var swiper = new Swiper('.box-recipes-slider', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        pagination: '.swiper-pagination',
        paginationType: 'progress',
        simulateTouch: false
    });

    $('.number-sl').text(swiper.slides.length);

    $('.js-number-slider').on( "click", function() {
        $('.number-active').text(swiper.activeIndex + 1);
    });
}

function initProductSelect(){

    $('.btn-click').on('click', function () {
        var searchClass = $(this).closest('.block-product-brand').hasClass('grin');
        if(searchClass === true){
            $(this).closest('.block-product-brand').removeClass('grin');
            $(this).closest('.block-product-brand').addClass('blue');
            $(this).closest('.block-product-brand').find('.block-product-brand > .block-state.grin').removeClass('grin');
            $(this).closest('.block-product-brand').find('.block-product-brand > .block-state.grin').addClass('blue');
        } else{
            $(this).closest('.block-product-brand').removeClass('blue');
            $(this).closest('.block-product-brand').addClass('grin');
            $(this).closest('.block-product-brand').find('.block-product-brand > .block-state.blue').removeClass('blue');
            $(this).closest('.block-product-brand').find('.block-product-brand > .block-state.blue').addClass('grin');
        }
    });

    $('.swiper-pagination_list').on('click', function () {
        var searchClass = $(this).closest('.block-product-brand').hasClass('grin');
        if(searchClass === true){
            $(this).closest('.block-product-brand').removeClass('grin');
            $(this).closest('.block-product-brand').addClass('blue');
            $(this).closest('.block-product-brand').find('.block-product-brand > .block-state.grin').removeClass('grin');
            $(this).closest('.block-product-brand').find('.block-product-brand > .block-state.grin').addClass('blue');
        } else{
            $(this).closest('.block-product-brand').removeClass('blue');
            $(this).closest('.block-product-brand').addClass('grin');
            $(this).closest('.block-product-brand').find('.block-product-brand > .block-state.blue').removeClass('blue');
            $(this).closest('.block-product-brand').find('.block-product-brand > .block-state.blue').addClass('grin');
        }
    });
}

function initNewPass(){
    $('.link-pass-no').on('click', function () {
        $(this).closest('.wrapper-white-block-tabs_form').find('.js-form').removeClass('edit-pass');
        $(this).closest('.js-form').addClass('edit-pass');
    });
}

function initHeightSliderPreview(){
    var height = $('.container-slider-content_txt-title').height();
    $('.block-content_txt').css({
        'padding-top': height + 100,
    });
}

function initTooltip() {
    $('.tooltip-btn[data-toggle=tooltip]').tooltip();
}

function initShare() {
    if($('#my-share').length === 1){
        var share = Ya.share2('my-share', {
            content: {
                url: 'https://yandex.com'
            }
        });
    }
}


Dropzone.autoDiscover = false;

function initDropzoneCompany() {
    $('.wrapper-dropzone').dropzone({
        url: "/",
        uploadMultiple: true,
        addRemoveLinks: true,
        maxFilesize: 10,
        dictFileTooBig: 'Файл слишком большой',
        dictResponseError: 'Сервер ответил с ошибкой',
        dictInvalidFileType: 'Неверный тип файла',
        // previewsContainer: '#preview-template',
        acceptedFiles: ".doc,.docx,.pdf,.txt,image/*",
        init: function () {
            this.on("removedfile", function (file) {
                $.ajax({
                    type: "POST",
                    url: "/",
                    data: "del=" + file['name'] + '&action=FILE',
                    dataType: "html"
                });
            });
            this.on("error", function () {
                $(this).find('.dz-message_waring').addClass('dis-error');
                $(this).find('.dz-message_error').removeClass('dis-error');
            });
            this.on('resetFiles', function () {
                if (this.files.length !== 0) {
                    for (i = 0; i < this.files.length; i++) {
                        this.files[i].previewElement.remove();
                    }
                    this.files.length = 0;
                }
            });
        },
        sending: function (file, xhr, formData) {
            formData.append('action', 'FILE');
        }
    });
}

function clearDropzone() {
    var obj = Dropzone.forElement("div.wrapper-dropzone.dz-started");
    obj.emit("resetFiles");
}

function initSwiperIngredients() {
    var mySwiper = new Swiper('.swiper-container-ingredients', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        pagination: '.swiper-pagination',
        paginationClickable: true,
        simulateTouch: false
    });
}

function initProductionCycle() {
    $('.wrapper-slider-production').slick({
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        adaptiveHeight: true
    });

    $('.wrapper-slider-production').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        var txt = $('.block-cycle_schedule').find('[data-cycle-eq='+nextSlide+']').data('cycle-txt');
        $('.btn-cycle').removeClass('op-100');
        $('.block-cycle_schedule').find('[data-cycle-eq='+nextSlide+']').addClass('op-100');
        $('.block-cycle_schedule-text').text(txt);
    });
}

function initCycleSchedule() {
    $('.btn-cycle').on('click', function () {
        var txt = $(this).data('cycle-txt');
        $('.block-cycle_schedule').find('.btn-cycle').removeClass('op-100');
        $(this).addClass('op-100');
        $('.block-cycle_schedule-text').text(txt);
        $('.wrapper-slider-production li').eq( $(this).data('cycle-eq') ).click();
    });
}

function initLk() {
    $('.btn-change-pass').on('click', function () {
        $(this).closest('.box-input').find('.input-box').css({
            "pointer-events": "auto"
        }).focus();
    })
}

function initNewPassLk() {
    $('.btn-change-pass').on('click', function () {
        $('.new-pass').removeClass('display-none');
        $('.js-save').removeClass('disabled-btn');
        $('.new-pass').find('.input-box').css({
            "pointer-events": "auto"
        })
    });

    $('.js-form').each(function () {
       // var disBtn = $(this).hasClass('disabled-btn');
        var disBtn = $('.disabled-btn').length;
        if (disBtn === 1){
            $('.input-box').focus(function () {
                $('.btn-form').removeClass('disabled-btn');
            })
        }
    })
}

function initAnimation() {
    inView.offset(70);
    inView('.animateThis').on('enter', function (el) {
        $(el).addClass('animated ' + $(el).data('anim'));
        $('.block-product.animated').removeClass('animateThis');
    });
}

function initSticky() {
    $('.sticky-ingredients').Stickyfill();
}

function initColorBody() {
    $(".gray").each(function() {
        var eachBlock = $(this).length;
        if(eachBlock === 1){
            $('body').addClass('gray')
        }
    });
}

initColorBody();

$(window).on('resize', function () {
    initHeightSliderPreview();
});

function fistInitSlider() {
    var blockHeight = $('.swiper-slider-content > .swiper-wrapper');
    var heightH = $('.swiper-slider-content').find('.swiper-slide').height();
    blockHeight.css({
        "height": heightH + 'px'
    })
}


initDropzoneCompany();

document.addEventListener('DOMContentLoaded', function () {
    initSliderHeader();
    // initScrollOrdering();
    initSetting();
    initMenu();
    initValidForm();
    initTabsForm();
    initRegMenu();
    initSearchBtn();
    initFormFeedback();
    initSelect();
    initBigPopup();
    initSliderHistory();
    initSwiperCompany();
    initAnchor();
    initTabs();
// initTabsC();
    initSelectMulti();
    initProductSelect();
    initClosePopup();
    initNewPass();
    initNewPassLk();
    initHeightSliderPreview();
    initTooltip();
    // initShare();
    initProductionCycle();
    initTabsCompany();
    initCycleSchedule();
    initLk();
    initAnimation();
    initSticky();
    fistInitSlider();
});