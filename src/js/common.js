$(window).on('load', function(){
    //----------- validator&mask
    $('input[type="tel"]').mask('+0 (000) 000-00-00');

    jQuery.validator.addMethod("phoneno", function(phone_number, element) {
        return this.optional(element) || phone_number.match(/\+[0-9]{1}\s\([0-9]{3}\)\s[0-9]{3}-[0-9]{2}-[0-9]{2}/);
    }, "Введите Ваш телефон");

    $('.callback-form').validate({
        rules: {
            phone: {
                required: true,
                phoneno: true
            },
            name: 'required',
        },
        messages: {
            name: "Введите Ваше имя",
            phone: "Введите Ваш телефон",
        },
        submitHandler: function(form) {
            var t = $('.callback-form').serialize();
            ajaxSend('.callback-form', t);
        }
    });
    function ajaxSend(formName, data) {
        jQuery.ajax({
            type: "POST",
            url: "sendmail.php",
            data: data,
            success: function() {
                $(".modal").popup("hide");
                $("#thanks").popup("show");
                setTimeout(function() {
                    $(formName).trigger('reset');
                }, 2000);
            }
        });
    }
    //----------------------
    $('.modal-form').popup({
        transition: 'all 0.3s',
        onclose: function() {
            $(this).find('label.error').remove();
        }
    });

    $('.preloader').delay(1000).fadeOut('slow');
    $('.mlp-25__check').on('click', function () {
        $('p.policy').toggleClass('d-none');
        $('.mlp-25__social-body').toggleClass('d-none');
    });

    $('a[href="#"]').click(function(event) {
        event.preventDefault();
    });

    $('.modal').popup({transition: 'all 0.3s'});

    $('.meeting-content__previous-slider').slick({
        centerMode: true,
        centerPadding: '0',
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
        ]
    });

    $('.forecasts__slider').slick({
        arrows: true,

    });
    $('.reviews__slider').slick({
        arrows: true,

    });
    $('.meeting-content__organization-slider').slick({
        asNavFor: '.meeting-content__organization-counter'
    });
    $('.meeting-content__organization-counter').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.meeting-content__organization-slider'
    });
});

$( document ).ready(function() {
  $('.slide__head').click(function() {
    $('.slide__head').removeClass('active');
    $(this).addClass('active');
    $('.slide__toggle').removeClass('.slide__toggle_active');
    $('.slide__toggle').addClass('.slide__toggle_active');
    $(this).next().slideToggle();
    $('.slide__toggle').not($(this).next()).slideUp();
  });

  var map;
    function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 55.7304527, lng: 37.6177843},
        zoom: 16,
        zoomControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_CENTER
        },
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
      });
    }
    initMap();

});
