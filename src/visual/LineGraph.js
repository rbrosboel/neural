import withCanvas from 'withCanvas'

export default class LineGraph {
    constructor(container, options = null) {
        this.options = {
            gridInterval: .1,
            maxScaleX: 3,
            max: 1,
            autoMax: true,
            ...options,
        }

        this.max = this.options.max
        this.series = {}

        this.props = withCanvas(container, this)
        this.start = () => this.props.start()
        this.stop = () => this.props.stop()
        this.draw = () => this.props.draw()
    }

    addSerie(name, options = null) {
        this.props.context.font = '13px sans-serif'
        const labelWidth = this.props.context.measureText(name).width
        const serie = {
            name,
            data: [],
            color: '0, 0, 0',
            labelWidth,
            ...this.options,
            ...options,
        }
        this.series[name] = serie
        return this
    }

    addDatapoint(datapoint, serieName = 'default') {
        if (this.options.autoMax) {
            this.max = Math.max(this.max, datapoint)
        }

        if (!this.series[serieName]) {
            this.addSerie(serieName)
        }
        const serie = this.series[serieName]
        serie.data.push(datapoint)
        const width = this.props.canvas.width
        const scaleX = Math.max(width, serie.data.length) / width
        if (scaleX > this.options.maxScaleX) {
            serie.data.shift()
        }
    }

    mouseWheel({event}) {
        event.preventDefault()
        const scale = event.deltaY > 0 ? 1.1 : .9
        this.max = Math.max(this.max * scale, .1)
        this.draw()
    }

    render({canvas, context, map}) {
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.font = '13px sans-serif'
        const valueWidth = context.measureText('000.0000').width

        // Grid lines
        if (this.max != 0) {
            const gridLineInterval = Math.max(Math.round(this.max) / 20, .05)
            const gridLines = this.max / gridLineInterval
            context.strokeStyle = '#eee'
            context.fillStyle = '#ccc'
            context.beginPath()
            for (let i = 0; i <= gridLines; i++) {
                const y = map(i * gridLineInterval, 0, this.max, canvas.height - 1, 0)
                context.moveTo(0, y)

                if (i > 0 && i < gridLines) {
                    const label = (i * gridLineInterval).toFixed(2)
                    const labelWidth = context.measureText(label).width
                    const labelX = canvas.width/2 - labelWidth/2
                    const labelY = y + 4
                    context.clearRect(labelX, y-1, labelWidth, 2)
                    context.fillText(label, labelX, labelY)

                    context.lineTo(labelX - 4, y)
                    context.moveTo(labelX + labelWidth + 4, y)
                }

                context.lineTo(canvas.width, y)
            }
            context.stroke()
        }

        const lineWidth = 50
        const labelHeight = 18
        let serieIndex = 0

        context.fillStyle = '#000'
        for (let serieName of Object.keys(this.series)) {
            const serie = this.series[serieName]

            const labelPos =  {
                x: canvas.width - serie.labelWidth - 4 - valueWidth - 4 - lineWidth - 16,
                y: 24 + labelHeight * serieIndex
            }
            const valuePos = {
                x: canvas.width - valueWidth - 4 - lineWidth - 16,
                y: labelPos.y
            }
            const linePos = {
                x: canvas.width - lineWidth - 16,
                y: labelPos.y - 6
            }

            context.fillText(serie.name, labelPos.x, labelPos.y - 1)
            if (serie.data.length) {
                context.fillText(serie.data[serie.data.length - 1].toFixed(4).padStart(8), valuePos.x, valuePos.y - 1)
            }

            context.strokeStyle = `rgb(${serie.color})`
            context.beginPath()
            context.moveTo(linePos.x, linePos.y)
            context.lineTo(linePos.x + lineWidth, linePos.y)
            context.moveTo(0, 0)
            for (let i = 0; i < serie.data.length; i++) {
                const x = map(i, 0, Math.max(serie.data.length, canvas.width - 1), 0, canvas.width - 1)
                const y = map(serie.data[i], 0, this.max, canvas.height - 1, 0)
                context.lineTo(x, y)
            }
            context.stroke()

            serieIndex++
        }
    }
}