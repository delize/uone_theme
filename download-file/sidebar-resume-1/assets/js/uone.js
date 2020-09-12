/*--------------------------------------------------------------
* Template Name    : UONE - Fully Responsive Personal Template
* Author           : Retrina Group
* Version          : 1.0.0
* Created          : November 2019
* File Description : Main css file of the template
--------------------------------------------------------------*/

// repeated variables
var $window = $(window);
var $root = $('html, body');

$(document).ready(function () {

    "use strict";
    colorScheme();
    singlePortfolioCarousel();
    smoothScroll();
    sidebarSmoothScroll();
    sidebarToggler();
    typedJS();
    portfolioPopup();
    testimonialsCarousel();
    wow();

});
$window.on("load", (function() {
    $("#overlayer, .loader").delay(1000).fadeOut('slow');
    portfolioIsotop();
}));

$window.on('scroll', function () {
    headerSticky();
    skills();
    countUp();
    returnToTop();
});

/*-----------------------------------------------------------------------------
                                   FUNCTIONS
-----------------------------------------------------------------------------*/
/*-------------------------
        Color Scheme
-------------------------*/
function colorScheme(){
    var $darkLogo = $('.dark-logo');
    $('.color-scheme').click(function() {
        $("body").toggleClass('uone-dark');
        $('.color-scheme').removeClass('d-none').addClass('d-inline-block');
        $(this).removeClass('d-inline-block').addClass('d-none');
    });
}
/*-------------------------
        SMOOTH SCROLL
-------------------------*/
function smoothScroll(){

    "use strict";

    $('.header .navbar-nav a, .hero-icon a').on('click', function(event) {
        var $anchor = $(this);
        $root.stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 1
        }, 1500, 'easeInOutQuart');
        event.preventDefault();
    });
}

/*-------------------------
        HEADER STICKY
-------------------------*/
function headerSticky(){

    "use strict";

    if ($window.scrollTop() > 100) {
        $('#header').addClass('header-sticky');
    } else {
        $('#header').removeClass('header-sticky');
    }
}

/*-------------------------
   SIDEBAR SMOOTH SCROLL
-------------------------*/
function sidebarSmoothScroll(){

    "use strict";

    $('.sidebar .navbar-nav a, .sidebar .list-group a').on('click', function(event) {
        var $anchor = $(this);
        $root.stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 0
        }, 1500, 'easeInOutQuart');
        event.preventDefault();
    });
}
/*-------------------------
    SIDEBAR TOGGLER
-------------------------*/
function sidebarToggler() {

    "use strict";

    var $sidebarToggler = $('.sidebar-toggler');
    var $sidebar = $('.sidebar');
    var $pageContent = $('.page-content');

    $sidebarToggler.on('click', function(){
        $(this).toggleClass('move lni-chevron-left lni-menu');
        $sidebar.toggleClass('hide');
        $pageContent.toggleClass('full-width');
    });

    if($window.width() < 1199){
        $sidebarToggler.addClass('move lni-menu');
        $sidebarToggler.removeClass('lni-chevron-left');
        $sidebar.addClass('hide');
        $pageContent.addClass('full-width');
        $('.sidebar .navbar-nav a, .sidebar .list-group a').on('click', function(){
            setTimeout(function () {
                $sidebarToggler.toggleClass('move lni-chevron-left lni-menu');
                $sidebar.toggleClass('hide');
                $pageContent.toggleClass('full-width');
            });
        });
    }

}

/*-------------------------
        TYPED JS
-------------------------*/
function typedJS() {

    "use strict";

    var $element = $(".element");
    if($element.length){
        var options = {
            strings: $element.attr('data-elements').split(','),
            typeSpeed: 100,
            backDelay: 3000,
            backSpeed: 50,
            loop: true
        };
        var typed = new Typed(".element", options);
    }
}

/*-------------------------
          SKILLS
-------------------------*/
function skills() {

    "use strict";

    var scroll = $window.scrollTop();
    var skillsDiv = $('#skills');
    if(skillsDiv.length > 0){
        var winH = $window.height(),
            skillsT = skillsDiv.offset().top;
        if (scroll + winH > skillsT) {
            $('.skillbar').each(function () {
                $(this).find('.skillbar-bar').animate({
                    width: $(this).attr('data-percent')
                }, 6000).removeClass('skillbar-bar');
            });
        }
    }
}

/*-------------------------
        COUNT UP
-------------------------*/
function countUp() {

    "use strict";

    var scroll = $window.scrollTop();
    var countId = $('#count-up');
    if (countId.length){
        var winH = $window.height(),
            countOffset = countId.offset().top;
        if (scroll + winH > countOffset) {
            $('.timer').countTo();
            $('.count-number').removeClass('timer');
        }
    }
}

/*-------------------------
     MAGNIFIC POPUP JS
-------------------------*/
function portfolioPopup() {

    "use strict";

    if (('.portfolio-items').length > 0) {
        $('.portfolio-items').each(function() {
            $(this).magnificPopup({
                delegate: '.js-zoom-gallery',
                type: 'image',
                gallery: {
                    enabled:true
                }
            });
        });
    }
}

/*-------------------------
        ISOTOPE JS
-------------------------*/
function portfolioIsotop() {

    "use strict";

    var $container = $('.portfolio-items');
    var $filter = $('#portfolio-filter');
    $container.isotope({
        filter: '*',
        layoutMode: 'masonry',
        animationOptions: {
            duration: 750,
            easing: 'linear'
        }
    });
    $filter.find('a').on("click",function() {
        var selector = $(this).attr('data-filter');
        $filter.find('a').removeClass('active');
        $(this).addClass('active');
        $container.isotope({
            filter: selector,
            animationOptions: {
                animationDuration: 750,
                easing: 'linear',
                queue: false,
            }
        });
        return false;
    });
}

/*-------------------------
     OWL CAROUSEL JS
-------------------------*/
function testimonialsCarousel() {

    "use strict";

    $(".testimonial .owl-carousel").owlCarousel({
        items: 1,
        nav: false,
        autoplay: true,
        loop: true,
        dots: true,
        mouseDrag: true,
        touchDrag: true,
        smartSpeed: 1000,
        autoplayHoverPause: true,
    });
}

/*-------------------------
     AJAX CONTACT FORM
-------------------------*/
function validateEmail(email) {

    "use strict";

    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
function sendEmail() {

    "use strict";

    var name     = $('#name').val();
    var email    = $('#email').val();
    var subject  = $('#subject').val();
    var comments = $('#comments').val();

    if(!name){
        $('#message').toast('show').addClass('bg-danger').removeClass('bg-success');
        $('.toast-body').html('Name is  required');
    } else if(!email){
        $('#message').toast('show').addClass('bg-danger').removeClass('bg-success');
        $('.toast-body').html('Email is  required');
    } else if(!validateEmail(email)){
        $('#message').toast('show').addClass('bg-danger').removeClass('bg-success');
        $('.toast-body').html('Email is not valid');
    } else if(!subject){
        $('#message').toast('show').addClass('bg-danger').removeClass('bg-success');
        $('.toast-body').html('Subject is  required');
    }else if(!comments){
        $('#message').toast('show').addClass('bg-danger').removeClass('bg-success');
        $('.toast-body').html('Comments is  required');
    }else {
        $.ajax({
            type: 'POST',
            data: $("#contactForm").serialize(),
            url:  "sendEmail.php",
            beforeSend: function() {
                $('#submit-btn').html('<span class="spinner-border spinner-border-sm"></span> Loading..');
            },
            success: function(data) {
                $('#submit-btn').html('Submit');
                var myObj = JSON.parse(data);
                if(myObj['status']=='Congratulation'){
                    $('#message').toast('show').addClass('bg-success').removeClass('bg-danger bg-warning');
                    $('.toast-body').html('<strong>'+ myObj['status'] +' : </strong> '+ myObj['message']);
                }else if(myObj['status']=='Error'){
                    $('#message').toast('show').addClass('bg-danger').removeClass('bg-success bg-warning');
                    $('.toast-body').html('<strong>'+ myObj['status'] +' : </strong> '+ myObj['message']);
                }else if(myObj['status']=='Warning'){
                    $('#message').toast('show').addClass('bg-warning').removeClass('bg-success bg-danger');
                    $('.toast-body').html('<strong>'+ myObj['status'] +' : </strong> '+ myObj['message']);
                }
            },
            error: function(xhr) {
                $('#submit-btn').html('Submit');
                $('#message').toast('show').addClass('bg-danger').removeClass('bg-success bg-warning');
                $('.toast-body').html('<strong> Error : </strong> Something went wrong, Please try again.');
            },
        });
    }
}

/* ------------------
      WOW Init
-------------------*/
function wow() {
    new WOW().init();
}

/*--------------------------
       RETURN TO TOP
--------------------------*/
function returnToTop() {
    var $returnToTop = $('.return-to-top');
    if ($window.scrollTop() > 150) {
        $returnToTop.addClass('show');
    } else {
        $returnToTop.removeClass('show');
    }
    $returnToTop.click(function () {
        $root.stop().animate({
            scrollTop: 0
        }, 1500);
    });
}
/*-------------------------------------
   SINGLE PORTFOLIO OWL CAROUSEL JS
-------------------------------------*/
function singlePortfolioCarousel() {

    "use strict";

    $("#related-portfolio .related-portfolio.owl-carousel").owlCarousel({
        nav: true,
        margin: 15,
        autoplay: true,
        loop: true,
        mouseDrag: true,
        touchDrag: true,
        smartSpeed: 1000,
        autoplayHoverPause: true,
        responsive : {
            0 : {
                items: 1
            },
            768 : {
                items: 2
            },
            991 : {
                items: 3
            }
        }
    });

    $("#single-portfolio .owl-carousel").owlCarousel({
        items: 1,
        nav: true,
        autoplay: true,
        loop: true,
        mouseDrag: true,
        touchDrag: true,
        smartSpeed: 1000,
        autoplayHoverPause: true,
    });

}
