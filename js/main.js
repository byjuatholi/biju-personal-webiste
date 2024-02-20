



(function($) {

  var $li = $('.headerNav > ul > li'),
  $navBar = $('.navBar');
  $li.on('mouseenter', function(){
   var i = $(this).index(),
   $this = $(this),
   liLeft = $li.width() * i;
   $navBar.stop().animate({ left: liLeft });
 });

  /* Add .scrolled to body after 1px of scroll */

  $(window).scroll(function(){
    var navOffset = 1;
    var scrollPos = $(window).scrollTop();
    if (scrollPos >= navOffset) {
     $(".header, .line, .lineDown, .socialIcons, .titleDate2, body").addClass("scrolled");
     $(".scrollFade").addClass("activateFade");
   } else {
     $(".header, .line, .lineDown, .socialIcons, .titleDate2, body").removeClass("scrolled");
     $(".scrollFadeOut").removeClass("activateFadeOut");
   }
 });


  "use strict";

  var cfg = {
		defAnimation   : "fadeInUp",    // default css animation
		scrollDuration : 800,           // smoothscroll duration
		statsDuration  : 4000           // stats animation duration
	},
	$WIN = $(window);


	/* Preloader
	* -------------------------------------------------- */
	var ssPreloader = function() {

		$WIN.on('load', function() {

			// force page scroll position to top at page refresh
			$('html, body').animate({ scrollTop: 0 }, 'normal');

	      // will first fade out the loading animation
	      $("#loader2").fadeOut("slow", function(){

	        // will fade out the whole DIV that covers the website.
	        $("#preloader").delay(300).fadeOut("slow", function(){

            $('body').addClass('loaded');

          });
       });
     });
	};


  	/* Menu on Scrolldown
  	* ------------------------------------------------------ */
  	var ssMenuOnScrolldown = function() {

  		var menuTrigger = $('#header-menu-trigger');

  		$WIN.on('scroll', function() {

  			if ($WIN.scrollTop() > 150) {
  				menuTrigger.addClass('opaque');
  			}
  			else {
  				menuTrigger.removeClass('opaque');
  			}

  		});
  	};


  	/* OffCanvas Menu
  	* ------------------------------------------------------ */
  	var ssOffCanvas = function() {

  		var menuTrigger = $('#header-menu-trigger'),
  		nav             = $('#menu-nav-wrap'),
  		closeButton     = nav.find('.close-button'),
  		siteBody        = $('body'),
  		mainContents    = $('section, footer');

		// open-close menu by clicking on the menu icon
		menuTrigger.on('click', function(e){
			e.preventDefault();
			menuTrigger.toggleClass('is-clicked');
			siteBody.toggleClass('menu-is-open');
		});

		// close menu by clicking the close button
		closeButton.on('click', function(e){
			e.preventDefault();
			menuTrigger.trigger('click');
		});

		// close menu clicking outside the menu itself
		siteBody.on('click', function(e){
			if( !$(e.target).is('#menu-nav-wrap, #header-menu-trigger, #header-menu-trigger span') ) {
				menuTrigger.removeClass('is-clicked');
				siteBody.removeClass('menu-is-open');
			}
		});

	};


  /* Smooth Scrolling
  * ------------------------------------------------------ */
  var ssSmoothScroll = function() {

  	$('.smoothscroll').on('click', function (e) {
  		var target = this.hash,
  		$target    = $(target);

  		e.preventDefault();
  		e.stopPropagation();

  		$('html, body').stop().animate({
  			'scrollTop': $target.offset().top
  		}, cfg.scrollDuration, 'swing').promise().done(function () {

	      	// check if menu is open
	      	if ($('body').hasClass('menu-is-open')) {
	      		$('#header-menu-trigger').trigger('click');
	      	}

	      	window.location.hash = target;
	      });
  	});

  };


  /* Animations
  * ------------------------------------------------------- */
  var ssAnimations = function() {

  	if (!$("html").hasClass('no-cssanimations')) {
  		$('.animate-this').waypoint({
  			handler: function(direction) {

  				var defAnimationEfx = cfg.defAnimation;

  				if ( direction === 'down' && !$(this.element).hasClass('animated')) {
  					$(this.element).addClass('item-animate');

  					setTimeout(function() {
  						$('body .animate-this.item-animate').each(function(ctr) {
  							var el       = $(this),
  							animationEfx = el.data('animate') || null;

  							if (!animationEfx) {
  								animationEfx = defAnimationEfx;
  							}

  							setTimeout( function () {
  								el.addClass(animationEfx + ' animated');
  								el.removeClass('item-animate');
  							}, ctr * 50);

  						});
  					}, 100);
  				}

					   // trigger once only
					// this.destroy();

				},
				offset: '90%'
			});
  	}

  };


  /* Intro Animation
  * ------------------------------------------------------- */
  var ssIntroAnimation = function() {

  	$WIN.on('load', function() {

  		if (!$("html").hasClass('no-cssanimations')) {
  			setTimeout(function(){
  				$('.animate-intro').each(function(ctr) {
  					var el = $(this),
  					animationEfx = el.data('animate') || null;

  					if (!animationEfx) {
  						animationEfx = cfg.defAnimation;
  					}

  					setTimeout( function () {
  						el.addClass(animationEfx + ' animated');
  					}, ctr * 200);
  				});
  			}, 100);
  		}
  	});

  };

	/*===============================
	=            Masking            =
	===============================*/

	$(document).ready(function(){
		var mouseX, mouseY;
		var ww = $( window ).width();
		var wh = $( window ).height();
		var traX, traY;
		$(document).mousemove(function(e){
			mouseX = e.pageX;
			mouseY = e.pageY;
			traX = ((4 * mouseX) / 200) + 50;
			traY = ((4 * mouseY) / 200) + 50;
			$(".mask").css({"background-position": traX + "%" + traY + "%"});
		});
	});

	/*=====  End of Masking  ======*/


  /* Contact Form
  * ------------------------------------------------------ */
  var ssContactForm = function() {

  	/* local validation */
  	$('#contactForm').validate({

  		/* submit via ajax */
  		submitHandler: function(form) {
  			var sLoader = $('#submit-loader');

  			$.ajax({
  				type: "POST",
  				url: "inc/sendEmail.php",
  				data: $(form).serialize(),

  				beforeSend: function() {
  					sLoader.fadeIn();
  				},
  				success: function(msg) {
		            // Message was sent
		            if (msg == 'OK') {
		            	sLoader.fadeOut();
		            	$('#message-warning').hide();
		            	$('#contactForm').fadeOut();
		            	$('#message-success').fadeIn();
		            }
		            // There was an error
		            else {
		            	sLoader.fadeOut();
		            	$('#message-warning').html(msg);
		            	$('#message-warning').fadeIn();
		            }
              },
              error: function() {
               sLoader.fadeOut();
               $('#message-warning').html("Something went wrong. Please check the fields.");
               $('#message-warning').fadeIn();
             }
           });
  		}

  	});
  };


  /* Back to Top
  * ------------------------------------------------------ */
  var ssBackToTop = function() {

		var pxShow  = 500,         // height on which the button will show
		fadeInTime  = 400,         // how slow/fast you want the button to show
		fadeOutTime = 400,         // how slow/fast you want the button to hide
		scrollSpeed = 300,         // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'
		goTopButton = $("#go-top")

		// Show or hide the sticky footer button
		$(window).on('scroll', function() {
			if ($(window).scrollTop() >= pxShow) {
				goTopButton.fadeIn(fadeInTime);
			} else {
				goTopButton.fadeOut(fadeOutTime);
			}
		});
	};



  /* Initialize
  * ------------------------------------------------------ */
  (function ssInit() {

  	ssPreloader();
  	ssMenuOnScrolldown();
  	ssOffCanvas();
  	ssSmoothScroll();
  	ssAnimations();
  	ssIntroAnimation();
  	ssContactForm();
  	ssBackToTop();

  })();

})(jQuery);




/* Dots
* ------------------------------------------------------ */

'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

document.addEventListener('DOMContentLoaded', init, false);
var APP = undefined;
function init() {
 APP = new App();
 events();
 loop();
}
function loop() {
 APP.render();
 requestAnimationFrame(loop);
}
function events() {
 document.addEventListener('mousemove', APP.mousemoveHandler, false);
 document.addEventListener('mouseleave', APP.mouseleaveHandler, false);
 window.addEventListener('resize', APP.resize, false);
}

var App = function () {
 function App() {
  _classCallCheck(this, App);

  this.canvas = document.getElementById('playground');
  this.context = this.canvas.getContext('2d');
  this.canvas.width = this.width = window.innerWidth;
  this.canvas.height = this.height = window.innerHeight;
  this.setupDots();
  this.resize = this.resize.bind(this);
  this.mousemoveHandler = this.mousemoveHandler.bind(this);
  this.mouseleaveHandler = this.mouseleaveHandler.bind(this);
}

App.prototype.setupDots = function setupDots() {
  this.dots = [];
  this.scl = 100;
  this.cols = this.width / this.scl;
  this.rows = this.height / this.scl;
  var id = 0;
  for (var x = 0; x < this.cols; x += 1) {
   for (var y = 0; y < this.rows; y += 1) {
    this.dots.push(new Dot(id, x * this.scl, y * this.scl, this.context, this.scl));
    id += 1;
  }
}
};

App.prototype.resize = function resize() {
  this.canvas.width = this.width = window.innerWidth;
  this.canvas.height = this.height = window.innerHeight;
  this.setupDots();
};

App.prototype.mousemoveHandler = function mousemoveHandler(event) {
  this.dots.forEach(function (d) {
   d.mousemove(event);
 });
};

App.prototype.mouseleaveHandler = function mouseleaveHandler() {
  this.dots.forEach(function (d) {
   d.isHover = false;
 });
};

App.prototype.render = function render() {
  this.context.clearRect(0, 0, this.width, this.height);

  this.dots.forEach(function (d) {
   d.render();
 });
};

return App;
}();

var Dot = function () {
 function Dot(id, x, y, context, scl) {
  _classCallCheck(this, Dot);

  this.id = id;
  this.x = x;
  this.y = y;
  this.new = { x: x, y: y };
  this.radius = 1;

  this.context = context;
  this.scl = scl;
  this.isHover = false;
  this.isANimated = false;
}

Dot.prototype.mousemove = function mousemove(event) {
  var x = event.clientX;
  var y = event.clientY;
  this.isHover = Math.abs(this.x - x) < this.scl / 4 * 3 && Math.abs(this.y - y) < this.scl / 4 * 3 ? true : false;
  if (this.isHover) {
   TweenMax.to(this.new, 0.4, { x: x, y: y });
 } else {
   TweenMax.to(this.new, 0.4, { x: this.x, y: this.y });
 }
};

Dot.prototype.render = function render() {
  this.context.beginPath();
  this.context.arc(this.new.x, this.new.y, this.radius, 0, 2 * Math.PI, false);

  this.context.fillStyle = 'rgba(255, 255, 255, 1)';
  this.context.globalAlpha = this.isHover ? 1 : 0.0;
  this.context.fill();
};

return Dot;
}();








/**
 * Generates random particles using canvas
 *
 * @class Particles
 * @constructor
 */
function Particles(){
  //particle colors
  this.colors = [
    '125, 141, 186',
    '255, 255, 255'
  ]
  //adds gradient to particles on true
  this.blurry = true;
  //adds white border
  this.border = false;
  //particle radius min/max
  this.minRadius = .1;
  this.maxRadius = 1;
  //particle opacity min/max
  this.minOpacity = .005;
  this.maxOpacity = .2;
  //particle speed min/max
  this.minSpeed = -.05;
  this.maxSpeed = .4;
  //frames per second
  this.fps = 60;
  //number of particles
  this.numParticles = 25;
  //required canvas variables
  this.stage = document.getElementById('stage');
  this.ctx = this.stage.getContext('2d');
}

/**
 * Initializes everything
 * @method init
 */
Particles.prototype.init = function(){
  this.render();
  this.createCircle();
}

/**
 * generates random number between min and max values
 * @param  {number} min value
 * @param  {number} max malue
 * @return {number} random number between min and max
 * @method _rand
 */
Particles.prototype._rand = function(min, max){
  return Math.random() * (max - min) + min;
}

/**
 * Sets canvas size and updates values on resize
 * @method render
 */
Particles.prototype.render = function(){
  var self = this,
      wHeight = $(window).height(),
      wWidth = $(window).width();

  self.stage.width = wWidth;
  self.stage.height = wHeight;

  $(window).on('resize', self.render);
}

/**
 * Randomly creates particle attributes
 * @method createCircle
 */
Particles.prototype.createCircle = function(){
  var particle = [];

  for (var i = 0; i < this.numParticles; i++) {
    var self = this,
        color = self.colors[~~(self._rand(0, self.colors.length))];
        vy = self._rand(self.minSpeed, self.maxSpeed);
        vx= self._rand(self.minSpeed, self.maxSpeed);
        r =2; //Math.sqrt(Math.sqr(vx)+Math.sqr(vy));
    particle[i] = {
          radius: r,
            xPos: self._rand(0, stage.width),
            yPos: self._rand(0,stage.height),
      xVelocity: self._rand(self.minSpeed, self.maxSpeed),
      yVelocity: vy,
      color: 'rgba(' + color + ',' + self._rand(self.minOpacity, self.maxOpacity) + ')'
    }

    //once values are determined, draw particle on canvas
    self.draw(particle, i);
  }
  //...and once drawn, animate the particle
  self.animate(particle);
}

/**
 * Draws particles on canvas
 * @param  {array} Particle array from createCircle method
 * @param  {number} i value from createCircle method
 * @method draw
 */
Particles.prototype.draw = function(particle, i){
  var self = this,
      ctx = self.ctx;
  if (self.blurry === true ) {
    //creates gradient if blurry === true
    var grd = ctx.createRadialGradient(particle[i].xPos, particle[i].yPos, particle[i].radius, particle[i].xPos, particle[i].yPos, particle[i].radius/1.25);
    grd.addColorStop(1.000, particle[i].color);
    grd.addColorStop(0.000, 'rgba(34, 34, 34, 0)');
    ctx.fillStyle = grd;
  } else {
    //otherwise sets to solid color w/ opacity value
    ctx.fillStyle = particle[i].color;
  }
  if (self.border === true) {
        ctx.strokeStyle = '#fff';
        ctx.stroke();
  }
  ctx.beginPath();
  ctx.arc(particle[i].xPos, particle[i].yPos, particle[i].radius, 0, 2 * Math.PI, false);
  ctx.fill();
}

/**
 * Animates particles
 * @param  {array} particle value from createCircle & draw methods
 * @method animate
 */
Particles.prototype.animate = function(particle){
  var self = this,
          ctx = self.ctx;

  setInterval(function(){
    //clears canvas
    self.clearCanvas();
    //then redraws particles in new positions based on velocity
    for (var i = 0; i < self.numParticles; i++) {
      particle[i].xPos += particle[i].xVelocity;
      particle[i].yPos -= particle[i].yVelocity;

      //if particle goes off screen call reset method to place it offscreen to the left/bottom
      if (particle[i].xPos > self.stage.width + particle[i].radius || particle[i].yPos > self.stage.height + particle[i].radius) {
        self.resetParticle(particle, i);
      } else {
        self.draw(particle, i);
      }
    }
  }, 1000/self.fps);
}

/**
 * Resets position of particle when it goes off screen
 * @param  {array} particle value from createCircle & draw methods
 * @param  {number} i value from createCircle method
 * @method resetParticle
 */
Particles.prototype.resetParticle = function(particle, i){
  var self = this;

  var random = self._rand(0, 1);

  if (random > .5) {
    // 50% chance particle comes from left side of window...
    particle[i].  xPos = -particle[i].radius;
        particle[i].yPos =   self._rand(0, stage.height);
  } else {
    //... or bottom of window
    particle[i].  xPos = self._rand(0, stage.width);
        particle[i].yPos =   stage.height + particle[i].radius;
  }
  //redraw particle with new values
  self.draw(particle, i);
}

/**
 * Clears canvas between animation frames
 * @method clearCanvas
 */
Particles.prototype.clearCanvas = function(){
  this.ctx.clearRect(0, 0, stage.width, stage.height);
}

// go go go!
var particle = new Particles();
particle.init();














/* Parallax
* ------------------------------------------------------ */

$(document).ready(function(){
  var scene = document.getElementById('js-scene');
  var parallax = new Parallax(scene);
});



/*========================================================
=            Trigger on entering viewport                =
========================================================*/

$(document).ready(function() {
    var winHeight = $(window).height(),
        // Distance from top to remove class, a -1 toggles it after it's offscreen
        topLimit = winHeight * -1,
        // Distance from Bottom to add class,
        bottomLimit = winHeight * 1;
        // These distances are relative to the bottom of an element

    $(window).on('scroll', function() {
        $('.onEnter').each(function() {
            var thisTop = $(this).offset().top - $(window).scrollTop();
            if (thisTop >= topLimit && (thisTop + $(this).height()) <= bottomLimit) {
                $(this).addClass('triggered')
            } else{
               $(this).removeClass('triggered')
              }
        });
    });
});



  // -- jQuery Waypoints v2.0.3

  $(".wait").waypoint(function(){
      $(this).toggleClass('seen');
  }, {
      offset: 'bottom-in-view'
  });

// $('#section-about').waypoint(function(direction) {
//   if (direction == 'down') {
//     $(this).toggleClass("blue");
//     console.log('Top of notify element hit top of viewport.');
//   }
// },  {
//   offset: function() {
//     return 400 // trip waypoint when element is this many px from top
//   }
// });

// $('.wait').waypoint(function(direction) {
//   console.log('Top of notify element hit top of viewport.');
//   $(this).toggleClass('seen');
// },{
//   offset:'90%'
// });

