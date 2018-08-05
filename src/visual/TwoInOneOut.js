import withCanvas from 'withCanvas'
import Matrix from '../Matrix'

/**
 * Render a grid by representing the two inputs as coordinates, and the output
 * as color. Coordinate system is oriented as the HTML system.
 */
export default class TwoInOneOut {
    constructor(net, container, options = null) {
        this.options = {
            range: [0, 1],
            outputRange: [0, 1],
            minColor: '0, 0, 0',
            maxColor: '255, 255, 255',
        }
        
        this.net = net
        this.steps = 10
        this.screenSize = 200
        this.screenStepSize = this.screenSize / this.steps

        this.props = withCanvas(container, this)
        this.start = () => this.props.start()
        this.stop = () => this.props.stop()
        this.draw = () => this.props.draw()
    }

    init({map}) {
        this.input = x => map(x, 0, this.steps - 1, this.options.range[0], this.options.range[1])
        this.output = x => map(x, this.options.outputRange[0], this.options.outputRange[1], 0, 1)
        this.screen = x => map(x, 0, this.steps, 0, this.screenSize)
    }

    render({canvas, context}) {
        context.fillStyle = `rgb(${this.options.minColor})`
        context.fillRect(0, 0, canvas.width, canvas.height)

        for (let y = 0; y < this.steps; y++) {
            for (let x = 0; x < this.steps; x++) {
                let result = this.net.predict(Matrix.fromArray([this.input(x), this.input(y)]))
                let output = this.output(result.toArray()[0])
                context.fillStyle = `rgba(${this.options.maxColor}, ${output})`
                context.fillRect(this.screen(x), this.screen(y), this.screenStepSize, this.screenStepSize)
            }
        }
    }
}
