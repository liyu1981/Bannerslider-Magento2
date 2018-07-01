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

        //'GSAP/TimelineLite': 'Magestore_Bannerslider/js/GSAP-2.0.1/TimelineLite.min',
        'GSAP/TimelineMax': 'Magestore_Bannerslider/js/GSAP-2.0.1/TimelineMax.min',
        //'GSAP/TweenLite': 'Magestore_Bannerslider/js/GSAP-2.0.1/TweenLite.min',
        'GSAP/TweenMax': 'Magestore_Bannerslider/js/GSAP-2.0.1/TweenMax.min',
        //'GSAP/jQuery': 'Magestore_Bannerslider/js/GSAP-2.0.1/jquery.gsap.min',
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
    }
};
