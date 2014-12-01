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

        var $html = Y.one('html');
        var $body = Y.one('body');

        var $menuOpen = Y.one('.menu__open');
        var $menuClose = Y.one('.menu__close');
        var $menuUnderlay = Y.one('.menu__underlay');

        var openMenu = function() {
            $html.addClass('show-menu');
        };

        var closeMenu = function() {
            $html.removeClass('show-menu');
        };

        $menuOpen.on('click', openMenu); 
        $menuClose.on('click', closeMenu);
        $menuUnderlay.on('click', closeMenu);

        if ($body.hasClass('homepage')) {
            var $intro = Y.one('.intro');
            var $video = Y.one('.intro__video');

            function sizeVideo() {
                var w = window.innerWidth;
                var h = window.innerHeight;

                var introStyles = {
                    width:  w,
                    height: h,
                    position: 'relative',
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
            }

            Y.one(window).on('resize', sizeVideo, this);
            sizeVideo();
        }

    });
});



