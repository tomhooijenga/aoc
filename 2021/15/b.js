const {read} = require("../util");
const Graph = require('node-dijkstra');

const graph = new Graph();

const input = read()
    .map((line) => line.split('').map(x => parseInt(x)))
    .map(line => {
        return [...line]
            .concat(add(line, 1))
            .concat(add(line, 2))
            .concat(add(line, 3))
            .concat(add(line, 4))
    })

const height = input.length;

for (let amount = 1; amount < 5; amount++) {
    for (let i = 0; i < height; i++) {
        input.push(add(input[i], amount))
    }
}


function add(template, amount) {
    return template.map((i) => {
        let x = i + amount;

        if (x > 9) {
            x %= 9;
        }

        return x;
    })
}

input.forEach((line, y) => {
    line.forEach((_, x) => {
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