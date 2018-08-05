/**
 * Run neural network via browser's requestAnimationFrame and attempt to stay
 * responsive.
 */
export default class AsyncRunner {
    constructor(net, options) {
        this.net = net
        net.options.auto = false
        this.options = {
            fps: 30,
            progressInterval: 1000,
            ...options,
        }

        this.frameInterval = 1000 / this.options.fps
        this.iterations = 1
        this.loopTimeStart = 0
        this.loopTimeLast = 0
        this.loopStep = this.loopStep.bind(this)
    }

    start() {
        this.running = true
        this.loopStep()
        return this
    }

    stop() {
        this.running = false
        return this
    }

    loopStep(now) {
        this.now = now
        if (!this.loopTimeStart) {
            this.loopTimeStart = now
            this.loopTimeLast = now
        }
        const delta = now - this.loopTimeLast
        const net = this.net

        if (this.net.canStep()) {
            this.iterations *= delta < this.frameInterval ? 1.1 : 0.9
            this.iterations = Math.max(1, this.iterations)
            let i = Math.floor(this.iterations)
            while (i-- && net.step()) {}

            this.loopProgress(net.training, now, delta)
            this.loopProgress(net.testing, now, delta)
        }

        this.loopTimeLast = now
        if (this.running) {
            window.requestAnimationFrame(this.loopStep)
        }
    }

    loopProgress(context) {
        if (this.net.canStepContext(context) && this.now > (context.progressDeadline || 0)) {
            context.progressDeadline = this.now + context.progressInterval
            context.onProgress && context.onProgress(context)
        }
    }
}
