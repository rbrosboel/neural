document.body.classList.add('loaded')

const {
    NeuralNetwork,
    Matrix,
    AsyncRunner,
    NetworkProgress,
} = neural

const pixels = 28

function digitRenderer(id) {
    const rows = 10
    const cols = 16
    let tile = 0

    const canvas = document.getElementById(id)
    const context = canvas.getContext("2d")
    canvas.height = pixels * rows
    canvas.width = pixels * cols
    
    return digit => {
        // Fade all
        context.fillStyle = 'rgba(255, 255, 255, .02)'
        context.fillRect(0, 0, canvas.width, canvas.height)

        // Draw digit
        const y = Math.floor(tile / cols) * pixels
        const x = tile % cols * pixels
        const image = context.getImageData(x, y, pixels, pixels)
        for (let i = 0; i < digit.data.length; i++) {
            const color = digit.data[i] * 255
            image.data[i * 4 + 0] = 0
            image.data[i * 4 + 1] = 0
            image.data[i * 4 + 2] = 0
            image.data[i * 4 + 3] = color
        }
        context.putImageData(image, x, y)

        tile++
        if (tile > rows * cols) {
            tile = 0
        }
    }
}

const renderDigitWrong = digitRenderer('digitWrong')
const renderDigitCorrect = digitRenderer('digitCorrect')
const renderDigit = (digit, correct) => {
    const renderer = correct ? renderDigitCorrect : renderDigitWrong
    renderer(digit)
}

const data = mnist.set(8000, 2000)
data.train = data.training.map(digit => ({
    input: Matrix.fromArray(digit.input),
    target: Matrix.fromArray(digit.output),
}))
data.test = data.test.map(digit => ({
    input: Matrix.fromArray(digit.input),
    target: Matrix.fromArray(digit.output),
}))

const net = new NeuralNetwork({
    activationFunction: 'leaky',
    onEvaluate: (context, sample, activation) => {
        const correct = sample.target.max().row == activation.max().row
        renderDigit(sample.input, correct)
        return correct
    },
})
.addLayer(pixels*pixels)
.addLayer(64)
.addLayer(32)
.addLayer(10)

const runner = new AsyncRunner(net).start()
const progress = new NetworkProgress(net, 'progress')
progress.step()

net.train(data.train, {
    epochs: 0,
    batchSize: 80,
    learningRate: .75,
    onBatch: () => progress.step(),
    onEpoch: () => net.test(data.test, {onComplete: () => progress.step()}),
})
