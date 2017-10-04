function initSliderHeader() {
    var swiper = new Swiper('.swiper-container-header', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 30,
        speed: 900,
    });
}

function initScrollOrdering() {
    Revealator.effects_padding = '-350';
}

function initMenu() {
    var clearSetTimeout;
    var menuDelay = 600;
    $('.js-menu-category .menu_categories li a').on('mouseover', function (e) {
        var __self = this;
        var _e = e;
        // $('body').addClass('modal-open');
        clearSetTimeout = setTimeout(function () {
            var fade = 0;
            if (!globalSetting.menuFirstOpen) {
                fade = 800;
                globalSetting.menuFirstOpen = true;
                menuDelay = 0;
            }
            else fade = 800;
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
                    'opacity': '.5'
                });
            }
        }, menuDelay);

    });

    $('.js-menu-category .menu_categories li a.menu-no').on('mouseover', function (e) {
        clearTimeout(clearSetTimeout);
        $('.js-menu-category-content-item').css({
            'left': '-150%'
        });
        $('.js-menu-category-content-item').fadeOut(1000);
        $('.js-menu-category').find('.menu_categories').children().find('a').removeClass('active').removeClass('no-active');
        $('body').removeClass('overflow-hidden');
        $('.overlow-bg').css({
            'opacity': '0'
        });
    });

    $('.js-menu-category .menu_categories li a').on('mouseleave', function (e) {
        clearTimeout(clearSetTimeout);
        globalSetting.menuFirstOpen = false;
    });

    $('.js-menu-category').on('mouseleave', function (e) {
        clearTimeout(clearSetTimeout);
        // $('body').removeClass('modal-open');
        menuDelay = 600;
        $('.js-menu-category-content-item').css({
            'left': '-150%'
        });
        $('.js-menu-category-content-item').fadeOut(1000);
        $('.js-menu-category').find('.menu_categories').children().find('a').removeClass('active').removeClass('no-active');
        $('body').removeClass('overflow-hidden');
        $('.overlow-bg').css({
            'opacity': '0'
        });
    });
}

function initSetting() {
    globalSetting.menuFirstOpen = false;
    globalSetting.menuOtherDel1 = false;
}

var globalSetting = [];


function formResponse(form) {
    if (form.closest('.wrapper-white-feedback').length) {
        var cont = form.closest('.wrapper-white-feedback'),
            resp = cont.next('.response');
        if (resp.length) {
            cont.fadeOut("slow", function () {
                resp.fadeIn("slow");
            });
        }
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

        $('.block-white-block_btn-tabs .tab-link').removeClass('current-f');
        $('.wrapper-white-block-tabs').removeClass('current-f');

        $(this).addClass('current-f');
        $("#" + tab_id).addClass('current-f');

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
                'opacity': '0'
            });
            $('.menu_categories').css({
                'pointer-events': 'initial'
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
                'opacity': '.5'
            });
            $('.menu_categories').css({
                'pointer-events': 'none'
            });
            $('.wrapper-btn-personal-area').css({
                'pointer-events': 'none',
                'opacity': '.7'
            });
        }
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
                'opacity': '0'
            });

            $('.menu_categories').css({
                'pointer-events': 'initial'
            });
        } else {
            $('body').addClass('overflow-hidden');
            $('.container-white-block').addClass('openWhiteMenu').css({
                'left': '100%'
            });
            $('.block-white-feedback').show();
            $('.block-white-tabs').hide();
            $('.overlow-bg').css({
                'opacity': '.5'
            });

            $('.menu_categories').css({
                'pointer-events': 'none'
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
            $('.input-search').css({'padding': '0', 'color': 'rgba( 255, 255, 255, 0)'});
        } else {
            $('.wrapper-search-block')
                .addClass('open-search')
                .css({
                    'width': '500px',
                });

            $('.input-search').css({'padding': '0 50px', 'color': 'rgba( 255, 255, 255, 1)'});
        }
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
                'opacity': '0'
            });

            $('.menu_categories').css({
                'pointer-events': 'initial'
            });

            $('.wrapper-btn-personal-area').css({
                'pointer-events': 'initial',
                'opacity': '1'
            });
        } else {
            $('body').addClass('overflow-hidden');
            $('.container-text-popup').addClass('openWhiteMenu').css({
                'left': '16%'
            });
            $('.overlow-bg').css({
                'opacity': '.5'
            });

            $('.menu_categories').css({
                'pointer-events': 'none'
            });
            $('.wrapper-btn-personal-area').css({
                'pointer-events': 'none',
                'opacity': '.7'
            });
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
                'opacity': '0'
            });

            $('.menu_categories').css({
                'pointer-events': 'initial'
            });

            $('.wrapper-btn-personal-area').css({
                'pointer-events': 'initial',
                'opacity': '1'
            });
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
    });

    $('.box-slider-company').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        console.log(nextSlide);
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
        spaceBetween: 30
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
        okCancelInMulti:true,
        isClickAwayOk: false,
        captionFormat :  '{0}' ,
        locale :  ['Применить', 'Очистить', 'Select All']
    });

    $('.btnCancel').on('click', function(){
        var num = $('option').length;
        var numberFilter = $(this).closest('.SumoSelect').find('.filter-sel').data("number-filter");
        var thisClear = $(this).closest('.SumoSelect').find('.SelectBox').hasClass('filter-true');
        if(thisClear === true){
            $(this).closest('.SumoSelect').find('.SelectBox').removeClass('filter-true');
            $(this).closest('.SumoSelect').find('.SelectBox > label').removeClass('filter-clear-this');
        }
        for(var i=0; i<num; i++){
            $('.filter-sel')[numberFilter].sumo.unSelectItem(i);
        }
    });

    $('.button-reset-filter').on('click', function(){
        var num = $('option').length;

            $('.SumoSelect').find('.SelectBox').removeClass('filter-true');
            $('.SumoSelect').find('.SelectBox > label').removeClass('filter-clear-this');

        for(var i=0; i<num; i++){
            $('.filter-sel')[0].sumo.unSelectItem(i);
            $('.filter-sel')[1].sumo.unSelectItem(i);
        }

    });

    $('.filter-clear-this').on('click', function(){
        var num = $('option').length;
        if($('.filter-true').length === 1){
            $('.SumoSelect').find('.SelectBox').removeClass('filter-true');
            $('.SumoSelect').find('.SelectBox > label').removeClass('filter-clear-this');
        }
        for(var i=0; i<num; i++){
            $('.filter-sel')[0].sumo.unSelectItem(i);
            $('.filter-sel')[1].sumo.unSelectItem(i);
        }
    });

    $('.btnOk').on('click', function () {
        var searchClass = $(this).closest('.SumoSelect').find('.SelectBox > span').hasClass('placeholder');
        var filterTxt = $(this).closest('.SumoSelect').find('.filter-sel').data("filter-txt");
        if (searchClass === true){
            $(this).closest('.button-dropdown').find('.SelectBox').removeClass('filter-true');
            $(this).closest('.button-dropdown').find('.SelectBox > label').removeClass('filter-clear-this');
        } else {
            $(this).closest('.button-dropdown').find('.SelectBox').addClass('filter-true');
            $(this).closest('.button-dropdown').find('.SelectBox > label').addClass('filter-clear-this');
            $(this).closest('.button-dropdown').find('.filter-true > span').attr('data-before',filterTxt)
        }
    })
}

function initSwiperProduct1() {
    var swiper = new Swiper('.swiper-container-product', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        spaceBetween: 30,
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

document.addEventListener('DOMContentLoaded', function () {
    initSliderHeader();
    initScrollOrdering();
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
});