(function($) {

    if ($(window).width() > 1280) {
        // Init ScrollMagic
        var ctrl = new ScrollMagic.Controller({
            /*globalSceneOptions: {
             triggerHook: 'onLeave'
             }*/
        });
        //scrollmagic section listing
        $("section").each(function() {
            var name = $(this).attr('id');
            new ScrollMagic.Scene({
                triggerElement: this,
                triggerHook: 'onLeave'
            })
                .setPin(this)
                //.addIndicators()
                .addTo(ctrl);
        });

        var monitorparallax = new ScrollMagic.Scene({
            triggerElement: '.section_5_services_container',
            duration: 600,
            triggerHook: 'onEnter'
        })
            .setTween('#section_5 .monitor_parallax img', {right: '0px'})
            .addTo(ctrl);

        /*var section_one_title = new ScrollMagic.Scene({
         triggerElement: '#section_1',
         duration: 250
         })
         .setTween('#section_1 .container .title', {top: '-100px'})
         .addTo(ctrl);*/
    };

    //mobile menu
    $(document).on('click', '.mob_menu_btn', function (e) {
        e.preventDefault();
        if ($('.mainmenu_container').is(':visible')) {
            $('.mainmenu_container').slideUp(500);
        } else {
            $('.mainmenu_container').slideDown(500);
        };
    });

    //pagination
    $(document).on('click', '.pagination a', function(e){
        e.preventDefault();
        /*$(this).closest('ul').find('li').removeClass('active');
        $(this).parent('li').addClass('active');*/
        var numberForScroll = $(this).parent('li').index() + 1;
        var scrollSize = 0;
        for (var i = 1; i < numberForScroll; i++) {
            scrollSize += $('#section_' + i).outerHeight();
            console.log(scrollSize);
        }
        $('html, body').animate({
            scrollTop: scrollSize + 'px'
        }, 1000);
    });

    /* pagination change on scroll */
    var scrollPosStart = [];
    var scrollPosEnd = [];
    var scrollPosBlocks = ['#section_1', '#section_2', '#section_3', '#section_4', '#section_5'];
    function scrollPosCalc() {
        for (var i = 0; i < scrollPosBlocks.length; i++) {
            scrollPosStart[i] = $(scrollPosBlocks[i]).offset().top;
            scrollPosEnd[i] = $(scrollPosBlocks[i]).offset().top + ($(scrollPosBlocks[i]).height() * 0.75);
        };
    };
    scrollPosCalc();
    $(window).resize(function () {
        scrollPosCalc();
    });
    function paginationSelect() {
        var windowMark = window.pageYOffset + ($(window).height() / 2);
        for (var i = 0; i < scrollPosBlocks.length; i++) {
            if (windowMark > scrollPosStart[i] && windowMark < scrollPosEnd[i]) {
                $('.pagination li.active').removeClass('active');
                $('.pagination li').eq(i).addClass('active');
            };
        };
    };
    $(window).scroll(paginationSelect);

    //to top
    $(document).on('click', '.to_top', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: '0px'
        }, 1000);
    });


    //section 3 slider
    $(document).on('click', '.section_slider_controls', function (e) {
        e.preventDefault();
        $('#section_3 .section_slider_controls').removeClass('active');
        $(this).addClass('active');
        if ($(this).hasClass('controls_left')) {
            $('.slider_container').animate({'left': '-100%'}, 250);
            $('#section_3 .bg_container').animate({'opacity': '1'}, 250);
        } else {
            $('.slider_container').animate({'left': '0%'}, 250);
            $('#section_3 .bg_container').animate({'opacity': '0'}, 250);
        };
    })

    //section 3 selectable text
    $('.section_3_body').on('click', '.section_3_body_controls a', function (e) {
        e.preventDefault();
        if ($(window).width() > 768 && $(this).hasClass('active')) {
            return false;
        } else if ($(window).width() <= 768 && $(this).hasClass('mob_active')) {
            return false;
        } else if ($(window).width() > 768) {
            var textId = $(this).attr('class');
            $('#section_3 .mob_active').removeClass('mob_active');
            $(this).closest('.section_3_body').find('.section_3_body_controls a.active').removeClass('active');
            $(this).addClass('active');
            $(this).closest('.section_3_body').find('ul.active').animate({
                'opacity': '0',
                '-moz-transform': 'translateY(100%)',
                '-webkit-transform': 'translateY(100%)',
                '-o-transform': 'translateY(100%)',
                '-ms-transform': 'translateY(100%)',
                'transform': 'translateY(100%)'
            }, 100).removeClass('active');
            $(this).closest('.section_3_body').find('.section_3_body_text ul#' + textId).css('opacity', '1').animate({
                '-moz-transform': 'translateY(0%)',
                '-webkit-transform': 'translateY(0%)',
                '-o-transform': 'translateY(0%)',
                '-ms-transform': 'translateY(0%)',
                'transform': 'translateY(0%)'
            }, 100).addClass('active');
            console.log(textId);
        } else if ($(window).width() <= 768) {
            $('#section_3').find('.section_3_body_controls a.active, .section_3_body_text ul.active').removeClass('active');
            var textId = $(this).attr('class');
            $(this).siblings('.mob_active').removeClass('mob_active');
            $(this).addClass('mob_active');
            $(this).closest('.section_3_body').find('.section_3_body_text ul#' + textId).prev('ul.mob_active').removeClass('mob_active');
            $(this).closest('.section_3_body').find('.section_3_body_text ul#' + textId).next('ul.mob_active').removeClass('mob_active');
            $(this).closest('.section_3_body').find('.section_3_body_text ul#' + textId).addClass('mob_active');
        };
    });

})(jQuery);