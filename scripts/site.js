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

        var $menuOpen = Y.one('.menu__open');
        var $menuClose = Y.one('.menu__close');
        var $menuUnderlay = Y.one('menu__underlay');

        var openMenu = function() {
            $html.addClass('show-menu');
        };

        var closeMenu = function() {
            $html.removeClass('show-menu');
        };

        $menuOpen.on('click', openMenu); 
        $menuClose.on('click', closeMenu);
        $menuUnderlay.on('click', closeMenu);

    });
});


