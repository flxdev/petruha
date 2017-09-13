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
    var menuDelay = 200;
    $('.js-menu-category .menu_categories li a').on( 'mouseover', function(e){
        var __self = this;
        var _e = e;
        // $('body').addClass('modal-open');
        clearSetTimeout = setTimeout(function() {
            var fade = 0;
            if (!globalSetting.menuFirstOpen) { fade = 300; globalSetting.menuFirstOpen = true; menuDelay = 0; }
            else fade = 0;
            if ($(__self).data('index') == undefined ) _e.preventDefault();
            else {
                //находим нужную вкладку
                var thisTab = $('.js-menu-category-content').find("[data-index='" + $(__self).data('index') + "']")
                var thisTabActivIndex = $('.js-menu-category').find('.menu_categories').find('.active').data('index');
                var thisTabActiv= $('.js-menu-category-content').find("[data-index='" + thisTabActivIndex + "']")

                //добавление активного пункта меню
                $('.js-menu-category').find('.menu_categories').children().find('a').removeClass('active').addClass('no-active');
                $(__self).addClass('active').removeClass('no-active');
                //показываем ее и скрываем остальные
                if (thisTabActivIndex == undefined) {
                    thisTab.toggle().addClass('slideRight').css({
                        'left':'16%'
                    });
                }

                $('.js-menu-category-content-item').css({
                    'left':'16%'
                });

                thisTabActiv.slideUp({
                    duration: 0,
                    complete: function(){
                        thisTab.slideToggle(0).removeClass('slideRight');
                    }
                });

                // thisTab.slideToggle(fade).siblings().slideToggle(0);
                thisTab.find('.js-menu-hover').children().first().addClass('active').siblings().removeClass('active');
                thisTab.find('.wrapp_content').css("display","none");
                thisTab.find('.wrapp_content').first().css("display","inline-block");

                $('body').addClass('overflow-hidden');
                $('.overlow-bg').css({
                    'opacity':'.5'
                });
            }
        }, menuDelay);

    });

    $('.js-menu-category .menu_categories li a.menu-no').on('mouseover', function (e) {
        clearTimeout(clearSetTimeout);
        $('.js-menu-category-content-item').css({
            'left':'-150%'
        });
        $('.js-menu-category-content-item').fadeOut(1000);
        $('.js-menu-category').find('.menu_categories').children().find('a').removeClass('active').removeClass('no-active');
        $('body').removeClass('overflow-hidden');
        $('.overlow-bg').css({
            'opacity':'0'
        });
    });

    $('.js-menu-category .menu_categories li a').on( 'mouseleave', function(e){
        clearTimeout(clearSetTimeout);
        globalSetting.menuFirstOpen = false;
    });

    $('.js-menu-category').on( 'mouseleave', function(e){
        clearTimeout(clearSetTimeout);
        // $('body').removeClass('modal-open');
        menuDelay = 200;
        $('.js-menu-category-content-item').css({
            'left':'-150%'
        });
        $('.js-menu-category-content-item').fadeOut(1000);
        $('.js-menu-category').find('.menu_categories').children().find('a').removeClass('active').removeClass('no-active');
        $('body').removeClass('overflow-hidden');
        $('.overlow-bg').css({
            'opacity':'0'
        });
    });
}

function initSetting() {
    globalSetting.menuFirstOpen = false;
    globalSetting.menuOtherDel1 = false;
}
var globalSetting = [];


function formResponse(form) {
    if(form.closest('.wrapper-white-feedback').length){
        var cont = form.closest('.wrapper-white-feedback'),
            resp = cont.next('.response');
        if(resp.length){
            cont.fadeOut("slow",function(){
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

function initTabsForm(){
    $('.block-white-block_btn-tabs .tab-link').click(function(){
        var tab_id = $(this).attr('data-tabs');

        $('.block-white-block_btn-tabs .tab-link').removeClass('current-f');
        $('.wrapper-white-block-tabs').removeClass('current-f');

        $(this).addClass('current-f');
        $("#"+tab_id).addClass('current-f');

    })
}

function initRegMenu() {
    $('.btn-personal-area').click(function () {
        if($('.openWhiteMenu').length){
            $('.container-white-block').removeClass('openWhiteMenu').css({
                'left':'-250%'
            });
            $('.block-white-tabs').hide(1000);
            $('.overlow-bg').css({
                'opacity':'0'
            });
        } else {
            $('.container-white-block').addClass('openWhiteMenu').css({
                'left':'100%'
            });
            $('.block-white-tabs').show();
            $('.block-white-feedback').hide();
            $('.overlow-bg').css({
                'opacity':'.5'
            });
        }
    });

    $('.btn-close').click(function () {
        $('.container-white-block').removeClass('openWhiteMenu').css({
            'left':'-250%'
        });
        $('.block-white-tabs').hide(1000);
        $('.overlow-bg').css({
            'opacity':'0'
        });
    });
}



function initFormFeedback() {
    $('.js-btn').click(function () {
        if($('.openWhiteMenu').length){
            $('.container-white-block').removeClass('openWhiteMenu').css({
                'left':'-250%'
            });
            $('.overlow-bg').css({
                'opacity':'0'
            });
        } else {
            $('.container-white-block').addClass('openWhiteMenu').css({
                'left':'100%'
            });
            $('.block-white-feedback').show();
            $('.block-white-tabs').hide();
            $('.overlow-bg').css({
                'opacity':'.5'
            });
        }
    });

    $('.btn-close').click(function () {
        $('.container-white-block').removeClass('openWhiteMenu').css({
            'left':'-250%'
        });
        $('.block-white-tabs').hide(1000);
        $('.overlow-bg').css({
            'opacity':'0'
        });
    });
}

function initSearchBtn() {
    $('.btn-search').click(function () {
        if ($('.open-search').length){
            $('.wrapper-search-block')
                .removeClass('open-search')
                .css({
                    'width':'52px',
                    'padding':'0'
                });
            $('.input-search').css({'padding':'0', 'color':'rgba( 255, 255, 255, 0)'});
        } else {
            $('.wrapper-search-block')
                .addClass('open-search')
                .css({
                    'width':'500px',
                });

            $('.input-search').css({'padding':'0 50px', 'color':'rgba( 255, 255, 255, 1)'});
        }
    })
}

function initSelect() {
    var closeSelect = $(".select2").select2();
    $(".select2").select2();
}

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