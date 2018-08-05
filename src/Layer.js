import ActivationFunctions from './ActivationFunctions'
import Matrix from './Matrix'

/**
 * Fully connected layer
 *
 * Forward/backward propagation
 */
export default class Layer {
    constructor(previous, size, options) {
        const previousSize = previous ? previous.size : 1
        this.options = {
            activationFunction: 'tanh',
            weightRange: [-Math.sqrt(1.55/previousSize), Math.sqrt(1.55/previousSize)],
            ...options,
        }
        this.size = size
        this.weight = new Matrix(size, previousSize).random(
            ...this.options.weightRange
        )
        this.weightTransposed = this.weight.transpose()
        // this.bias = new Matrix(size, 1)
        this.bias = new Matrix(size, 1)
        this.clear()
    }

    clear() {
        this.output = 0
        this.activation = 0
        this.error = 0
        this.derivative = 0
        this.gradientCount = 0
        this.weightGradientSum = new Matrix(this.weight.rows, this.weight.cols)
        this.biasGradientSum = new Matrix(this.bias.rows, this.bias.cols)
        this.activationFunctions = ActivationFunctions[this.options.activationFunction]
        return this
    }

    static load(data) {
        if (data instanceof Layer) {
            return data
        }
        const layer = new Layer(null, data.size, data.options)
        layer.size = data.size
        layer.weight = Matrix.load(data.weight)
        layer.weightTransposed = layer.weight.transpose()
        layer.bias = Matrix.load(data.bias)
        layer.options = data.options
        layer.clear()
        return layer
    }

    save() {
        const data = {
            size: this.size,
            options: this.options,
            weight: this.weight.save(),
            bias: this.bias.save(),
        }
        return data
    }

    feedforward(input, previous, next, context = null) {
        if (!previous) {
            this.output = input
            this.activation = input
        } else {
            this.output = this.weight.product(input).add(this.bias)
            this.activation = this.output.map(this.activationFunctions.x)
        }
        return this.activation
    }

    backpropagate(derivative, previous, next, context = null) {
        if (!previous) {
            return derivative
        }

        if (this.activationFunctions.z) {
            this.derivative = derivative.multiply(this.output.map(this.activationFunctions.z))
        } else {
            this.derivative = derivative.multiply(this.activation.map(this.activationFunctions.y))
        }

        const gradient = this.derivative.multiply(-context.learningRate)
        const weightGradient = gradient.product(previous.activation.transpose())

        this.gradientCount++
        this.weightGradientSum = this.weightGradientSum.add(weightGradient)
        this.biasGradientSum = this.biasGradientSum.add(gradient)

        // Distribute error to previous layer
        return this.weightTransposed.product(this.derivative)
    }

    adjust(previous, next, context = null) {
        if (!previous) {
            return
        }

        let avg

        avg = this.weightGradientSum.multiply(1 / this.gradientCount)
        this.weight = this.weight.add(avg)
        this.weightTransposed = this.weight.transpose()

        avg = this.biasGradientSum.multiply(1 / this.gradientCount)
        this.bias = this.bias.add(avg)

        this.clear()        
    }
}
