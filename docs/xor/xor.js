document.body.classList.add('loaded')

const {
    NeuralNetwork,
    Matrix,
    AsyncRunner,
    NetworkProgress,
    NetworkFlowChart,
    TwoInOneOut,
    LineGraph,
} = neural

const data = [
    {input: Matrix.fromArray([0, 0]), target: Matrix.fromArray([0])},
    {input: Matrix.fromArray([1, 1]), target: Matrix.fromArray([0])},
    {input: Matrix.fromArray([1, 0]), target: Matrix.fromArray([1])},
    {input: Matrix.fromArray([0, 1]), target: Matrix.fromArray([1])},
]

const net = new NeuralNetwork({
    activationFunction: 'tanh',
    onEvaluate: (context, sample, activation) => {
        return sample.target.toArray()[0] == Math.round(activation.toArray()[0])
    }
})
.addLayer(2)
.addLayer(2)
.addLayer(1)

const runner = new AsyncRunner(net).start()

const flowChart = new NetworkFlowChart(net, 'flowChart', {verbose: false})
const twoInOneOut = new TwoInOneOut(net, 'twoInOneOut').start()
const progress = new NetworkProgress(net, 'progress')

net.train(data, {
    batchSize: 1,
    progressInterval: 1000,
    learningRate: .1,
    onProgress: () => {
        flowChart.render()
    },
    onEpoch: (context) => {
        net.test(data, {onComplete: context => {
            progress.step()
            context.epochError < .01 && runner.stop()
        }})
    },
})
