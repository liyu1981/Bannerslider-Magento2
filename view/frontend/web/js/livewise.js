define([
    'jquery',
], function($) {

    var SLIDE_GAP = 2;

    function getCommonSlideCss(options) {
        return {
            'width': ''+options.width+'px',
            'height': ''+options.height+'px',
        };
    }

    function getLeftRightCommonSlideCss(options) {
        return Object.assign({}, getCommonSlideCss(options), {
            'opacity': '0.45',
            'filter': 'grayscale(0.15)'
        });
    }

    function getRightSlideCss(rightel, options) {
        var img_url = $('a > img', rightel).attr('src');
        return Object.assign({}, getLeftRightCommonSlideCss(options), {
            'margin-left': ''+(options.width+SLIDE_GAP)+'px',
            'background': 'url('+img_url+')'
        });
    }

    function getRightRightSlide(rightrightel, options) {
        var img_url = $('a > img', rightel).attr('src');
        return Object.assign({}, getLeftRightCommonSlideCss(options), {
            'margin-left': ''+(options.width*2+SLIDE_GAP)+'px',
            'background': 'url('+img_url+')'
        });
    }

    function getLeftSlideCss(leftel, options) {
        var img_url = $('a > img', leftel).attr('src');
        return Object.assign({}, getLeftRightCommonSlideCss(options), {
            'margin-left': '-'+(options.width+SLIDE_GAP)+'px',
            'background': 'url('+img_url+')',
        });
    }

    function getLeftLeftSlideCss(leftleftel, options) {
        var img_url = $('a > img', leftleftel).attr('src');
        return Object.assign({}, getLeftRightCommonSlideCss(options), {
            'margin-left': '-'+(options.width*2+SLIDE_GAP)+'px',
            'background': 'url('+img_url+')',
        });
    }

    function SlideGenerator(el) {
        var all_slides = $('.slide', el).toArray();
        this.slide_clones = all_slides.map(function(slide) { return $(slide).clone(); });
        this.max = all_slides.length;
        this.pos = 0;
    };
    SlideGenerator.prototype.gen = function() {
        var r = $(this.slide_clones[this.pos]).clone();
        this.pos += 1;
        if (this.pos >= this.max) {
            this.pos = 0;
        }
        return r;
    };

    function prepareSlidesBeforeRotate(el, slide_generator) {
        var all_slides = $('.slide', el);
        for (var i = 0; i < all_slides.length; i++) {
            var slide = $(all_slides[i]);
            if (slide.hasClass('inactive') || slide.hasClass('active')) {
                break;
            } else {
                slide.remove();
                el.append(slide_generator.gen());
            }
        }
    }

    function getCenterSlide(el) {
        var all_slides = $('.slide', el);
        return $(all_slides[1]);
    }

    function getRightSlide(el) {
        var all_slides = $('.slide', el);
        return $(all_slides[2]);
    }

    function getLeftSlide(el) {
        var all_slides = $('.slide', el);
        return $(all_slides[0]);
    }

    function getRightRightSlide(el) {
        var all_slides = $('.slide', el);
        return $(all_slides[3]);
    }

    function initSlider(el, options, slide_generator) {
        var all_slides = $('.slide', el);
        if (all_slides.length == 2) {
            el.append(slide_generator.gen()).append(slide_generator.gen());
        } else if (all_slides.length == 3) {
            el.append(slide_generator.gen());
        }

        var s1 = getCenterSlide(el);
        s1.css(getCommonSlideCss(options)).addClass('active');
        var s2 = getRightSlide(el);
        s2.css(getRightSlideCss(s2, options)).addClass('inactive');
        var s3 = getLeftSlide(el);
        s3.css(getLeftSlideCss(s3, options)).addClass('inactive');
    }

    function rotateSliders(el, options, slide_generator, callback) {
        prepareSlidesBeforeRotate(el, slide_generator);
        var clearSliderEl = function(el) {
            return el.attr('style', '')
                .removeClass('inactive')
                .removeClass('active');
        };

        var centerel = getCenterSlide(el);
        var rightel = getRightSlide(el);
        var leftel = getLeftSlide(el);
        var rightrightel = getRightRightSlide(el);

        clearSliderEl(leftel);
        clearSliderEl(centerel).css(getLeftSlideCss(centerel, options)).addClass('inactive');
        clearSliderEl(rightel).css(getCommonSlideCss(options)).addClass('active');
        clearSliderEl(rightrightel).css(getRightSlideCss(rightrightel, options)).addClass('inactive');

        callback();
    }

    function startSlider(el, options, slide_generator) {
        options.transistion = options.transistion || 4500;
        /*
        window.lwr = function() {
            rotateSliders(el, options, slide_generator);
        };
        */
        setTimeout(function() {
            rotateSliders(el, options, slide_generator, function() {
                startSlider(el, options, slide_generator);
            });
        }, options.transistion);
    }

    $.fn.buildBannersliderLivewise = function(options) {
        options.width = options.width || 1280;
        options.height = options.height || 640;
        var el = this;
        el._slide_generator = new SlideGenerator(el);
        initSlider(el, options, this._slide_generator);
        startSlider(el, options, this._slide_generator);
    };
});
