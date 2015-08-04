(function ($) {
    window.app = {
        init: function () {
            this.is_ipad = navigator.userAgent.indexOf('iPad') > -1;
            this.is_iphone = navigator.userAgent.indexOf('iPhone') > -1;
            return true;
        },
        spritely: {
            init: function () {
                // spritely methods...
                $('#bird')
                    .sprite({
                        fps: 9,
                        no_of_frames: 3
                    })
                    .isDraggable({
                        start: function () {
                            if (!$.browser.msie) {
                                $('#bird').fadeTo('fast', 0.7);
                            }
                        },
                        stop: function () {
                            if (!$.browser.msie) {
                                $('#bird').fadeTo('slow', 1);
                            }
                        }
                    })
                if (document.location.href.indexOf('/tools') == -1) {
                    $('#bird')
                        .activeOnClick()
                        .active();
                }
                $('#bird2')
                    .sprite({
                        fps: 12,
                        no_of_frames: 3
                    })
                    .isDraggable({
                        start: function () {
                            if (!$.browser.msie) {
                                $('#bird2').fadeTo('fast', 0.7);
                            }
                        },
                        stop: function () {
                            if (!$.browser.msie) {
                                $('#bird2').fadeTo('slow', 1);
                            }
                        }
                    })
                    .activeOnClick();
                $('#clouds').pan({
                    fps: 30,
                    speed: 0.7,
                    dir: 'left',
                    depth: 10
                });
                $('#hill2').pan({
                    fps: 30,
                    speed: 2,
                    dir: 'left',
                    depth: 30
                });
                $('#hill1').pan({
                    fps: 30,
                    speed: 3,
                    dir: 'left',
                    depth: 70
                });
                $('#hill1, #hill2, #clouds').spRelSpeed(8);
                $('html').flyToTap();
                if (!window.app.is_ipad && (window.Touch || document.location.hash.indexOf('iphone') > -1)) {
                    // iPhone/iPad
                    $('body').addClass('platform-iphone');
                    // bird constraint is slightly smaller
                    $('#bird').spRandom({
                        top: -10,
                        left: -10,
                        right: 150,
                        bottom: 100,
                        speed: 3500,
                        pause: 5000
                    });
                    $('#bird2').spRandom({
                        top: 70,
                        left: 100,
                        right: 200,
                        bottom: 340,
                        speed: 4000,
                        pause: 3000
                    });
                    if (document.location.hash.indexOf('iphone') > -1) {
                        $('body').addClass('platform-iphone');
                    }
                } else {
                    // non-iPhone
                    // bird constraint is slightly wider
                    var stage_left = (($('body').width() - 866) / 2);
                    var stage_top = 30;
                    $('#bird').spRandom({
                        top: stage_top - 20,
                        left: stage_left - 20,
                        right: 400,
                        bottom: 140,
                        speed: 3500,
                        pause: 5000
                    });
                    $('#bird2').spRandom({
                        top: stage_top + 70,
                        left: stage_left + 100,
                        right: 200,
                        bottom: 340,
                        speed: 4000,
                        pause: 3000
                    });
                }
                if (window.app.is_ipad) {
                    $('#dragMe, .ui-slider-handle').hide();
                    $('#noFlash').css({
                        'top': '185px',
                        'right': '20px'
                    });
                    $('#sprite_up').css({
                        'top': '300px',
                        'left': '30px'
                    });
                    $('#container, .stage').css({
                        'min-width': '768px'
                    });
                } else {
                    if (window.app.is_iphone || document.location.hash.indexOf('iphone') > -1) {
                        $('#container, .stage').css({
                            'min-width': '300px'
                        });
                    } else {
                        $('#container, .stage').css({
                            'min-width': '900px'
                        });
                    }
                    $('#slider')
                        .show()
                        .slider({
                            value: 8,
                            min: -60,
                            max: 60,
                            slide: function () {
                                window.app.spritely.sliderChange($(this).slider('value'));
                            },
                            change: function () {
                                window.app.spritely.sliderChange($(this).slider('value'));
                            }
                        });
                }
            },
            sliderChange: function (val) {
                if ($('#dragMe').css('display') == 'block') {
                    if (!$.browser.msie) {
                        $('#dragMe').fadeOut('slow');
                    } else {
                        $('#dragMe').hide();
                    }
                }
                var sliderSpeed = val;
                if (sliderSpeed < 0) {
                    var sliderSpeed = String(sliderSpeed).split('-')[1];
                    $('#bird, #bird2').spState(2);
                    $('#hill1, #hill2, #clouds').spChangeDir('right');
                } else {
                    $('#bird, #bird2').spState(1);
                    $('#hill1, #hill2, #clouds').spChangeDir('left');
                }
                $('#hill1, #hill2, #clouds').spRelSpeed(sliderSpeed);
                var birdSpeed = sliderSpeed;
                if (sliderSpeed < 12) {
                    var birdSpeed = 12;
                } else if (sliderSpeed > 24) {
                    var birdSpeed = sliderSpeed / 2;
                }
                $('#bird').fps(birdSpeed - 3);
                $('#bird2').fps(birdSpeed);
            }
        }
    };
    $(document).ready(function () {
        window.app.init();
        window.app.spritely.init();
    });
})(jQuery);