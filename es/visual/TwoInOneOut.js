'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _withCanvas = require('withCanvas');

var _withCanvas2 = _interopRequireDefault(_withCanvas);

var _Matrix = require('../Matrix');

var _Matrix2 = _interopRequireDefault(_Matrix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Render a grid by representing the two inputs as coordinates, and the output
 * as color. Coordinate system is oriented as the HTML system.
 */
var TwoInOneOut = function () {
    function TwoInOneOut(net, container) {
        var _this = this;

        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

        _classCallCheck(this, TwoInOneOut);

        this.options = {
            range: [0, 1],
            outputRange: [0, 1],
            minColor: '0, 0, 0',
            maxColor: '255, 255, 255'
        };

        this.net = net;
        this.steps = 10;
        this.screenSize = 200;
        this.screenStepSize = this.screenSize / this.steps;

        this.props = (0, _withCanvas2.default)(container, this);
        this.start = function () {
            return _this.props.start();
        };
        this.stop = function () {
            return _this.props.stop();
        };
        this.draw = function () {
            return _this.props.draw();
        };
    }

    _createClass(TwoInOneOut, [{
        key: 'init',
        value: function init(_ref) {
            var _this2 = this;

            var map = _ref.map;

            this.input = function (x) {
                return map(x, 0, _this2.steps - 1, _this2.options.range[0], _this2.options.range[1]);
            };
            this.output = function (x) {
                return map(x, _this2.options.outputRange[0], _this2.options.outputRange[1], 0, 1);
            };
            this.screen = function (x) {
                return map(x, 0, _this2.steps, 0, _this2.screenSize);
            };
        }
    }, {
        key: 'render',
        value: function render(_ref2) {
            var canvas = _ref2.canvas,
                context = _ref2.context;

            context.fillStyle = 'rgb(' + this.options.minColor + ')';
            context.fillRect(0, 0, canvas.width, canvas.height);

            for (var y = 0; y < this.steps; y++) {
                for (var x = 0; x < this.steps; x++) {
                    var result = this.net.predict(_Matrix2.default.fromArray([this.input(x), this.input(y)]));
                    var output = this.output(result.toArray()[0]);
                    context.fillStyle = 'rgba(' + this.options.maxColor + ', ' + output + ')';
                    context.fillRect(this.screen(x), this.screen(y), this.screenStepSize, this.screenStepSize);
                }
            }
        }
    }]);

    return TwoInOneOut;
}();

exports.default = TwoInOneOut;