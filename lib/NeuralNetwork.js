'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Matrix = require('./Matrix');

var _Matrix2 = _interopRequireDefault(_Matrix);

var _Layer = require('./Layer');

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
module.exports = exports['default'];