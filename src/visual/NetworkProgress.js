import LineGraph from './LineGraph'

export default class NetworkProgress {
    constructor(net, container) {
        this.net = net
        this.container = document.getElementById(container)

        this.statsContainer = document.createElement('div')
        this.statsContainer.id = container + '-stats'
        this.container.appendChild(this.statsContainer)

        this.graphContainer = document.createElement('div')
        this.graphContainer.id = container + '-graph'
        this.container.appendChild(this.graphContainer)

        this.graph = new LineGraph(this.graphContainer.id)
        .addSerie('Train batch cost', {color: '150, 150, 150'})
        .addSerie('Train batch error', {color: '150, 150, 255'})
        .addSerie('Train epoch cost', {color: '0, 0, 0'})
        .addSerie('Train epoch error', {color: '0, 0, 255'})
        .addSerie('Test epoch cost', {color: '255, 0, 0'})
        .addSerie('Test epoch error', {color: '0, 175, 0'})
    }

    step() {
        const graph = this.graph
        const {
            training,
            testing
        } = this.net

        const format = (v, d = 4) => (v || 0).toFixed(d)

        const epoch = format(training.evaluation / training.sampleCount, 2)
        const batch = format(training.evaluation / training.batchSize, 0)
        const evaluation = format(training.evaluation, 0)
        const trainingAccuracy = format(training.epochAccuracy)
        const testingAccuracy = format(testing.epochAccuracy)

        this.statsContainer.innerHTML = `
            <ul>
                <li class="stat training epoch"><div class="name">Epoch</div><div class="value">${epoch}</div></li>
                <li class="stat training batch"><div class="name">Batch</div><div class="value">${batch}</div></li>
                <li class="stat training evaluation"><div class="name">Evaluation</div><div class="value">${evaluation}</div></li>
                <li class="stat training accuracy"><div class="name">Training accuracy</div><div class="value">${trainingAccuracy}</div></li>
                <li class="stat testing accuracy"><div class="name">Testing accuracy</div><div class="value">${testingAccuracy}</div></li>
            </ul>
        `

        if (training.ready) {
            graph.addDatapoint(training.batchError, 'Train batch cost')
            graph.addDatapoint(1 - training.batchAccuracy, 'Train batch error')
            if (training.epochError) {
                graph.addDatapoint(training.epochError, 'Train epoch cost')
                graph.addDatapoint(1 - training.epochAccuracy, 'Train epoch error')
            }
        }

        if (testing.ready) {
            if (testing.epochError) {
                graph.addDatapoint(testing.epochError, 'Test epoch cost')
                graph.addDatapoint(1 - testing.epochAccuracy, 'Test epoch error')
            }
        }

        if (!graph.props.running) {
            graph.draw()
        }
    }
}