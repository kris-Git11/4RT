MathGame = {
  answerCorrect: 0,
  answerIncorrect: 0,

  options: {
    type: ['+', '-', '*', '/'],
    maxNum: 100,
  },

  setNum: function(position, value) {
    $("#number" + position).val(value);
  },
  getNum: function(position) {
    return $("#number" + position).val();
  },
  setSign: function(sign) {
    $("#sign").html(sign);
  },

  showInfo: function(type) {
    var infoS = $("#success");
    var infoE = $("#error");

    if (type == 'success') {
      infoS.removeClass("hidden").fadeIn();
      infoE.hide();
    } else if (type == 'error') {
      infoE.removeClass("hidden").fadeIn();
      infoS.hide();
    }
  },

  clearAnswer: function(value) {
    value = value || '';
    $("#answer").val(value);
  },
  setAnswer: function(value) {
    $("#answer").attr('data-answer', value);
  },
  getAnswer: function() {
    return $("#answer").val();
  },
  getCorrectAnswer: function() {
    return $("#answer").attr('data-answer');
  },
  checkAnswer: function() {
    if (this.getAnswer() === this.getCorrectAnswer()) {
      this.showInfo('success');
      this.getRandomExpression();
    } else {
      this.showInfo('error');
    }
    this.clearAnswer();
  },

  getRndNum: function(max) {
    max = max || 100;
    return Math.round(Math.random() * (max - 1) + 1);
  },
  expressions: {
    '+': function(obj, maxNum) {
      maxNum = maxNum || obj.options.maxNum;

      var a = obj.getRndNum(maxNum);
      var b = obj.getRndNum(maxNum);

      obj.setNum(1, a);
      obj.setNum(2, b);
      obj.setSign('+');
      obj.setAnswer(a + b);
    },
    '-': function(obj, maxNum) {
      maxNum = maxNum || obj.options.maxNum;

      var a = obj.getRndNum(maxNum);
      var b = obj.getRndNum(maxNum);

      obj.setNum(1, Math.max(a, b));
      obj.setNum(2, Math.min(a, b));
      obj.setSign('&minus;');
      obj.setAnswer(Math.abs(a - b));
    },
    '*': function(obj, maxNum) {
      maxNum = maxNum || obj.options.maxNum;

      var numbers = this.getNumbers(obj, maxNum);

      obj.setNum(1, numbers['a']);
      obj.setNum(2, numbers['r'] / numbers['a']);
      obj.setSign('&times;');
      obj.setAnswer(numbers['r']);
    },
    '/': function(obj, maxNum) {
      maxNum = maxNum || obj.options.maxNum;

      var numbers = this.getNumbers(obj, maxNum);

      obj.setNum(1, numbers['r']);
      obj.setNum(2, numbers['r'] / numbers['a']);
      obj.setSign('&divide;');
      obj.setAnswer(numbers['a']);
    },

    getNumbers: function(obj, maxNum) {
      var r = obj.getRndNum(maxNum / 2) + maxNum / 2;
      var a = obj.getRndNum(r / 2);
      var b = Math.round(r / a);
      r = a * b;

      return {
        'a': a,
        'b': b,
        'r': r,
      };
    }
  },
  getExpression: function(sign) {
    sign = sign || '+';
    this.expressions[sign](this);
  },
  getRandomExpression: function() {
    var n = this.getRndNum(this.options.type.length);
    var e = this.options.type[n - 1];
    this.getExpression(e);

    this.focusAnswer();
  },

  bindAnswer: function() {
    var obj = this;
    $("#answer").keydown(function(e) {
      //console.log(e.keyCode);
      if (e.keyCode == 13) {
        obj.checkAnswer();
        return;
      }
      // Allow: backspace, delete, tab, escape, enter and .
      if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode == 65 && e.ctrlKey === true) ||
        // Allow: home, end, left, right, down, up
        (e.keyCode >= 35 && e.keyCode <= 40)) {
        // let it happen, don't do anything
        return;
      }
      // Ensure that it is a number and stop the keypress
      if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
      }
      // max-length = 3
      if ($(this).val().length >= 3) {
        e.preventDefault();
      }
    });
  },
  focusAnswer: function() {
    $("#answer").focus();
  },

  start: function(options) {
    this.options = options || this.options;
    this.getRandomExpression();
    this.bindAnswer();
  }
}

var options = {
  type: ['+', '-', '*', '/'],
  maxNum: 50,
};
MathGame.start(options);