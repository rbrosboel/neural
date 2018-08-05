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
module.exports = exports["default"];