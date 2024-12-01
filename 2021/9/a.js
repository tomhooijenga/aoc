const {sum, read} = require('../util')

let input = read()
    .map(line => line.split(''))

const width = input[0].length;
const height = input.length;

input = input
    .flat()
    .map(num => parseInt(num));

function getNeighbours(map, index) {
    return [
        map[index - width],
        map[index + 1],
        map[index + width],
        map[index - 1]
    ].filter(neighbour => neighbour !== undefined);
}

function isLowPoint(number, neighbours) {
    return neighbours.every(neighbour => neighbour > number);
}

console.log(sum(input
    .filter((point, index) => isLowPoint(point, getNeighbours(input, index)))
    .map(point => 1 + point)
));