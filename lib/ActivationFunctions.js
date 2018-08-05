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
module.exports = exports["default"];