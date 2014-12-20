/*
    Create a new YUI instance and load the node
    and event modules.

    HELPFUL LINKS
    =============

    http://yuilibrary.com/yui/docs/api/
    http://www.jsrosettastone.com/
*/

YUI().use('node', 'event', 'squarespace-util', function (Y) {
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

        if ($body.hasClass('homepage')) {
            var $intro = Y.one('.intro');
            var $video = Y.one('.intro__video');
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
                var pos = window.scrollY;

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

    });
});



