export default class Matrix {
    constructor(rows, cols, data = null) {
        this.rows = rows
        this.cols = cols
        this.data = data || [...Array(rows)].map(_ => [...Array(cols)].map(_ => 0))

        const instanceMethods = [
            'map',
            'mapTwo',
            'each',
            'reduce',
            'add',
            'subtract',
            'multiply',
            'transpose',
            'product',
            'random',
            'max',
            'toArray',
            'toString',
            'p'
        ].forEach(p => this[p] = Matrix[p].bind(null, this))
    }

    static load(data) {
        if (data instanceof Matrix) {
            return data
        }
        return new Matrix(data.rows, data.cols, data.data)
    }

    save() {
        return {
            rows: this.rows,
            cols: this.cols,
            data: this.data,
        }
    }

    static fromArray(a, rows = 0, cols = 1) {
        rows = rows || a.length
        if (rows * cols != a.length) {
            throw new Error('Invalid number of values: rows * cols != array.length')
        }
        return new Matrix(rows, cols).map((v, row, col) => a[row * cols + col % cols])
    }

    static toArray(x) {
        return x.data.reduce((c, row) => c.concat(row), [])
    }

    static map(x, f) {
        let y = new Matrix(x.rows, x.cols)
        for (let row = 0; row < x.rows; row++) {
            for (let col = 0; col < x.cols; col++) {
                y.data[row][col] = f(x.data[row][col], row, col)
            }
        }
        return y
    }

    static mapTwo(x1, x2, f) {
        if (x2 instanceof Matrix && (x1.rows != x2.rows || x1.cols != x2.cols)) {
            throw new Error('Shapes must be identical')
        }

        return x1.map((v1, row, col) => {
            if (x2 instanceof Matrix) {
                return f(v1, x2.data[row][col], row, col)
            } else {
                return f(v1, x2, row, col)
            }
        })
    }

    static each(x, f) {
        for (let row = 0; row < x.rows; row++) {
            for (let col = 0; col < x.cols; col++) {
                f(x.data[row][col], row, col)
            }
        }
        return x
    }

    static reduce(x, f, carry) {
        Matrix.each(
            x,
            (v, row, col) => carry = f(carry, v, row, col)
        )
        return carry
    }

    static add(x1, x2) {
        return Matrix.mapTwo(x1, x2, (v1, v2) => v1 + v2)
    }

    static subtract(x1, x2) {
        return Matrix.mapTwo(x1, x2, (v1, v2) => v1 - v2)
    }

    static multiply(x1, x2) {
        return Matrix.mapTwo(x1, x2, (v1, v2) => v1 * v2)
    }

    static transpose(x) {
        const y = new Matrix(x.cols, x.rows)
        x.each((v, row, col) => y.data[col][row] = v)
        return y
    }

    static product(x1, x2) {
        if (x1.cols != x2.rows) {
            throw new Error('Columns in x1 must match rows in x2')
        }

        const y = new Matrix(x1.rows, x2.cols)
        y.each((_, row, col) => {
            let sum = 0
            for (let i = 0; i < x1.cols; i++) {
                sum += x1.data[row][i] * x2.data[i][col]
            }
            y.data[row][col] = sum
        })
        return y
    }

    static random(x, min = 0, max = 1) {
        return x.map(() => min + Math.random() * (max - min))
    }

    static max(x) {
        return x.reduce(
            (c, value, row, col) => (!c || value > c.value) ? {value, row, col} : c,
            null
        )
    }

    static toString(x) {
        let str = '      ' + [...Array(x.cols)].map((_, i) => i.toString().padEnd(9)).join('') + '\n'
        str += x.data.map(
            (row, i) => i.toString().padStart(3) + row.map(col => col.toFixed(4).padStart(9)).join('')
        ).join('\n')
        return str
    }

    static p(x, name = null) {
        if (name) {
            console.log(Matrix.toString(x), name)
        } else {
            console.log(Matrix.toString(x))
        }
        return x
    }
}
