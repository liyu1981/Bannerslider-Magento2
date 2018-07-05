define(['jquery', 'livewise/GSAP'], function($, GSAP) {
  var SLIDE_GAP = 2;
  var DATA_GSAPANI_KEY = 'gsapani';
  var SELECTOR_GSAP_CANVAS = '.GSAP-canvas';

  function GSAPAnimation($canvas, $, GSAP) {
    this.$ = $;
    this.GSAP = GSAP;
    this.$canvas = $canvas;
    this.$canvasContentClone = $('#canvas-container', $canvas).clone();

    var fn = $canvas.data('fn');
    this.annimationFn = window[fn];

    this.timeline = new GSAP.TimelineMax().eventCallback(
      'onComplete',
      this.onTimelineComplete.bind(this)
    );
  }
  GSAPAnimation.prototype.run = function() {
    this.annimationFn(this.$, this.$canvas, this.timeline, this.GSAP);
    return this;
  };
  GSAPAnimation.prototype.onTimelineComplete = function() {
    this.$canvas.data(DATA_GSAPANI_KEY, null);
    this.prepareRestore();
    return this;
  };
  GSAPAnimation.prototype.prepareRestore = function() {
    $('#canvas-container', this.$canvas).addClass('gsap-canvas-to-go');
    this.$canvas.prepend(
      this.$canvasContentClone.addClass('gsap-canvas-to-restore')
    );
    return this;
  };

  function executeGSAPAnimation($el) {
    var $canvas = $(SELECTOR_GSAP_CANVAS, $el);
    var ga = $canvas.data(DATA_GSAPANI_KEY);
    if (!ga) {
      try {
        var ga = new GSAPAnimation($canvas, $, GSAP);
        $canvas.data(DATA_GSAPANI_KEY, ga);
        ga.run();
      } catch (err) {
        console.error(err);
      }
    }
  }

  function restoreGSAPCanvas($el) {
    var $canvas = $(SELECTOR_GSAP_CANVAS, $el);
    $('.gsap-canvas-to-go', $canvas).remove();
    $('.gsap-canvas-to-restore', $canvas).removeClass('gsap-canvas-to-restore');
  }

  function HorizSlider(slider_container_el, options) {
    this.el = slider_container_el;
    this.options = options;
    this.slideMax = $('.slide', this.el).length;
    this.slideCurrent = 1;
    this.distanceMap = {};
    this.advanceCurrent();
  }

  HorizSlider.prototype.init = function() {
    this.formatSlides();
    return this;
  };

  HorizSlider.prototype.formatSlides = function() {
    var all_slides = $('.slide', this.el)
      .removeClass('active')
      .removeClass('inactive')
      .toArray();
    var self = this;
    all_slides.forEach(function(slide, index) {
      var dist = self.distanceMap[index];
      var marginLeft = dist * (self.options.width + SLIDE_GAP);
      $(slide)
        .css({
          'background-size':
            '' + self.options.width + 'px ' + self.options.height + 'px',
          width: '' + self.options.width + 'px',
          height: '' + self.options.height + 'px',
          'margin-left': '' + marginLeft + 'px'
        })
        .addClass(
          index == self.slideCurrent
            ? 'active'
            : dist == -2 || dist == -1 || dist == 1 || dist == 2
              ? 'inactive'
              : ''
        )
        //.on('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function(e) {
        .one('transitionend', function(e) {
          // disable GSAP for mobile
          if (self.options.disableGSAP) {
            $(SELECTOR_GSAP_CANVAS, e.target).hide();
            return;
          }
          var el = $(e.target);
          if (el.hasClass('active')) {
            executeGSAPAnimation(el);
          } else if (el.hasClass('inactive')) {
            restoreGSAPCanvas(el);
          }
        });
    });

    return this;
  };

  HorizSlider.prototype.advanceCurrent = function() {
    this.slideCurrent += 1;
    if (this.slideCurrent >= this.slideMax) {
      this.slideCurrent = 0;
    }
    this.distanceMap = {};
    for (var i = 0; i < this.slideMax; i++) {
      var j = this.slideCurrent + i;
      if (j >= this.slideMax) {
        j = j - this.slideMax;
      }
      var d = i + 1 >= this.slideMax ? -1 : i + 2 >= this.slideMax ? -2 : i;
      this.distanceMap[j] = d;
    }
    //console.log(this.distanceMap);
    return this;
  };

  HorizSlider.prototype.rotate = function() {
    this.advanceCurrent();
    this.formatSlides();
    return this;
  };

  HorizSlider.prototype.start = function() {
    var self = this;
    this.timeout_handle = setTimeout(function() {
      self.rotate();
      self.start();
    }, this.options.transistion);
    return this;
  };

  $.fn.buildBannersliderLivewise = function(options) {
    var prev_hs = $(this).data('livewise_hs');
    if (prev_hs) {
      clearTimeout(prev_hs.timeout_handle);
      $(this).data('livewise_hs', null);
    }

    options.width = options.width || 1280;
    options.height = options.height || 640;
    options.transistion = options.transistion || 9000;
    var hs = new HorizSlider(this, options);
    hs.init();
    hs.start();
    //window.hs = hs;

    $(this).data('livewise_hs', hs);
    return hs;
  };
});
