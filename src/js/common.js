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
                    thisTab.toggle().addClass('rver');
                }

                thisTabActiv.slideUp({
                    duration: 0,
                    complete: function(){
                        thisTab.slideToggle(0).removeClass('rver');
                    }
                });

                // thisTab.slideToggle(fade).siblings().slideToggle(0);
                thisTab.find('.js-menu-hover').children().first().addClass('active').siblings().removeClass('active');
                thisTab.find('.wrapp_content').css("display","none");
                thisTab.find('.wrapp_content').first().css("display","inline-block");



            }
        }, menuDelay);

    });

    $('.js-menu-category .menu_categories li a.menu-no').on('mouseover', function (e) {
        clearTimeout(clearSetTimeout);
        $('.js-menu-category-content-item').fadeOut(0);
        $('.js-menu-category').find('.menu_categories').children().find('a').removeClass('active').removeClass('no-active');
    });

    $('.js-menu-category .menu_categories li a').on( 'mouseleave', function(e){
        clearTimeout(clearSetTimeout);
        globalSetting.menuFirstOpen = false;
    });

    $('.js-menu-category').on( 'mouseleave', function(e){
        clearTimeout(clearSetTimeout);
        // $('body').removeClass('modal-open');
        menuDelay = 200;
        $('.js-menu-category-content-item').fadeOut(0);
        $('.js-menu-category').find('.menu_categories').children().find('a').removeClass('active').removeClass('no-active');

    });
}

function initSetting() {
    globalSetting.menuFirstOpen = false;
    globalSetting.menuOtherDel1 = false;
}
var globalSetting = [];

initSliderHeader();
initScrollOrdering();
initSetting();
initMenu();