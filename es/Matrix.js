'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Matrix = function () {
    function Matrix(rows, cols) {
        var _this = this;

        var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

        _classCallCheck(this, Matrix);

        this.rows = rows;
        this.cols = cols;
        this.data = data || [].concat(_toConsumableArray(Array(rows))).map(function (_) {
            return [].concat(_toConsumableArray(Array(cols))).map(function (_) {
                return 0;
            });
        });

        var instanceMethods = ['map', 'mapTwo', 'each', 'reduce', 'add', 'subtract', 'multiply', 'transpose', 'product', 'random', 'max', 'toArray', 'toString', 'p'].forEach(function (p) {
            return _this[p] = Matrix[p].bind(null, _this);
        });
    }

    _createClass(Matrix, [{
        key: 'save',
        value: function save() {
            return {
                rows: this.rows,
                cols: this.cols,
                data: this.data
            };
        }
    }], [{
        key: 'load',
        value: function load(data) {
            if (data instanceof Matrix) {
                return data;
            }
            return new Matrix(data.rows, data.cols, data.data);
        }
    }, {
        key: 'fromArray',
        value: function fromArray(a) {
            var rows = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var cols = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

            rows = rows || a.length;
            if (rows * cols != a.length) {
                throw new Error('Invalid number of values: rows * cols != array.length');
            }
            return new Matrix(rows, cols).map(function (v, row, col) {
                return a[row * cols + col % cols];
            });
        }
    }, {
        key: 'toArray',
        value: function toArray(x) {
            return x.data.reduce(function (c, row) {
                return c.concat(row);
            }, []);
        }
    }, {
        key: 'map',
        value: function map(x, f) {
            var y = new Matrix(x.rows, x.cols);
            for (var row = 0; row < x.rows; row++) {
                for (var col = 0; col < x.cols; col++) {
                    y.data[row][col] = f(x.data[row][col], row, col);
                }
            }
            return y;
        }
    }, {
        key: 'mapTwo',
        value: function mapTwo(x1, x2, f) {
            if (x2 instanceof Matrix && (x1.rows != x2.rows || x1.cols != x2.cols)) {
                throw new Error('Shapes must be identical');
            }

            return x1.map(function (v1, row, col) {
                if (x2 instanceof Matrix) {
                    return f(v1, x2.data[row][col], row, col);
                } else {
                    return f(v1, x2, row, col);
                }
            });
        }
    }, {
        key: 'each',
        value: function each(x, f) {
            for (var row = 0; row < x.rows; row++) {
                for (var col = 0; col < x.cols; col++) {
                    f(x.data[row][col], row, col);
                }
            }
            return x;
        }
    }, {
        key: 'reduce',
        value: function reduce(x, f, carry) {
            Matrix.each(x, function (v, row, col) {
                return carry = f(carry, v, row, col);
            });
            return carry;
        }
    }, {
        key: 'add',
        value: function add(x1, x2) {
            return Matrix.mapTwo(x1, x2, function (v1, v2) {
                return v1 + v2;
            });
        }
    }, {
        key: 'subtract',
        value: function subtract(x1, x2) {
            return Matrix.mapTwo(x1, x2, function (v1, v2) {
                return v1 - v2;
            });
        }
    }, {
        key: 'multiply',
        value: function multiply(x1, x2) {
            return Matrix.mapTwo(x1, x2, function (v1, v2) {
                return v1 * v2;
            });
        }
    }, {
        key: 'transpose',
        value: function transpose(x) {
            var y = new Matrix(x.cols, x.rows);
            x.each(function (v, row, col) {
                return y.data[col][row] = v;
            });
            return y;
        }
    }, {
        key: 'product',
        value: function product(x1, x2) {
            if (x1.cols != x2.rows) {
                throw new Error('Columns in x1 must match rows in x2');
            }

            var y = new Matrix(x1.rows, x2.cols);
            y.each(function (_, row, col) {
                var sum = 0;
                for (var i = 0; i < x1.cols; i++) {
                    sum += x1.data[row][i] * x2.data[i][col];
                }
                y.data[row][col] = sum;
            });
            return y;
        }
    }, {
        key: 'random',
        value: function random(x) {
            var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

            return x.map(function () {
                return min + Math.random() * (max - min);
            });
        }
    }, {
        key: 'max',
        value: function max(x) {
            return x.reduce(function (c, value, row, col) {
                return !c || value > c.value ? { value: value, row: row, col: col } : c;
            }, null);
        }
    }, {
        key: 'toString',
        value: function toString(x) {
            var str = '      ' + [].concat(_toConsumableArray(Array(x.cols))).map(function (_, i) {
                return i.toString().padEnd(9);
            }).join('') + '\n';
            str += x.data.map(function (row, i) {
                return i.toString().padStart(3) + row.map(function (col) {
                    return col.toFixed(4).padStart(9);
                }).join('');
            }).join('\n');
            return str;
        }
    }, {
        key: 'p',
        value: function p(x) {
            var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            if (name) {
                console.log(Matrix.toString(x), name);
            } else {
                console.log(Matrix.toString(x));
            }
            return x;
        }
    }]);

    return Matrix;
}();

exports.default = Matrix;