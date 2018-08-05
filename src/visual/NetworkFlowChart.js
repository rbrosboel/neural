import mermaid from 'mermaid'

/**
 * Renders a NeuralNetwork as a mermaid flowchart.
 */
export default class NetworkFlowChart {
    constructor(net, container = null, options = null) {
        this.options = {
            verbose: false,
            ...options
        }
        this.container = container && document.getElementById(container)
        this.net = net
    }

    render() {
        this.container.innerHTML = ''
        this.renderSvg(svg => {
            this.container.innerHTML = svg
        })
    }

    renderSvg(callback) {
        if (!mermaid) {
            throw new Error('Load mermaid to use NetworkGraphVisual')
        }

        const hex2 = x => (Math.round(x) < 16 ? '0' : '') + Math.round(x).toString(16).substr(-2)
        const color = x => '#' + (Math.abs(x) < .1 ? 'bbbbbb' : x < 0 ? 'bb5555' : '55bb55') + hex2(Math.min(Math.abs(x * 100), 200) + 55)
        const width = x => Math.min(Math.max(1, Math.abs(x * 5)), 15)
        const number = (x, prefix = '&nbsp;') => (x < 0 ? '' : prefix) + x.toFixed(4)
        let links = 0
        let g = ['graph LR']
        for (let layer = 0; layer < this.net.layers.length; layer++) {
            const {previous, current, next} = this.net.getLayers(layer)
            const previousSize = previous ? previous.size : current.size
            for (let input = 0; input < previousSize; input++) {
                if (!previous) {
                    let x = current.activation ? current.activation.data[input][0] : 0
                    g.push(layer + '' + input + '[">:' + number(x) + '"]')
                    g.push('style ' + layer + '' + input + ' fill:' + color(x) + ',stroke:' + color(x))
                } else {
                    for (let output = 0; output < current.size; output++) {
                        let w = current.weight.data[output][input]
                        let b = current.bias.data[output][0]
                        let gw = current.gradientCount ? current.weightGradientSum.data[output][input] : 0
                        let gb = current.gradientCount ? current.biasGradientSum.data[output][0] : 0
                        let o = current.output ? current.output.data[output][0] : 0
                        let a = current.activation ? current.activation.data[output][0] : 0
                        let e = current.error ? current.error.data[output][0] : 0
                        let d = current.derivative ? current.derivative.data[output][0] : 0

                        let edge = number(w, ' ')
                        let node = number(b)

                        if (this.options.verbose) {
                            edge = 
                                'W:' + number(w, ' ') + '<br>' +
                                '^:' + number(gw, ' ')
                            node =
                                '<br>' +
                                '<br>' +
                                'B:' + number(b) + '<br>' +
                                '^:' + number(gb) + '<br><br>' +
                                'O:' + number(o) + '<br>' +
                                '>:' + number(a) + '<br><br>' +
                                'E:' + number(e) + '<br>' +
                                '<:' + number(d)
                        }

                        g.push((layer-1) + '' + input + ' ---|"' + edge + '"| ' + layer + '' + output + '(("' + node + '"))')
                        g.push('style ' + layer + '' + output + ' fill:' + color(a) + ',stroke:' + color(b) + ',stroke-width:' + width(b))
                        g.push('linkStyle ' + links++ + ' stroke:' + color(w) + ',stroke-width:' + width(w))
                    }
                }

                g.push('')
            }
        }

        mermaid.mermaidAPI.render('flowChart-svg', g.join('\n'), svg => {
            svg = svg.replace('</style><g', '</style><style>#flowchart-svg .label{font-family: monospace;}</style><g')
            callback && callback(svg)
        })
    }
}
