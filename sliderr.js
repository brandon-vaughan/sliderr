

// -------------------------- Slider -------------------------- //
var isTransition = Modernizr.csstransitions;

function Sliderr( elem, options ) {

  if ( !elem ) {
    return;
  }

  this.slider = elem;
  this.slides = this.slider.find('.deck > article');
  this.nav = this.slider.find('nav');

  this.options = {};

  // setup defaults
  for( var prop in Slider.defaults ) {
    this.options[prop] = Slider.defaults[prop];
  }

  // get user options
  for( prop in options ) {
    this.options[prop] = options[prop];
  }

  // get movement type ( transition or callback )
  this.movement = isTransition ? 'transition' : 'animate';

  // get slide effect ( fade or slide )
  this.effect = this.options.effect;
  this.slider.addClass('trans-'+this.effect);

  // check if autoplay
  this.autoPlay = this.options.autoPlay;

  // default animation duration
  this.duration = 500;

  // default slide animations
  this.slide = {
    past: { right: 590, opacity: 0 },
    future: { right: -590, opacity: 0 },
    current: { right: 0, opacity: 1 }
  };
  
  // default fade animations
  this.fade = {
    past: { opacity: 0 },
    future: { opacity: 0 },
    current: { opacity: 1 }
  };
  
  // default properties
  this.totalSlides = this.slides.length;

  this.setup();

}

Sliderr.defaults = {
  effect: 'slide',
  autoPlay: false
};

Sliderr.prototype.setup = function() {

  // Check for more than one slide else return
  if ( this.slides.length < 2 ) {
    return;
  }

  // bind events
  this.bindings();

  // inject slide classes
  this.slides.addClass('is-' + this.movement + ' future');
  this.slides.first().removeClass('future').addClass('cur');
  
  if ( !isTransition ) {
    this.slides.css( this[this.effect].future );
    this.slides.first().css( this[this.effect].current, (this.duration ) );
  }

  // start move
  if ( this.autoPlay ) {
    var instance = this;
    this.play = setInterval( function() { instance.move('next'); } , 5000 );
  } else {
    this.move();
  }

};

Slider.prototype.bindings = function() {

  var instance = this;

  // next / prev navigation
  this.nav.delegate( 'a', 'click', function() {

    var direction = $(this).attr('class');

    instance.move(direction);

    if ( instance.autoPlay ) {
      var obj = instance;
      clearInterval(instance.play);
      instance.play = setInterval( function() { obj.move('next'); } , 5000 );
    }

    return false;

  });

};

Sliderr.prototype.move = function( direction, index ) {

  this.direction = direction;

  // Setup indexes
  this.curSlide = this.slides.filter('.cur');

  this.index = !index ? this.curSlide.index() : index;
  this.next = ( ( this.index + 1 ) + this.totalSlides ) % ( this.totalSlides );
  this.prev = ( ( this.index - 1 ) + this.totalSlides ) % ( this.totalSlides );

  // Setup motion
  this.moveto = this[this.direction];
  this.moveOutClass = this.direction === 'next' ? 'past' : 'future';

  this.future = ( ( this.moveto + 1 ) + this.totalSlides ) % ( this.totalSlides );
  this.past = ( ( this.moveto - 1 ) + this.totalSlides ) % ( this.totalSlides );

  this.nextSlide = this.slides.eq(this.moveto);
  this.pastSlide = this.slides.eq(this.past);
  this.futureSlide = this.slides.eq(this.future);

  if ( this.direction ) {

    // Animate move if no transition
    if ( !isTransition ) {
      this.animate( this.effect );
    }

    this.assignments();

  }

};

Sliderr.prototype.assignments = function() {

  // Send current out
  this.curSlide.addClass(this.moveOutClass).removeClass('cur');

  // Move to selected
  this.nextSlide.removeClass('future').removeClass('past').addClass('cur');

  // Setup past and future directions
  this.pastSlide.removeClass('future').addClass('past');
  this.futureSlide.removeClass('past').addClass('future');

};

Sliderr.prototype.animate = function() {
  
  // queue up jquery objects and animate them via the effecttype object
  this.curSlide.animate(this[this.effect][this.moveOutClass], this.duration );
  this.nextSlide.animate(this[this.effect].current, this.duration );
  this.pastSlide.animate(this[this.effect].past, this.duration );
  this.futureSlide.animate(this[this.effect].future, this.duration );

};
