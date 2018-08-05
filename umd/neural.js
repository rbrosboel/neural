/*!
 * neural v1.0.0
 * MIT Licensed
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("mermaid"));
	else if(typeof define === 'function' && define.amd)
		define(["mermaid"], factory);
	else if(typeof exports === 'object')
		exports["neural"] = factory(require("mermaid"));
	else
		root["neural"] = factory(root["mermaid"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_11__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Matrix = function () {
    function Matrix(rows, cols) {
        var _this = this;

        var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

        _classCallCheck(this, Matrix);

        this.rows = rows;
        this.cols = cols;
        this.data = data || [].concat(_toConsumableArray(Array(rows))).map(function (_) {
            return [].concat(_toConsumableArray(Array(cols))).map(function (_) {
                return 0;
            });
        });

        var instanceMethods = ['map', 'mapTwo', 'each', 'reduce', 'add', 'subtract', 'multiply', 'transpose', 'product', 'random', 'max', 'toArray', 'toString', 'p'].forEach(function (p) {
            return _this[p] = Matrix[p].bind(null, _this);
        });
    }

    _createClass(Matrix, [{
        key: 'save',
        value: function save() {
            return {
                rows: this.rows,
                cols: this.cols,
                data: this.data
            };
        }
    }], [{
        key: 'load',
        value: function load(data) {
            if (data instanceof Matrix) {
                return data;
            }
            return new Matrix(data.rows, data.cols, data.data);
        }
    }, {
        key: 'fromArray',
        value: function fromArray(a) {
            var rows = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var cols = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

            rows = rows || a.length;
            if (rows * cols != a.length) {
                throw new Error('Invalid number of values: rows * cols != array.length');
            }
            return new Matrix(rows, cols).map(function (v, row, col) {
                return a[row * cols + col % cols];
            });
        }
    }, {
        key: 'toArray',
        value: function toArray(x) {
            return x.data.reduce(function (c, row) {
                return c.concat(row);
            }, []);
        }
    }, {
        key: 'map',
        value: function map(x, f) {
            var y = new Matrix(x.rows, x.cols);
            for (var row = 0; row < x.rows; row++) {
                for (var col = 0; col < x.cols; col++) {
                    y.data[row][col] = f(x.data[row][col], row, col);
                }
            }
            return y;
        }
    }, {
        key: 'mapTwo',
        value: function mapTwo(x1, x2, f) {
            if (x2 instanceof Matrix && (x1.rows != x2.rows || x1.cols != x2.cols)) {
                throw new Error('Shapes must be identical');
            }

            return x1.map(function (v1, row, col) {
                if (x2 instanceof Matrix) {
                    return f(v1, x2.data[row][col], row, col);
                } else {
                    return f(v1, x2, row, col);
                }
            });
        }
    }, {
        key: 'each',
        value: function each(x, f) {
            for (var row = 0; row < x.rows; row++) {
                for (var col = 0; col < x.cols; col++) {
                    f(x.data[row][col], row, col);
                }
            }
            return x;
        }
    }, {
        key: 'reduce',
        value: function reduce(x, f, carry) {
            Matrix.each(x, function (v, row, col) {
                return carry = f(carry, v, row, col);
            });
            return carry;
        }
    }, {
        key: 'add',
        value: function add(x1, x2) {
            return Matrix.mapTwo(x1, x2, function (v1, v2) {
                return v1 + v2;
            });
        }
    }, {
        key: 'subtract',
        value: function subtract(x1, x2) {
            return Matrix.mapTwo(x1, x2, function (v1, v2) {
                return v1 - v2;
            });
        }
    }, {
        key: 'multiply',
        value: function multiply(x1, x2) {
            return Matrix.mapTwo(x1, x2, function (v1, v2) {
                return v1 * v2;
            });
        }
    }, {
        key: 'transpose',
        value: function transpose(x) {
            var y = new Matrix(x.cols, x.rows);
            x.each(function (v, row, col) {
                return y.data[col][row] = v;
            });
            return y;
        }
    }, {
        key: 'product',
        value: function product(x1, x2) {
            if (x1.cols != x2.rows) {
                throw new Error('Columns in x1 must match rows in x2');
            }

            var y = new Matrix(x1.rows, x2.cols);
            y.each(function (_, row, col) {
                var sum = 0;
                for (var i = 0; i < x1.cols; i++) {
                    sum += x1.data[row][i] * x2.data[i][col];
                }
                y.data[row][col] = sum;
            });
            return y;
        }
    }, {
        key: 'random',
        value: function random(x) {
            var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

            return x.map(function () {
                return min + Math.random() * (max - min);
            });
        }
    }, {
        key: 'max',
        value: function max(x) {
            return x.reduce(function (c, value, row, col) {
                return !c || value > c.value ? { value: value, row: row, col: col } : c;
            }, null);
        }
    }, {
        key: 'toString',
        value: function toString(x) {
            var str = '      ' + [].concat(_toConsumableArray(Array(x.cols))).map(function (_, i) {
                return i.toString().padEnd(9);
            }).join('') + '\n';
            str += x.data.map(function (row, i) {
                return i.toString().padStart(3) + row.map(function (col) {
                    return col.toFixed(4).padStart(9);
                }).join('');
            }).join('\n');
            return str;
        }
    }, {
        key: 'p',
        value: function p(x) {
            var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            if (name) {
                console.log(Matrix.toString(x), name);
            } else {
                console.log(Matrix.toString(x));
            }
            return x;
        }
    }]);

    return Matrix;
}();

exports.default = Matrix;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Activation functions and their derivatives
 * 
 * x: f(x)
 * y: f'(f(x))
 * z: f'(x)
 * 
 * https://en.wikipedia.org/wiki/Activation_function
 */
var ActivationFunctions = function () {
    function ActivationFunctions() {
        _classCallCheck(this, ActivationFunctions);
    }

    _createClass(ActivationFunctions, null, [{
        key: "identity",
        get: function get() {
            return {
                x: function x(_x) {
                    return _x;
                },
                y: function y(_y) {
                    return 1;
                }
            };
        }
    }, {
        key: "sigmoid",
        get: function get() {
            return {
                x: function x(_x2) {
                    return 1 / (1 + Math.exp(-_x2));
                },
                y: function y(_y2) {
                    return _y2 * (1 - _y2);
                }
            };
        }
    }, {
        key: "tanh",
        get: function get() {
            return {
                x: function x(_x3) {
                    return Math.tanh(_x3);
                },
                y: function y(_y3) {
                    return 1 - _y3 * _y3;
                }
            };
        }
    }, {
        key: "relu",
        get: function get() {
            return {
                x: function x(_x4) {
                    return _x4 < 0 ? 0 : _x4;
                },
                y: function y(_y4) {
                    return _y4 > 0 ? 1 : 0;
                }
            };
        }
    }, {
        key: "leaky",
        get: function get() {
            return {
                x: function x(_x5) {
                    return _x5 < 0 ? 0.01 * _x5 : _x5;
                },
                y: function y(_y5) {
                    return _y5 > 0 ? 1 : 0.01;
                }
            };
        }
    }, {
        key: "softplus",
        get: function get() {
            return {
                x: function x(_x6) {
                    return Math.log(1 + Math.exp(_x6));
                },
                z: function z(_z) {
                    return 1 / (1 + Math.exp(-_z));
                }
            };
        }
    }, {
        key: "sinusoid",
        get: function get() {
            return {
                x: function x(_x7) {
                    return Math.sin(_x7);
                },
                z: function z(_z2) {
                    return Math.cos(_z2);
                }
            };
        }
    }, {
        key: "sinc",
        get: function get() {
            return {
                x: function x(_x8) {
                    return _x8 === 0 ? 1 : Math.sin(_x8) / _x8;
                },
                z: function z(_z3) {
                    return _z3 === 0 ? 0 : Math.cos(_z3) / _z3 - Math.sin(_z3) / (_z3 * _z3);
                }
            };
        }
    }]);

    return ActivationFunctions;
}();

exports.default = ActivationFunctions;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ActivationFunctions = __webpack_require__(1);

var _ActivationFunctions2 = _interopRequireDefault(_ActivationFunctions);

var _Matrix = __webpack_require__(0);

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

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _withCanvas = __webpack_require__(4);

var _withCanvas2 = _interopRequireDefault(_withCanvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LineGraph = function () {
    function LineGraph(container) {
        var _this = this;

        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        _classCallCheck(this, LineGraph);

        this.options = _extends({
            gridInterval: .1,
            maxScaleX: 3,
            max: 1,
            autoMax: true
        }, options);

        this.max = this.options.max;
        this.series = {};

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

    _createClass(LineGraph, [{
        key: 'addSerie',
        value: function addSerie(name) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            this.props.context.font = '13px sans-serif';
            var labelWidth = this.props.context.measureText(name).width;
            var serie = _extends({
                name: name,
                data: [],
                color: '0, 0, 0',
                labelWidth: labelWidth
            }, this.options, options);
            this.series[name] = serie;
            return this;
        }
    }, {
        key: 'addDatapoint',
        value: function addDatapoint(datapoint) {
            var serieName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'default';

            if (this.options.autoMax) {
                this.max = Math.max(this.max, datapoint);
            }

            if (!this.series[serieName]) {
                this.addSerie(serieName);
            }
            var serie = this.series[serieName];
            serie.data.push(datapoint);
            var width = this.props.canvas.width;
            var scaleX = Math.max(width, serie.data.length) / width;
            if (scaleX > this.options.maxScaleX) {
                serie.data.shift();
            }
        }
    }, {
        key: 'mouseWheel',
        value: function mouseWheel(_ref) {
            var event = _ref.event;

            event.preventDefault();
            var scale = event.deltaY > 0 ? 1.1 : .9;
            this.max = Math.max(this.max * scale, .1);
            this.draw();
        }
    }, {
        key: 'render',
        value: function render(_ref2) {
            var canvas = _ref2.canvas,
                context = _ref2.context,
                map = _ref2.map;

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.font = '13px sans-serif';
            var valueWidth = context.measureText('000.0000').width;

            // Grid lines
            if (this.max != 0) {
                var gridLineInterval = Math.max(Math.round(this.max) / 20, .05);
                var gridLines = this.max / gridLineInterval;
                context.strokeStyle = '#eee';
                context.fillStyle = '#ccc';
                context.beginPath();
                for (var i = 0; i <= gridLines; i++) {
                    var y = map(i * gridLineInterval, 0, this.max, canvas.height - 1, 0);
                    context.moveTo(0, y);

                    if (i > 0 && i < gridLines) {
                        var label = (i * gridLineInterval).toFixed(2);
                        var labelWidth = context.measureText(label).width;
                        var labelX = canvas.width / 2 - labelWidth / 2;
                        var labelY = y + 4;
                        context.clearRect(labelX, y - 1, labelWidth, 2);
                        context.fillText(label, labelX, labelY);

                        context.lineTo(labelX - 4, y);
                        context.moveTo(labelX + labelWidth + 4, y);
                    }

                    context.lineTo(canvas.width, y);
                }
                context.stroke();
            }

            var lineWidth = 50;
            var labelHeight = 18;
            var serieIndex = 0;

            context.fillStyle = '#000';
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Object.keys(this.series)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var serieName = _step.value;

                    var serie = this.series[serieName];

                    var labelPos = {
                        x: canvas.width - serie.labelWidth - 4 - valueWidth - 4 - lineWidth - 16,
                        y: 24 + labelHeight * serieIndex
                    };
                    var valuePos = {
                        x: canvas.width - valueWidth - 4 - lineWidth - 16,
                        y: labelPos.y
                    };
                    var linePos = {
                        x: canvas.width - lineWidth - 16,
                        y: labelPos.y - 6
                    };

                    context.fillText(serie.name, labelPos.x, labelPos.y - 1);
                    if (serie.data.length) {
                        context.fillText(serie.data[serie.data.length - 1].toFixed(4).padStart(8), valuePos.x, valuePos.y - 1);
                    }

                    context.strokeStyle = 'rgb(' + serie.color + ')';
                    context.beginPath();
                    context.moveTo(linePos.x, linePos.y);
                    context.lineTo(linePos.x + lineWidth, linePos.y);
                    context.moveTo(0, 0);
                    for (var _i = 0; _i < serie.data.length; _i++) {
                        var x = map(_i, 0, Math.max(serie.data.length, canvas.width - 1), 0, canvas.width - 1);
                        var _y = map(serie.data[_i], 0, this.max, canvas.height - 1, 0);
                        context.lineTo(x, _y);
                    }
                    context.stroke();

                    serieIndex++;
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }]);

    return LineGraph;
}();

exports.default = LineGraph;

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["default"] = withCanvas;
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function withCanvas(id) {
    var scene = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var container = document.getElementById(id);
    if (!container) {
        throw new Error('Unknown element #' + id);
    }
    var canvas = document.createElement('canvas');
    var context = canvas.getContext("2d");
    var props = void 0;
    var animationFrame = void 0;

    function resize() {
        var _scene$options = scene.options,
            height = _scene$options.height,
            width = _scene$options.width;


        canvas.height = height || container.offsetHeight;
        canvas.width = width || container.offsetWidth;
        return props;
    }

    function draw(ms) {
        ms = ms || performance.now();

        props.delta = props.time ? ms - props.time : 0;
        props.time = ms;

        scene.render && scene.render(props);

        props.running && window.requestAnimationFrame(draw);
        return props;
    }

    function start() {
        props.running = true;
        animationFrame = window.requestAnimationFrame(draw);
        return props;
    }

    function stop() {
        props.running = false;
        window.cancelAnimationFrame(animationFrame);
        return props;
    }

    function constrain(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    function map(value, minIn, maxIn, minOut, maxOut) {
        return (value - minIn) / (maxIn - minIn) * (maxOut - minOut) + minOut;
    }

    function eventHandler(name) {
        return function (event) {
            return scene[name] && scene[name](_extends({}, props, { event: event }));
        };
    }

    document.addEventListener('resize', function (event) {
        resize();scene.resize && scene.resize(_extends({}, props, { event: event }));
    });
    document.addEventListener('keydown', eventHandler('keyDown'));
    document.addEventListener('keyup', eventHandler('keyUp'));
    canvas.addEventListener('mousedown', eventHandler('mouseDown'));
    canvas.addEventListener('mouseup', eventHandler('mouseUp'));
    canvas.addEventListener('mousemove', eventHandler('mouseMove'));
    canvas.addEventListener('mousewheel', eventHandler('mouseWheel'));

    props = {
        scene: scene,
        container: container,
        canvas: canvas,
        context: context,
        draw: draw,
        start: start,
        stop: stop,
        constrain: constrain,
        map: map
    };

    resize();
    scene.init && scene.init(props);
    draw();

    container.appendChild(canvas);

    return props;
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(6);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ActivationFunctions = __webpack_require__(1);

var _ActivationFunctions2 = _interopRequireDefault(_ActivationFunctions);

var _AsyncRunner = __webpack_require__(7);

var _AsyncRunner2 = _interopRequireDefault(_AsyncRunner);

var _Layer = __webpack_require__(2);

var _Layer2 = _interopRequireDefault(_Layer);

var _Matrix = __webpack_require__(0);

var _Matrix2 = _interopRequireDefault(_Matrix);

var _NeuralNetwork = __webpack_require__(8);

var _NeuralNetwork2 = _interopRequireDefault(_NeuralNetwork);

var _LineGraph = __webpack_require__(3);

var _LineGraph2 = _interopRequireDefault(_LineGraph);

var _NetworkProgress = __webpack_require__(9);

var _NetworkProgress2 = _interopRequireDefault(_NetworkProgress);

var _NetworkFlowChart = __webpack_require__(10);

var _NetworkFlowChart2 = _interopRequireDefault(_NetworkFlowChart);

var _TwoInOneOut = __webpack_require__(12);

var _TwoInOneOut2 = _interopRequireDefault(_TwoInOneOut);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Visuals
exports.default = {
    // Core
    ActivationFunctions: _ActivationFunctions2.default,
    AsyncRunner: _AsyncRunner2.default,
    Layer: _Layer2.default,
    Matrix: _Matrix2.default,
    NeuralNetwork: _NeuralNetwork2.default,

    // Visuals
    LineGraph: _LineGraph2.default,
    NetworkProgress: _NetworkProgress2.default,
    NetworkFlowChart: _NetworkFlowChart2.default,
    TwoInOneOut: _TwoInOneOut2.default
}; // Core

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Run neural network via browser's requestAnimationFrame and attempt to stay
 * responsive.
 */
var AsyncRunner = function () {
    function AsyncRunner(net, options) {
        _classCallCheck(this, AsyncRunner);

        this.net = net;
        net.options.auto = false;
        this.options = _extends({
            fps: 30,
            progressInterval: 1000
        }, options);

        this.frameInterval = 1000 / this.options.fps;
        this.iterations = 1;
        this.loopTimeStart = 0;
        this.loopTimeLast = 0;
        this.loopStep = this.loopStep.bind(this);
    }

    _createClass(AsyncRunner, [{
        key: "start",
        value: function start() {
            this.running = true;
            this.loopStep();
            return this;
        }
    }, {
        key: "stop",
        value: function stop() {
            this.running = false;
            return this;
        }
    }, {
        key: "loopStep",
        value: function loopStep(now) {
            this.now = now;
            if (!this.loopTimeStart) {
                this.loopTimeStart = now;
                this.loopTimeLast = now;
            }
            var delta = now - this.loopTimeLast;
            var net = this.net;

            if (this.net.canStep()) {
                this.iterations *= delta < this.frameInterval ? 1.1 : 0.9;
                this.iterations = Math.max(1, this.iterations);
                var i = Math.floor(this.iterations);
                while (i-- && net.step()) {}

                this.loopProgress(net.training, now, delta);
                this.loopProgress(net.testing, now, delta);
            }

            this.loopTimeLast = now;
            if (this.running) {
                window.requestAnimationFrame(this.loopStep);
            }
        }
    }, {
        key: "loopProgress",
        value: function loopProgress(context) {
            if (this.net.canStepContext(context) && this.now > (context.progressDeadline || 0)) {
                context.progressDeadline = this.now + context.progressInterval;
                context.onProgress && context.onProgress(context);
            }
        }
    }]);

    return AsyncRunner;
}();

exports.default = AsyncRunner;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Matrix = __webpack_require__(0);

var _Matrix2 = _interopRequireDefault(_Matrix);

var _Layer = __webpack_require__(2);

var _Layer2 = _interopRequireDefault(_Layer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NeuralNetwork = function () {
    function NeuralNetwork(options) {
        _classCallCheck(this, NeuralNetwork);

        this.options = _extends({
            epochs: 0,
            batchSize: 0,
            learningRate: .03,
            auto: true
        }, options);
        this.training = {};
        this.testing = {};
        this.layers = [];
        this.layers.map(function (layer) {
            return layer.clear();
        });
    }

    _createClass(NeuralNetwork, [{
        key: 'save',
        value: function save() {
            return {
                options: this.options,
                layers: this.layers.map(function (layer) {
                    return layer.save();
                })
            };
        }
    }, {
        key: 'addLayer',
        value: function addLayer(size) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            options = _extends({}, this.options, options);
            var previous = this.layers.length ? this.layers[this.layers.length - 1] : null;
            var layer = new _Layer2.default(previous, size, options);
            this.layers.push(layer);
            return this;
        }
    }, {
        key: 'getLayers',
        value: function getLayers(i) {
            return {
                previous: i > 0 ? this.layers[i - 1] : null,
                current: this.layers[i],
                next: i < this.layers.length - 1 ? this.layers[i + 1] : null
            };
        }
    }, {
        key: 'predict',
        value: function predict(input) {
            return this.feedforward(input);
        }
    }, {
        key: 'train',
        value: function train(samples) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            this.startContext(this.training, samples, _extends({
                backpropagate: true
            }, options));

            if (this.training.auto) {
                while (!this.stepContext(this.training).endOfContext) {}
            }
            return this;
        }
    }, {
        key: 'test',
        value: function test(samples) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            this.startContext(this.testing, samples, _extends({
                epochs: 1,
                backpropagate: false
            }, options));

            if (this.testing.auto) {
                while (!this.stepContext(this.testing).endOfContext) {}
            }
            return this;
        }
    }, {
        key: 'step',
        value: function step() {
            if (this.canStepContext(this.testing)) {
                this.stepContext(this.testing);
            } else if (this.canStepContext(this.training)) {
                this.stepContext(this.training);
            }

            return this.canStep();
        }
    }, {
        key: 'startContext',
        value: function startContext(context, samples) {
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

            options = _extends({}, this.options, options);

            Object.assign(context, options);

            context.ready = true;
            context.sample = 0;
            context.sampleCount = samples.length;
            context.samples = samples.sort(function () {
                return .5 - Math.random();
            });
            context.evaluation = 0;
            context.batchSize = options.batchSize || context.samples.length;
            context.batch = 0;
            context.batchEvaluation = 0;
            context.batchError = 0;
            context.batchErrorSum = null;
            context.batchAccuracy = 0;
            context.batchAccuracyCount = 0;
            context.epoch = 0;
            context.epochEvaluation = 0;
            context.epochError = 0;
            context.epochErrorSum = null;
            context.epochAccuracy = 0;
            context.epochAccuracyCount = 0;
            context.endOfBatch = false;
            context.endOfEpoch = false;
            context.endOfContext = false;

            context.onStart && context.onStart(context);
        }
    }, {
        key: 'stepContext',
        value: function stepContext(context) {
            if (this.canStepContext(context)) {
                var sample = context.samples[context.sample];
                var activation = this.feedforward(sample.input, context);
                var error = sample.target.subtract(activation).map(function (v) {
                    return v * v;
                });
                var derivative = null;
                if (context.backpropagate) {
                    derivative = activation.subtract(sample.target);
                    this.backpropagate(derivative, context);
                }

                if (context.onEvaluate) {
                    var correct = context.onEvaluate(context, sample, activation, error, derivative);
                    context.batchAccuracyCount += correct;
                    context.epochAccuracyCount += correct;
                }

                context.sample++;
                context.evaluation++;
                context.batchEvaluation++;
                context.epochEvaluation++;
                context.batchErrorSum = context.batchErrorSum ? context.batchErrorSum.add(error) : error;
                context.epochErrorSum = context.epochErrorSum ? context.epochErrorSum.add(error) : error;

                context.endOfEpoch = context.sample === context.sampleCount;
                context.endOfBatch = context.endOfEpoch || context.sample % context.batchSize === 0;
                context.endOfContext = context.endOfEpoch && context.epochs != 0 && context.epoch === context.epochs - 1;

                if (context.endOfBatch) {
                    if (context.backpropagate) {
                        this.adjust(context);
                    }

                    context.batchError = context.batchErrorSum.reduce(function (c, v) {
                        return c + v / context.batchEvaluation;
                    }, 0);
                    context.batchAccuracy = context.batchAccuracyCount / context.batchEvaluation;

                    context.onBatch && context.onBatch(context);

                    context.batch++;
                    context.batchEvaluation = 0;
                    context.batchErrorSum = 0;
                    context.batchAccuracyCount = 0;
                }

                if (context.endOfEpoch) {
                    context.epochError = context.epochErrorSum.reduce(function (c, v) {
                        return c + v / context.epochEvaluation;
                    }, 0);
                    context.epochAccuracy = context.epochAccuracyCount / context.epochEvaluation;

                    context.onEpoch && context.onEpoch(context);

                    context.epoch++;
                    context.epochEvaluation = 0;
                    context.epochErrorSum = 0;
                    context.epochAccuracyCount = 0;

                    context.sample = 0;
                    context.samples.sort(function () {
                        return .5 - Math.random();
                    });
                }

                if (context.endOfContext) {
                    context.onComplete && context.onComplete(context);
                }
            }

            return context;
        }
    }, {
        key: 'canStep',
        value: function canStep() {
            return this.canStepContext(this.training) || this.canStepContext(this.testing);
        }
    }, {
        key: 'canStepContext',
        value: function canStepContext(context) {
            return context.ready && !context.endOfContext;
        }
    }, {
        key: 'feedforward',
        value: function feedforward(input) {
            var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            var activation = input;
            for (var i = 0; i < this.layers.length; i++) {
                var _getLayers = this.getLayers(i),
                    previous = _getLayers.previous,
                    current = _getLayers.current,
                    next = _getLayers.next;

                activation = current.feedforward(activation, previous, next, context);
            }
            return activation;
        }
    }, {
        key: 'backpropagate',
        value: function backpropagate(derivative) {
            var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            for (var i = this.layers.length - 1; i >= 0; i--) {
                var _getLayers2 = this.getLayers(i),
                    previous = _getLayers2.previous,
                    current = _getLayers2.current,
                    next = _getLayers2.next;

                derivative = current.backpropagate(derivative, previous, next, context);
            }
            return derivative;
        }
    }, {
        key: 'adjust',
        value: function adjust() {
            var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            for (var i = 0; i < this.layers.length; i++) {
                var _getLayers3 = this.getLayers(i),
                    previous = _getLayers3.previous,
                    current = _getLayers3.current,
                    next = _getLayers3.next;

                current.adjust(previous, next, context);
            }
        }
    }], [{
        key: 'load',
        value: function load(data) {
            var net = new NeuralNetwork(data.options);
            net.layers = data.layers.map(function (layer) {
                return _Layer2.default.load(layer);
            });
            return net;
        }
    }]);

    return NeuralNetwork;
}();

exports.default = NeuralNetwork;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _LineGraph = __webpack_require__(3);

var _LineGraph2 = _interopRequireDefault(_LineGraph);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NetworkProgress = function () {
    function NetworkProgress(net, container) {
        _classCallCheck(this, NetworkProgress);

        this.net = net;
        this.container = document.getElementById(container);

        this.statsContainer = document.createElement('div');
        this.statsContainer.id = container + '-stats';
        this.container.appendChild(this.statsContainer);

        this.graphContainer = document.createElement('div');
        this.graphContainer.id = container + '-graph';
        this.container.appendChild(this.graphContainer);

        this.graph = new _LineGraph2.default(this.graphContainer.id).addSerie('Train batch cost', { color: '150, 150, 150' }).addSerie('Train batch error', { color: '150, 150, 255' }).addSerie('Train epoch cost', { color: '0, 0, 0' }).addSerie('Train epoch error', { color: '0, 0, 255' }).addSerie('Test epoch cost', { color: '255, 0, 0' }).addSerie('Test epoch error', { color: '0, 175, 0' });
    }

    _createClass(NetworkProgress, [{
        key: 'step',
        value: function step() {
            var graph = this.graph;
            var _net = this.net,
                training = _net.training,
                testing = _net.testing;


            var format = function format(v) {
                var d = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;
                return (v || 0).toFixed(d);
            };

            var epoch = format(training.evaluation / training.sampleCount, 2);
            var batch = format(training.evaluation / training.batchSize, 0);
            var evaluation = format(training.evaluation, 0);
            var trainingAccuracy = format(training.epochAccuracy);
            var testingAccuracy = format(testing.epochAccuracy);

            this.statsContainer.innerHTML = '\n            <ul>\n                <li class="stat training epoch"><div class="name">Epoch</div><div class="value">' + epoch + '</div></li>\n                <li class="stat training batch"><div class="name">Batch</div><div class="value">' + batch + '</div></li>\n                <li class="stat training evaluation"><div class="name">Evaluation</div><div class="value">' + evaluation + '</div></li>\n                <li class="stat training accuracy"><div class="name">Training accuracy</div><div class="value">' + trainingAccuracy + '</div></li>\n                <li class="stat testing accuracy"><div class="name">Testing accuracy</div><div class="value">' + testingAccuracy + '</div></li>\n            </ul>\n        ';

            if (training.ready) {
                graph.addDatapoint(training.batchError, 'Train batch cost');
                graph.addDatapoint(1 - training.batchAccuracy, 'Train batch error');
                if (training.epochError) {
                    graph.addDatapoint(training.epochError, 'Train epoch cost');
                    graph.addDatapoint(1 - training.epochAccuracy, 'Train epoch error');
                }
            }

            if (testing.ready) {
                if (testing.epochError) {
                    graph.addDatapoint(testing.epochError, 'Test epoch cost');
                    graph.addDatapoint(1 - testing.epochAccuracy, 'Test epoch error');
                }
            }

            if (!graph.props.running) {
                graph.draw();
            }
        }
    }]);

    return NetworkProgress;
}();

exports.default = NetworkProgress;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mermaid = __webpack_require__(11);

var _mermaid2 = _interopRequireDefault(_mermaid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Renders a NeuralNetwork as a mermaid flowchart.
 */
var NetworkFlowChart = function () {
    function NetworkFlowChart(net) {
        var container = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

        _classCallCheck(this, NetworkFlowChart);

        this.options = _extends({
            verbose: false
        }, options);
        this.container = container && document.getElementById(container);
        this.net = net;
    }

    _createClass(NetworkFlowChart, [{
        key: 'render',
        value: function render() {
            var _this = this;

            this.container.innerHTML = '';
            this.renderSvg(function (svg) {
                _this.container.innerHTML = svg;
            });
        }
    }, {
        key: 'renderSvg',
        value: function renderSvg(callback) {
            if (!_mermaid2.default) {
                throw new Error('Load mermaid to use NetworkGraphVisual');
            }

            var hex2 = function hex2(x) {
                return (Math.round(x) < 16 ? '0' : '') + Math.round(x).toString(16).substr(-2);
            };
            var color = function color(x) {
                return '#' + (Math.abs(x) < .1 ? 'bbbbbb' : x < 0 ? 'bb5555' : '55bb55') + hex2(Math.min(Math.abs(x * 100), 200) + 55);
            };
            var width = function width(x) {
                return Math.min(Math.max(1, Math.abs(x * 5)), 15);
            };
            var number = function number(x) {
                var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '&nbsp;';
                return (x < 0 ? '' : prefix) + x.toFixed(4);
            };
            var links = 0;
            var g = ['graph LR'];
            for (var layer = 0; layer < this.net.layers.length; layer++) {
                var _net$getLayers = this.net.getLayers(layer),
                    previous = _net$getLayers.previous,
                    current = _net$getLayers.current,
                    next = _net$getLayers.next;

                var previousSize = previous ? previous.size : current.size;
                for (var input = 0; input < previousSize; input++) {
                    if (!previous) {
                        var x = current.activation ? current.activation.data[input][0] : 0;
                        g.push(layer + '' + input + '[">:' + number(x) + '"]');
                        g.push('style ' + layer + '' + input + ' fill:' + color(x) + ',stroke:' + color(x));
                    } else {
                        for (var output = 0; output < current.size; output++) {
                            var w = current.weight.data[output][input];
                            var b = current.bias.data[output][0];
                            var gw = current.gradientCount ? current.weightGradientSum.data[output][input] : 0;
                            var gb = current.gradientCount ? current.biasGradientSum.data[output][0] : 0;
                            var o = current.output ? current.output.data[output][0] : 0;
                            var a = current.activation ? current.activation.data[output][0] : 0;
                            var e = current.error ? current.error.data[output][0] : 0;
                            var d = current.derivative ? current.derivative.data[output][0] : 0;

                            var edge = number(w, ' ');
                            var node = number(b);

                            if (this.options.verbose) {
                                edge = 'W:' + number(w, ' ') + '<br>' + '^:' + number(gw, ' ');
                                node = '<br>' + '<br>' + 'B:' + number(b) + '<br>' + '^:' + number(gb) + '<br><br>' + 'O:' + number(o) + '<br>' + '>:' + number(a) + '<br><br>' + 'E:' + number(e) + '<br>' + '<:' + number(d);
                            }

                            g.push(layer - 1 + '' + input + ' ---|"' + edge + '"| ' + layer + '' + output + '(("' + node + '"))');
                            g.push('style ' + layer + '' + output + ' fill:' + color(a) + ',stroke:' + color(b) + ',stroke-width:' + width(b));
                            g.push('linkStyle ' + links++ + ' stroke:' + color(w) + ',stroke-width:' + width(w));
                        }
                    }

                    g.push('');
                }
            }

            _mermaid2.default.mermaidAPI.render('flowChart-svg', g.join('\n'), function (svg) {
                svg = svg.replace('</style><g', '</style><style>#flowchart-svg .label{font-family: monospace;}</style><g');
                callback && callback(svg);
            });
        }
    }]);

    return NetworkFlowChart;
}();

exports.default = NetworkFlowChart;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_11__;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _withCanvas = __webpack_require__(4);

var _withCanvas2 = _interopRequireDefault(_withCanvas);

var _Matrix = __webpack_require__(0);

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

/***/ })
/******/ ])["default"];
});