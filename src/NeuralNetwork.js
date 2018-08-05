import Matrix from './Matrix'
import Layer from './Layer'

export default class NeuralNetwork {
    constructor(options) {
        this.options = {
            epochs: 0,
            batchSize: 0,
            learningRate: .03,
            auto: true,
            ...options,
        }
        this.training = {}
        this.testing = {}
        this.layers = []
        this.layers.map(layer => layer.clear())
    }

    static load(data) {
        const net = new NeuralNetwork(data.options)
        net.layers = data.layers.map(layer => Layer.load(layer))
        return net
    }

    save() {
        return {
            options: this.options,
            layers: this.layers.map(layer => layer.save()),
        }
    }

    addLayer(size, options = null) {
        options = {
            ...this.options,
            ...options
        }
        const previous = this.layers.length ? this.layers[this.layers.length - 1] : null
        const layer = new Layer(previous, size, options)
        this.layers.push(layer)
        return this
    }

    getLayers(i) {
        return {
            previous: i > 0 ? this.layers[i - 1] : null,
            current: this.layers[i],
            next: i < this.layers.length - 1 ? this.layers[i + 1] : null,
        }
    }

    predict(input) {
        return this.feedforward(input)
    }

    train(samples, options = null) {
        this.startContext(this.training, samples, {
            backpropagate: true,
            ...options,
        })

        if (this.training.auto) {
            while (!this.stepContext(this.training).endOfContext) {}
        }
        return this
    }

    test(samples, options = null) {
        this.startContext(this.testing, samples, {
            epochs: 1,
            backpropagate: false,
            ...options,
        })

        if (this.testing.auto) {
            while (!this.stepContext(this.testing).endOfContext) {}
        }
        return this
    }

    step() {
        if (this.canStepContext(this.testing)) {
            this.stepContext(this.testing)
        } else if (this.canStepContext(this.training)) {
            this.stepContext(this.training)
        }

        return this.canStep()
    }

    startContext(context, samples, options = null) {
        options = {
            ...this.options,
            ...options,
        }

        Object.assign(context, options)

        context.ready = true
        context.sample = 0
        context.sampleCount = samples.length
        context.samples = samples.sort(() => .5 - Math.random())
        context.evaluation = 0
        context.batchSize = options.batchSize || context.samples.length
        context.batch = 0
        context.batchEvaluation = 0
        context.batchError = 0
        context.batchErrorSum = null
        context.batchAccuracy = 0
        context.batchAccuracyCount = 0
        context.epoch = 0
        context.epochEvaluation = 0
        context.epochError = 0
        context.epochErrorSum = null
        context.epochAccuracy = 0
        context.epochAccuracyCount = 0
        context.endOfBatch = false
        context.endOfEpoch = false
        context.endOfContext = false

        context.onStart && context.onStart(context)
    }

    stepContext(context) {
        if (this.canStepContext(context)) {
            const sample = context.samples[context.sample]
            const activation = this.feedforward(sample.input, context)
            const error = sample.target.subtract(activation).map(v => v * v)
            let derivative = null
            if (context.backpropagate) {
                derivative = activation.subtract(sample.target)
                this.backpropagate(derivative, context)
            }

            if (context.onEvaluate) {
                const correct = context.onEvaluate(context, sample, activation, error, derivative)
                context.batchAccuracyCount += correct
                context.epochAccuracyCount += correct
            }

            context.sample++
            context.evaluation++
            context.batchEvaluation++
            context.epochEvaluation++
            context.batchErrorSum = context.batchErrorSum ? context.batchErrorSum.add(error) : error
            context.epochErrorSum = context.epochErrorSum ? context.epochErrorSum.add(error) : error
            
            context.endOfEpoch = context.sample === context.sampleCount
            context.endOfBatch = context.endOfEpoch || context.sample % context.batchSize === 0
            context.endOfContext = context.endOfEpoch && context.epochs != 0 && context.epoch === context.epochs - 1

            if (context.endOfBatch) {
                if (context.backpropagate) {
                    this.adjust(context)
                }

                context.batchError = context.batchErrorSum.reduce((c, v) => c + v / context.batchEvaluation, 0)
                context.batchAccuracy = context.batchAccuracyCount / context.batchEvaluation

                context.onBatch && context.onBatch(context)

                context.batch++
                context.batchEvaluation = 0
                context.batchErrorSum = 0
                context.batchAccuracyCount = 0
            }

            if (context.endOfEpoch) {
                context.epochError = context.epochErrorSum.reduce((c, v) => c + v / context.epochEvaluation, 0)
                context.epochAccuracy = context.epochAccuracyCount / context.epochEvaluation

                context.onEpoch && context.onEpoch(context)

                context.epoch++
                context.epochEvaluation = 0
                context.epochErrorSum = 0
                context.epochAccuracyCount = 0

                context.sample = 0
                context.samples.sort(() => .5 - Math.random())
            }

            if (context.endOfContext) {
                context.onComplete && context.onComplete(context)
            }
        }

        return context
    }

    canStep() {
        return this.canStepContext(this.training) || this.canStepContext(this.testing)
    }

    canStepContext(context) {
        return context.ready && !context.endOfContext
    }

    feedforward(input, context = null) {
        let activation = input
        for (let i = 0; i < this.layers.length; i++) {
            const {previous, current, next} = this.getLayers(i)
            activation = current.feedforward(activation, previous, next, context)
        }
        return activation
    }

    backpropagate(derivative, context = null) {
        for (let i = this.layers.length - 1; i >= 0; i--) {
            const {previous, current, next} = this.getLayers(i)
            derivative = current.backpropagate(derivative, previous, next, context)
        }
        return derivative
    }

    adjust(context = null) {
        for (let i = 0; i < this.layers.length; i++) {
            const {previous, current, next} = this.getLayers(i)
            current.adjust(previous, next, context)
        }
    }
}
