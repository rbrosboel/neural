'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ActivationFunctions = require('./ActivationFunctions');

var _ActivationFunctions2 = _interopRequireDefault(_ActivationFunctions);

var _Matrix = require('./Matrix');

var _Matrix2 = _interopRequireDefault(_Matrix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Fully connected layer
 *
 * Forward/backward propagation
 */
var Layer = function () {
    function Layer(previous, size, options) {
        var _ref;

        _classCallCheck(this, Layer);

        var previousSize = previous ? previous.size : 1;
        this.options = _extends({
            activationFunction: 'tanh',
            weightRange: [-Math.sqrt(1.55 / previousSize), Math.sqrt(1.55 / previousSize)]
        }, options);
        this.size = size;
        this.weight = (_ref = new _Matrix2.default(size, previousSize)).random.apply(_ref, _toConsumableArray(this.options.weightRange));
        this.weightTransposed = this.weight.transpose();
        // this.bias = new Matrix(size, 1)
        this.bias = new _Matrix2.default(size, 1);
        this.clear();
    }

    _createClass(Layer, [{
        key: 'clear',
        value: function clear() {
            this.output = 0;
            this.activation = 0;
            this.error = 0;
            this.derivative = 0;
            this.gradientCount = 0;
            this.weightGradientSum = new _Matrix2.default(this.weight.rows, this.weight.cols);
            this.biasGradientSum = new _Matrix2.default(this.bias.rows, this.bias.cols);
            this.activationFunctions = _ActivationFunctions2.default[this.options.activationFunction];
            return this;
        }
    }, {
        key: 'save',
        value: function save() {
            var data = {
                size: this.size,
                options: this.options,
                weight: this.weight.save(),
                bias: this.bias.save()
            };
            return data;
        }
    }, {
        key: 'feedforward',
        value: function feedforward(input, previous, next) {
            var context = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

            if (!previous) {
                this.output = input;
                this.activation = input;
            } else {
                this.output = this.weight.product(input).add(this.bias);
                this.activation = this.output.map(this.activationFunctions.x);
            }
            return this.activation;
        }
    }, {
        key: 'backpropagate',
        value: function backpropagate(derivative, previous, next) {
            var context = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

            if (!previous) {
                return derivative;
            }

            if (this.activationFunctions.z) {
                this.derivative = derivative.multiply(this.output.map(this.activationFunctions.z));
            } else {
                this.derivative = derivative.multiply(this.activation.map(this.activationFunctions.y));
            }

            var gradient = this.derivative.multiply(-context.learningRate);
            var weightGradient = gradient.product(previous.activation.transpose());

            this.gradientCount++;
            this.weightGradientSum = this.weightGradientSum.add(weightGradient);
            this.biasGradientSum = this.biasGradientSum.add(gradient);

            // Distribute error to previous layer
            return this.weightTransposed.product(this.derivative);
        }
    }, {
        key: 'adjust',
        value: function adjust(previous, next) {
            var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

            if (!previous) {
                return;
            }

            var avg = void 0;

            avg = this.weightGradientSum.multiply(1 / this.gradientCount);
            this.weight = this.weight.add(avg);
            this.weightTransposed = this.weight.transpose();

            avg = this.biasGradientSum.multiply(1 / this.gradientCount);
            this.bias = this.bias.add(avg);

            this.clear();
        }
    }], [{
        key: 'load',
        value: function load(data) {
            if (data instanceof Layer) {
                return data;
            }
            var layer = new Layer(null, data.size, data.options);
            layer.size = data.size;
            layer.weight = _Matrix2.default.load(data.weight);
            layer.weightTransposed = layer.weight.transpose();
            layer.bias = _Matrix2.default.load(data.bias);
            layer.options = data.options;
            layer.clear();
            return layer;
        }
    }]);

    return Layer;
}();

exports.default = Layer;