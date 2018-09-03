$(window).on('load', function(){
    $('.preloader').delay(1000).fadeOut('slow');
    $('.mlp-25__check').on('click', function () {
        $('p.policy').toggleClass('d-none');
        $('.mlp-25__social-body').toggleClass('d-none');
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