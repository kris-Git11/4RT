var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var TIME = 30; // Initial game duration, in seconds
var
Expression = function (_React$PureComponent) {_inherits(Expression, _React$PureComponent);function Expression() {_classCallCheck(this, Expression);return _possibleConstructorReturn(this, (Expression.__proto__ || Object.getPrototypeOf(Expression)).apply(this, arguments));}_createClass(Expression, [{ key: 'componentDidUpdate', value: function componentDidUpdate(

    prevProps) {
      var node = ReactDOM.findDOMNode(this.ref);
      if (this.props.transitioning) {
        node.classList.add('transitioning');
      } else
      {
        node.classList.remove('transitioning');
      }
    } }, { key: 'render', value: function render()

    {var _this2 = this;var _props =
      this.props,from = _props.from,to = _props.to;
      return (
        React.createElement('div', { className: 'expression', ref: function ref(_ref) {return _this2.ref = _ref;} },
          React.createElement('div', { className: 'from' },
            React.createElement('div', { className: 'text' }, from),
            React.createElement('div', { className: 'box' }, '?')),

          React.createElement('div', { className: 'to' },
            React.createElement('div', { className: 'text' }, to),
            React.createElement('div', { className: 'box' }, '?'))));



    } }]);return Expression;}(React.PureComponent);var


Timer = function (_React$PureComponent2) {_inherits(Timer, _React$PureComponent2);

  function Timer(props) {_classCallCheck(this, Timer);var _this3 = _possibleConstructorReturn(this, (Timer.__proto__ || Object.getPrototypeOf(Timer)).call(this,
    props));
    _this3.state = _this3.secondsToTimeObject(Math.floor((props.endTime - Date.now()) / 1000));return _this3;
  }_createClass(Timer, [{ key: 'componentDidMount', value: function componentDidMount()

    {
      this.continouslyUpdateTime();
    } }, { key: 'componentDidUpdate', value: function componentDidUpdate()

    {
      this.continouslyUpdateTime();
    } }, { key: 'componentWillUnmount', value: function componentWillUnmount()

    {
      clearTimeout(this.timeout);
    } }, { key: 'continouslyUpdateTime', value: function continouslyUpdateTime()

    {var _this4 = this;
      this.updateTime();
      clearTimeout(this.timeout);
      this.timeout = setTimeout(function () {var _state =
        _this4.state,m = _state.m,s = _state.s;
        if (m > 0 || s > 0) {
          _this4.continouslyUpdateTime();
        } else
        {
          _this4.props.onTimerEnd();
        }
      }, 50);
    } }, { key: 'updateTime', value: function updateTime()

    {var
      endTime = this.props.endTime;var _state2 =
      this.state,m = _state2.m,s = _state2.s;
      var remaining = Math.floor((endTime - Date.now()) / 1000);

      if (remaining !== m * 6 + s) {
        this.setState(this.secondsToTimeObject(remaining));
      }
    } }, { key: 'secondsToTimeObject', value: function secondsToTimeObject(

    s) {
      return { m: Math.floor(s / 60), s: s % 60 };
    } }, { key: 'render', value: function render()

    {var _this5 = this;var _state3 =
      this.state,m = _state3.m,s = _state3.s;
      var remaining = m * 60 + s;
      return (
        React.createElement('div', { className: 'timer ' + (remaining < 5 && remaining > 0 ? 'animated bounceIn red' : ''), ref: function ref(_ref2) {return _this5.ref = _ref2;} }, m > 9 ? '' : '0', m, ' : ', s > 9 ? '' : '0', s));

    } }]);return Timer;}(React.PureComponent);var


Header = function (_React$PureComponent3) {_inherits(Header, _React$PureComponent3);

  function Header(props) {_classCallCheck(this, Header);var _this6 = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this,
    props));

    _this6.state = {
      score: 0,
      change: 0 };return _this6;

  }_createClass(Header, [{ key: 'getSnapshotBeforeUpdate', value: function getSnapshotBeforeUpdate()








    {
      if (this.change) {
        var node = ReactDOM.findDOMNode(this.change);
        node.className = 'change animated hidden';
      }
    } }, { key: 'componentDidUpdate', value: function componentDidUpdate()

    {var _this7 = this;
      setTimeout(function () {// Timeout is needed for the animation to properly work
        if (_this7.change) {var
          change = _this7.state.change;
          var node = ReactDOM.findDOMNode(_this7.change);
          node.classList.remove('hidden');
          node.className +=
          change > 0 ? ' positive fadeOutUp' : ' negative fadeOutDown';
        }
      }, 0);
    } }, { key: 'format', value: function format(

    score) {
      return score.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
    } }, { key: 'render', value: function render()

    {var _this8 = this;var _props2 =
      this.props,onTimerEnd = _props2.onTimerEnd,endTime = _props2.endTime,_props2$status = _props2.status,multiplier = _props2$status.multiplier,max = _props2$status.max,asked = _props2$status.asked,answered = _props2$status.answered;var _state4 =
      this.state,score = _state4.score,change = _state4.change;
      return (
        React.createElement('div', { className: 'header' },
          React.createElement('div', { className: 'container' },
            React.createElement(Timer, { endTime: endTime, onTimerEnd: onTimerEnd }),
            React.createElement('div', { className: 'status' },
              React.createElement('div', { className: 'status-item max' }, 'up to ', max),
              React.createElement('div', { className: 'status-item rate' }, answered, '/', asked),
              React.createElement('div', { className: 'status-item score' },
                this.format(score),
                multiplier > 1 &&
                React.createElement('div', { className: 'multiplier' }, 'x', multiplier),
                change !== 0 &&
                React.createElement('div', { ref: function ref(_ref3) {return _this8.change = _ref3;}, className: 'change animated' }, change > 0 ? '+' : '', change))))));





    } }], [{ key: 'getDerivedStateFromProps', value: function getDerivedStateFromProps(props, state) {return { score: props.status.score, change: props.status.score - state.score };} }]);return Header;}(React.PureComponent);var


MultipleChoice = function (_React$PureComponent4) {_inherits(MultipleChoice, _React$PureComponent4);function MultipleChoice() {_classCallCheck(this, MultipleChoice);return _possibleConstructorReturn(this, (MultipleChoice.__proto__ || Object.getPrototypeOf(MultipleChoice)).apply(this, arguments));}_createClass(MultipleChoice, [{ key: 'render', value: function render()

    {var _props3 =
      this.props,values = _props3.values,selected = _props3.selected,correct = _props3.correct,_onClick = _props3.onClick;
      return (
        React.createElement('div', { className: 'multiple-choice' },
          values.map(function (res) {return (
              React.createElement('div', { className: 'choice animated ' + (selected === res ? correct ? 'tada positive' : 'negative wobble' : ''), onClick: function onClick() {return _onClick(res);} }, res));})));



    } }]);return MultipleChoice;}(React.PureComponent);var


Badge = function (_React$PureComponent5) {_inherits(Badge, _React$PureComponent5);function Badge() {_classCallCheck(this, Badge);return _possibleConstructorReturn(this, (Badge.__proto__ || Object.getPrototypeOf(Badge)).apply(this, arguments));}_createClass(Badge, [{ key: 'render', value: function render()
    {var
      score = this.props.score;
      return (
        React.createElement('div', { className: 'badge' },
          React.createElement('div', { className: 'score' }, score),
          React.createElement('svg', { viewBox: '0 0 31.531 31.531' },
            React.createElement('g', null,
              React.createElement('g', null,
                React.createElement('path', { fill: '#f5c30e', d: 'M11.872,24.961l-2.539,0.412c-0.711,0.114-1.4-0.058-1.961-0.468c-0.558-0.401-0.94-1.031-1.043-1.72l-0.223-1.482 L1.699,26.11c-0.219,0.219-0.299,0.542-0.207,0.838c0.092,0.296,0.34,0.519,0.645,0.575l2.801,0.523l0.523,2.801 c0.057,0.305,0.278,0.554,0.574,0.646c0.296,0.093,0.62,0.013,0.839-0.208l5.755-5.755l-0.422-0.427 C12.118,25.012,11.996,24.961,11.872,24.961z' }),



                React.createElement('path', { fill: '#34495e', d: 'M19.91,23.932l2.458,0.404c0.411,0.068,0.833-0.031,1.17-0.277c0.336-0.243,0.562-0.614,0.624-1.026l0.37-2.458 c0.075-0.492,0.383-0.917,0.829-1.141l2.224-1.111c0.372-0.188,0.656-0.516,0.784-0.912c0.13-0.396,0.093-0.828-0.098-1.199 L27.129,14c-0.229-0.438-0.229-0.964,0-1.403l1.144-2.211c0.19-0.37,0.227-0.802,0.098-1.199 c-0.129-0.394-0.412-0.723-0.785-0.911l-2.223-1.112c-0.447-0.224-0.754-0.648-0.829-1.14l-0.37-2.458 c-0.062-0.412-0.288-0.782-0.624-1.026c-0.337-0.247-0.759-0.346-1.17-0.279l-2.457,0.405c-0.489,0.082-0.987-0.08-1.335-0.434 l-1.75-1.773C16.544,0.175,16.164,0.012,15.766,0c-0.398,0.013-0.779,0.175-1.061,0.459l-1.75,1.773 c-0.348,0.354-0.846,0.516-1.335,0.434L9.163,2.261C8.751,2.194,8.33,2.293,7.993,2.54C7.657,2.784,7.431,3.154,7.369,3.566 l-0.37,2.458C6.923,6.516,6.617,6.94,6.169,7.164L3.947,8.276C3.574,8.464,3.291,8.793,3.162,9.188 c-0.129,0.396-0.093,0.829,0.097,1.199l1.144,2.211c0.229,0.439,0.229,0.964,0,1.403L3.26,16.211 c-0.19,0.371-0.227,0.803-0.097,1.199c0.128,0.396,0.412,0.725,0.784,0.912l2.224,1.111C6.617,19.657,6.924,20.082,7,20.574 l0.37,2.458c0.062,0.412,0.288,0.783,0.624,1.026c0.337,0.246,0.759,0.346,1.17,0.277l2.458-0.404 c0.489-0.082,0.987,0.08,1.335,0.436l1.75,1.771c0.281,0.285,0.661,0.447,1.059,0.459c0.398-0.012,0.778-0.174,1.059-0.459 l1.75-1.771C18.923,24.012,19.421,23.85,19.91,23.932z M15.766,22.542c-5.205-0.026-9.431-4.266-9.431-9.477 c0-5.21,4.226-9.451,9.431-9.478c5.205,0.026,9.432,4.268,9.432,9.478C25.197,18.276,20.971,22.516,15.766,22.542z' }),













                React.createElement('path', { fill: '#34495e', d: 'M15.766,4.955c-4.444,0.028-8.05,3.648-8.05,8.097c0,4.447,3.606,8.068,8.05,8.096c4.444-0.027,8.05-3.648,8.05-8.096 C23.815,8.604,20.21,4.983,15.766,4.955z' }),

                React.createElement('path', { fill: '#f5c30e', d: 'M29.833,26.11l-4.407-4.407l-0.223,1.482c-0.104,0.688-0.485,1.318-1.043,1.72c-0.562,0.41-1.25,0.582-1.961,0.468 l-2.539-0.412c-0.124,0-0.246,0.051-0.335,0.143l-0.422,0.427l5.755,5.755c0.219,0.221,0.543,0.301,0.839,0.208 c0.296-0.092,0.517-0.341,0.574-0.646l0.522-2.801l2.801-0.523c0.306-0.057,0.554-0.279,0.646-0.575S30.052,26.329,29.833,26.11z' }))))));








    } }]);return Badge;}(React.PureComponent);var


Summary = function (_React$PureComponent6) {_inherits(Summary, _React$PureComponent6);function Summary() {_classCallCheck(this, Summary);return _possibleConstructorReturn(this, (Summary.__proto__ || Object.getPrototypeOf(Summary)).apply(this, arguments));}_createClass(Summary, [{ key: 'componentDidMount', value: function componentDidMount()

    {
      // Hide the summary initially until it's rendered once to skip the initial bounce up animation
      this.mounted = true;
    } }, { key: 'render', value: function render()

    {var _props4 =
      this.props,show = _props4.show,score = _props4.score,onPlayAgain = _props4.onPlayAgain;
      return (
        React.createElement('div', { 'class': 'summary ' + (!this.mounted ? 'hidden' : '') + ' animated ' + (show ? 'bounceInDown' : 'bounceOutUp') },
          React.createElement('div', { className: 'title' },
            React.createElement('div', { className: 'big' }, 'GOOD JOB!'), 'Your Score is:'),


          React.createElement(Badge, { score: score }),
          React.createElement('div', { className: 'button', onClick: onPlayAgain }, 'PLAY AGAIN')));


    } }]);return Summary;}(React.PureComponent);var


Game = function (_React$PureComponent7) {_inherits(Game, _React$PureComponent7);

  function Game(props) {_classCallCheck(this, Game);var _this12 = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this,
    props));_initialiseProps.call(_this12);

    var status = _this12.getInitialStatus();

    _this12.state = {
      status: status,
      selected: -1,
      showSummary: false,
      endTime: Date.now() + TIME * 1000,
      prev: _this12.generateProblem(status.max),
      next: _this12.generateProblem(status.max) };return _this12;

  }_createClass(Game, [{ key: 'getInitialStatus', value: function getInitialStatus()

    {
      return {
        score: 0,
        max: 10,
        asked: 0,
        answered: 0,
        multiplier: 1 };

    } }, { key: 'randomNumber', value: function randomNumber(

    max) {
      return Math.floor(Math.random() * max);
    } }, { key: 'generateProblem', value: function generateProblem(

    max) {
      var a = this.randomNumber(max);
      var b = this.randomNumber(max - a);
      return { a: a, b: b, choices: this.getChoices(a, b, max) };
    } }, { key: 'increaseScore', value: function increaseScore()

    {var
      status = this.state.status;
      var endTime = this.state.endTime;
      var max = status.max;

      // Add time and increase max every 5 correct answers
      if (status.answered % 5 === 4) {
        endTime += 15000;
        max *= 2;
      }

      this.setState({
        endTime: endTime,
        status: _extends({},
        status, {
          multiplier: Math.min(status.multiplier + 1, 5),
          score: status.score + max * status.multiplier,
          asked: status.asked + 1,
          answered: status.answered + 1,
          max: max }) });


    } }, { key: 'decreaseScore', value: function decreaseScore()

    {var
      status = this.state.status;
      this.setState({
        status: _extends({},
        status, {
          multiplier: 1,
          score: Math.max(0, status.score - Math.floor(status.max * 0.25)), // Decrease by MAX * <Correct Answer Probability>
          asked: status.asked + 1 }) });


    } }, { key: 'shuffle', value: function shuffle(

    a) {
      for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));var _ref4 =
        [a[j], a[i]];a[i] = _ref4[0];a[j] = _ref4[1];
      }
      return a;
    } }, { key: 'getChoices', value: function getChoices(

    a, b, max) {
      var result = a + b;
      var choices = [result];

      while (choices.length < 4) {
        var choice = this.randomNumber(max);
        if (!choices.includes(choice)) {
          choices.push(choice);
        }
      }
      return this.shuffle(choices);
    } }, { key: 'render', value: function render()







































    {var _state5 =
      this.state,prev = _state5.prev,next = _state5.next,status = _state5.status,selected = _state5.selected,showSummary = _state5.showSummary,endTime = _state5.endTime;

      return (
        React.createElement('div', { className: 'game-container' },
          React.createElement(Header, { status: status, endTime: endTime, onTimerEnd: this.handleOnTimerEnd }),
          React.createElement('div', { className: 'body' },
            React.createElement(Expression, { from: prev.a + ' + ' + prev.b + ' = ', to: next.a + ' + ' + next.b + ' = ', transitioning: selected !== -1 })),

          React.createElement('div', { className: 'footer' },
            React.createElement('div', { className: 'container' },
              React.createElement(MultipleChoice, { values: prev.choices, selected: selected, onClick: this.handleOnClick, correct: selected === prev.a + prev.b }))),


          React.createElement(Summary, { show: showSummary, score: status.score, onPlayAgain: this.handleOnPlayAgain })));


    } }]);return Game;}(React.PureComponent);var _initialiseProps = function _initialiseProps() {var _this13 = this;this.handleOnClick = function (value) {var _state6 = _this13.state,_state6$prev = _state6.prev,a = _state6$prev.a,b = _state6$prev.b,selected = _state6.selected;if (selected !== -1) return;if (value === a + b) {_this13.increaseScore();} else {_this13.decreaseScore();}_this13.setState({ selected: value });setTimeout(function () {_this13.setState({ prev: _this13.state.next, next: _this13.generateProblem(_this13.state.status.max), selected: -1 });}, 1500);};this.handleOnTimerEnd = function () {_this13.setState({ showSummary: true });};this.handleOnPlayAgain = function () {var status = _this13.getInitialStatus();_this13.setState({ status: status, showSummary: false, endTime: Date.now() + TIME * 1000, prev: _this13.generateProblem(status.max), next: _this13.generateProblem(status.max) });};};


ReactDOM.render(
React.createElement(Game, null),
document.body);