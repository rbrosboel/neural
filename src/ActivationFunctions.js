/**
 * Activation functions and their derivatives
 * 
 * x: f(x)
 * y: f'(f(x))
 * z: f'(x)
 * 
 * https://en.wikipedia.org/wiki/Activation_function
 */
export default class ActivationFunctions {
    static get identity() {
        return {
            x: x => x,
            y: y => 1
        }
    }

    static get sigmoid() {
        return {
            x: x => 1 / (1 + Math.exp(-x)),
            y: y => y * (1 - y)
        }
    }

    static get tanh() {
        return {
            x: x => Math.tanh(x),
            y: y => 1 - (y * y)
        }
    }

    static get relu() {
        return {
            x: x => x < 0 ? 0 : x,
            y: y => y > 0 ? 1 : 0
        }
    }

    static get leaky() {
        return {
            x: x => x < 0 ? 0.01 * x : x,
            y: y => y > 0 ? 1 : 0.01
        }
    }

    static get softplus() {
        return {
            x: x => Math.log(1 + Math.exp(x)),
            z: z => 1 / (1 + Math.exp(-z))
        }
    }

    static get sinusoid() {
        return {
            x: x => Math.sin(x),
            z: z => Math.cos(z)
        }
    }

    static get sinc() {
        return {
            x: x => x === 0 ? 1 : Math.sin(x) / x,
            z: z => z === 0 ? 0 : Math.cos(z) / z - Math.sin(z) / (z * z)
        }
    }
}
