const {read} = require("../util");
const Graph = require('node-dijkstra');

const graph = new Graph();

const input = read()

input.forEach((line, y) => {
    line.split('').forEach((_, x) => {
        graph.addNode(`${x},${y}`, {
            [`${x - 1},${y}`]: line[x - 1] ?? Infinity,
            [`${x + 1},${y}`]: line[x + 1] ?? Infinity,
            [`${x},${y - 1}`]: input[y - 1]?.[x] ?? Infinity,
            [`${x},${y + 1}`]: input[y + 1]?.[x] ?? Infinity,
        })
    })
})

const start = '0,0';
const end = `${input[0].length - 1},${input.length - 1}`

console.log(graph.path(start, end, { cost: true }));