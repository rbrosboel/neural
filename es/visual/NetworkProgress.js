'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _LineGraph = require('./LineGraph');

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