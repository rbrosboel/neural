'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mermaid = require('mermaid');

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
module.exports = exports['default'];