const fs = require( 'fs');
const path = require('path');

function read() {
    const file = getCallerFile();
    const assignment = path.basename(path.dirname(file))

    return fs.readFileSync(`../${assignment}/input.txt`, 'utf8')
        .split('\r\n')
}

const getCallerFile = () => {
    const oldStackTrace = Error.prepareStackTrace;
    try {
        const e = {};
        Error.prepareStackTrace = (err, structuredStackTrace) => structuredStackTrace;
        Error.captureStackTrace(e);
        return e.stack[2].getFileName()
    } finally {
        Error.prepareStackTrace = oldStackTrace;
    }
};

function sum(arr) {
    return arr.reduce((sum, num) => sum + +num, 0);
}

function product(arr) {
    return arr.reduce((sum, num) => sum * +num, 1);
}

function chunk(arr, size) {
    return arr.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index/size)

        if(!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = []
        }

        resultArray[chunkIndex].push(item)

        return resultArray
    }, [])
}

function getRow(index, width) {
    return Math.floor(index / width);
}

function getCol(index, width) {
    return index % width;
}

function makeGrid(x, y) {
    return Array
        .from({ length: y + 1 })
        .map(() => new Array(x + 1).fill('.'))
}

function iterateGrid(grid, cb) {
    grid.forEach((line, y) => {
        line.forEach((cell, x) => {
            cb(x, y, cell);
        })
    })
}

function logGrid(grid) {
    console.log(grid.map(line => line.join(' ')).join('\n'))
}

module.exports = {
    sum,
    product,
    chunk,
    read,
    getCol,
    getRow,
    makeGrid,
    logGrid,
    iterateGrid
}


Array.prototype.log = function () {
    console.log(this);
    return this;
}

Array.prototype.curry = function (fn, ...args) {
    return fn(this, ...args);
}