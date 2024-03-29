window.onerror = function() {
    var $html = document.getElementsByTagName('html')[0];
    if ($html && $html.classList) {
        $html.classList.add('video-ready');
    }
};

/*
    Create a new YUI instance and load the node
    and event modules.

    HELPFUL LINKS
    =============

    http://yuilibrary.com/yui/docs/api/
    http://www.jsrosettastone.com/
*/

YUI().use('node', 'event', 'cookie', 'squarespace-util', function (Y) {
    Y.on('domready', function () {

        /*
            This function loads and refreshes images
            using Squarespace's responsive ImageLoader.
        */

        function loadImages () {
            Y.all('img[data-src]' ).each(function(img) {
                ImageLoader.load(img);
            });
        }

        /*
            ImageLoader will refresh images on windowresize
            and any change in the Style Editor.
        */

        Y.one(window).on('resize', loadImages, this);
        Y.Global && Y.Global.on('tweak:change', loadImages, this);        



        /*
            Author's custom code goes here.
            =============================== */

        var $window = Y.one('window');

        var $html = Y.one('html');
        var $body = Y.one('body');

        var $menuOpen = Y.one('.site-menu__open');
        var $menuClose = Y.one('.site-menu__close');
        var $menuUnderlay = Y.one('.site-menu__underlay');

        var openMenu = function() {
            $html.addClass('prepare-menu');
            setTimeout(function() {
                $html.addClass('show-menu');
            }, 5);
        };

        var closeMenu = function() {
            $html.removeClass('show-menu');
            setTimeout(function() {
                $html.removeClass('prepare-menu');
            }, 366);
        };

        $menuOpen.on('click', openMenu); 
        $menuClose.on('click', closeMenu);
        $menuUnderlay.on('click', closeMenu); 

        if ($body.hasClass('homepage') || $body.hasClass('collection-type-home2')) {
            var $intro = Y.one('.intro');
            var $video = Y.all('.intro__video');
            var $header = Y.one('.header');

            var introHeight  = $intro.height();
            var headerHeight = $header.height();

            function sizeVideo() {
                var w = document.body.clientWidth; // window.innerWidth;
                var h = window.innerHeight;

                introHeight = h;
                headerHeight = $header.height();

                var introStyles = {
                    width:  w,
                    height: h,
                    overflow: 'hidden'
                };

                var videoStyles = {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                };

                if (w > (h * 16/9)) {
                    
                    videoStyles.width  = w;
                    videoStyles.height = w * (9/16);

                } else {

                    videoStyles.height = h;
                    videoStyles.width  = h * (16/9);

                }

                $intro.setStyles(introStyles);
                $video.setStyles(videoStyles);

                $html.addClass('video-ready');

                placeHeader();
            }


            function placeHeader() {
                var pos = window.pageYOffset;

                if (pos > introHeight - headerHeight) {
                    $html.addClass('header-lock');
                } else {
                    $html.removeClass('header-lock');
                }
            }

            $window.on('resize', sizeVideo, this);
            $window.on('scroll', placeHeader, this);

            sizeVideo();
            setTimeout(function() {
                sizeVideo();
            }, 500);

            Y.one('.intro__scroll').on('click', function() {
                var anim = new Y.Anim({
                    duration: 0.666,
                    node: 'win',
                    easing: 'easeBoth',
                    to: {
                        scroll: [0, introHeight - headerHeight]
                    }
                });
                anim.run();
            });
        }

        var clearTripCookie = function() {
            Y.Cookie.remove("lasttrip", { path: "/" });
        };

        if (typeof(PAGE_TYPE) != "undefined") {
            if (PAGE_TYPE == "trip") {
                Y.Cookie.set("lasttrip", window.location.href, { path: "/" });

                if (typeof(DESTINATION_URL) != "undefined" && typeof(DESTINATION_NAME) != "undefined") {
                    var $destinationButton = Y.one('.destination-button');
                    if ($destinationButton) {
                        $destinationButton.set('href', DESTINATION_URL);
                        $destinationButton.set('text', 'More '+DESTINATION_NAME+' trips');

                        $html.addClass('has-destination-button');
                        setTimeout(function() {
                            $html.addClass('show-destination-button');
                        }, 1);
                    }
                }
            } else if (PAGE_TYPE == "extra" && Y.Cookie.get("lasttrip")) {
                $html.addClass('has-back-button');
                setTimeout(function() {
                    $html.addClass('show-back-button');
                }, 1);
            } else {
                clearTripCookie();
            }
        } else {
            clearTripCookie();
        }

        var $backButton = Y.one('.back-button');
        if ($backButton) {
            $backButton.on('click', function() {
                var lastTrip = Y.Cookie.get("lasttrip");
                if (lastTrip) {
                    window.location.href = lastTrip;
                } else {
                    // oops
                    console.log('oops');
                }
            });
        }

        var $backToTop = Y.one('.back-to-top a');
        if ($backToTop) {
            $backToTop.on('click', function() {
                var anim = new Y.Anim({
                    duration: 0.666,
                    node: 'win',
                    easing: 'easeBoth',
                    to: {
                        scroll: [0, 0]
                    }
                });
                anim.run();
            });
        }
    });
});



