const {read} = require('../../util');

const input = read()
    .map((line) => line.split('').map(x => parseInt(x)))

const answer = input.map((line, y) => {
    return line.map((tree, x) => {
        return findTreeCount(tree, line.slice(0, x).reverse())
            * findTreeCount(tree, line.slice(x + 1))
            * findTreeCount(tree, input.slice(0, y).map(line => line[x]).reverse())
            * findTreeCount(tree, input.slice(y + 1).map(line => line[x]))
    })
}).flat().curry(heights => Math.max(...heights))

function findTreeCount(tree, line) {
    const index = line.findIndex(t => t >= tree);

    if (index === -1) {
        return line.length;
    }

    return index + 1;
}

console.log(answer);