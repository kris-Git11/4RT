function EasyPeasyParallax() {
	scrollPos = $(this).scrollTop();
	$('.p1').css({
		'background-position' : '50% ' + (-scrollPos/4)+"px"
	});
  $('.p2').css({
		'background-position' : '50% ' + (-scrollPos/8)+"px"
	});
  $('.p3').css({
		'background-position' : '70% ' + (-scrollPos/16)+"px"
	});
	$('.parallax-text').css({
		'margin-top': (scrollPos/2)+"px",
		'opacity': 1-(scrollPos/230)
	});
}
$(document).ready(function(){
	$(window).scroll(function() {
		EasyPeasyParallax();
	});
});
var timer = {
  el: '.progress-bar',
  init: function(secs) {
    this.secs = secs || 5;
    this.chunk = 100 / this.secs;
    this.left = 100;
  },
  start: function() {
    // log
    console.log('start!');
    // start timer
    this.id = setInterval(function(){      
      // calc green
      var green = Math.floor(timer.left - timer.chunk);
      // set DOM
      $(timer.el).css('width', green + "%");
      // decrement
      timer.left = green;
      // if 0 then kill all
      if (timer.left < 0) {
        // stop timer
        timer.stop();
        // stop game
        game.stop();
      }
    // every sec
    }, 1000);
  }, 
  stop: function() {
    // kill
    clearInterval(timer.id);
    // log
    console.log('done!');
    // reset values
    timer.reset();
  },
  reset: function() {
    // data
    this.left = 100;
    // dom
    $(timer.el).css('width', "100%");
  }
};

var game = {
  init: function() {
    // check hi-score
    if (typeof(Storage) !== "undefined") {
      // get data
      var hi = localStorage.getItem("mathgame_hi-score");
      // check it
      if (hi) {
        // set and render
        score.update('hi', Number(hi)).render();
      }
    } else {
      // no support
      console.log('No support for localstorage. Hi-score will not be saved between games');
    }
  },
  current: {},
  start: function() {    
    // set score to 0
    score.update('me', 0).render();
    // show game controls and timer
    this.toggle();
    // start loop
    this.update();
  },
  stop: function() {
    // hide controls
    game.toggle();
    // set hi-score
    if (typeof(Storage) !== "undefined") {
      // get data
      var old_hi = localStorage.getItem("mathgame_hi-score"),
          new_hi = score.me;
      // check
      if (!old_hi || new_hi > Number(old_hi)) {
        // set storage
        localStorage.setItem("mathgame_hi-score", new_hi);
        // set and render
        score.update('hi', new_hi).render('animate', 1);
        // alert
        //$('.alert').slideDown(500).delay(2000).slideUp(1000);
      }
    }
  },
  update: function() {
    // get random obj from db
    this.current = db[ Math.floor(Math.random() * db.length) ];
    // display in dom (should be its own render fn?)
    $('#math-part').html(this.current.q);
  },
  toggle: function() {
    // controls
    $('#game-div').slideToggle({easing:'easeOutBounce'});
    // btn
    $('#start-game-btn').toggle();
    $('.progress').toggle();
  }
};

var score = {
  hi: 0,
  me: 0,
  render: function(animate, el) {
    // always render from this
    $('#score-hi').html(this.hi);
    $('#score-me').html(this.me);
    // animate well - only on click answer
    if (animate) {
      $('#scores-div .well').eq(el).snabbt('attention', {
        rotation: [0, 0, Math.PI/2],
        springConstant: 1.9,
        springDeacceleration: 0.9,
      });
    }
  },
  update: function(k, v) {
    this[k] = v;
    return this;
  }
};

var db = [
  {q:'1 + 2 = 3',a:true},
  {q:'5 + 5 = 10',a:true},
  {q:'10 - 2 = 3',a:false},
  {q:'4 - 2 = 1',a:false},
  {q:'5 + 3 = 8',a:true},
  {q:'2 + 2 = 4',a:true},
  {q:'9 - 2 = 3',a:false},
  {q:'3 + 7 = 9',a:false},
  {q:'1 + 1 = 2',a:true},
  {q:'0 + 9 = 9',a:true},
  {q:'1 + 1 = 3',a:false},
  {q:'10 - 4 = 5',a:false},
  {q:'5 + x = ?',a:true}
];

// ******
// events
// ******

// START GAME
$('#start-game-btn').click(function(){
  // start logic
  game.start.call(game);
  // start timer
  timer.start.call(timer);
});

// USER INPUT
$('#game-div button').on('click', function(){
  // get val as str
  var str = $(this).attr('id').substr(4);  
  // check strings
  if (game.current.a.toString() === str) {
    // inc and render
    score.update('me', score.me +1).render();
  } else {
    // dec and render
    score.update('me', score.me -1).render('animate', 0);
  }
  // update regardless
  game.update.call(game);
});

$(function(){
  // init
  game.init();
  timer.init(10);
});