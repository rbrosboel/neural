'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _withCanvas = require('withCanvas');

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
module.exports = exports['default'];