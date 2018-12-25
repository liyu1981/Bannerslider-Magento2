var config = {
    map: {
        '*': {
            'magestore/note': 'Magestore_Bannerslider/js/jquery/slider/jquery-ads-note',
            'magestore/impress': 'Magestore_Bannerslider/js/report/impress',
            'magestore/clickbanner': 'Magestore_Bannerslider/js/report/clickbanner',
        },
    },
    paths: {
        'magestore/livewise': 'Magestore_Bannerslider/js/livewise',
        'magestore/flexslider': 'Magestore_Bannerslider/js/jquery/slider/jquery-flexslider-min',
        'magestore/evolutionslider': 'Magestore_Bannerslider/js/jquery/slider/jquery-slider-min',
        'magestore/popup': 'Magestore_Bannerslider/js/jquery.bpopup.min',

        'GSAP/TimelineMax': 'Magestore_Bannerslider/js/GSAP/core-2.0.1/TimelineMax.min',
        'GSAP/TweenMax': 'Magestore_Bannerslider/js/GSAP/core-2.0.1/TweenMax.min',
        'GSAP/ClubSplitText': 'Magestore_Bannerslider/js/GSAP/club/SplitText',
        'GSAP/UtilRandomColor': 'Magestore_Bannerslider/js/GSAP/util/randomColor-0.5.2/randomColor.min',
        'livewise/GSAP': 'Magestore_Bannerslider/js/GSAP/gsap',
    },
    shim: {
        'magestore/livewise': {
            deps: ['jquery']
        },
        'magestore/flexslider': {
            deps: ['jquery']
        },
        'magestore/evolutionslider': {
            deps: ['jquery']
        },
        'magestore/zebra-tooltips': {
            deps: ['jquery']
        },
        'magestore/popup': {
            deps: ['jquery']
        },
        'GSAP/TimelineMax': {
            deps: ['GSAP/TweenMax']
        },
        'GSAP/ClubSplitText': {
            deps: ['GSAP/TweenMax', 'GSAP/TimelineMax']
        },
    }
};
