const {read} = require('../../util');

const input = read()
    .map((line) => line.split('').map(x => parseInt(x)))

const answer = input.reduce((count, line, y) => {
    return count + line.reduce((c, tree, x) => {
        // edge tree
        if (x === 0 || x === line.length - 1 || y === 0 || y === input.length - 1) {
            return c + 1;
        }

        const found =
            line.slice(0, x).every((neighbour) => neighbour < tree)
            || line.slice(x + 1).every((neighbour) => neighbour < tree)
            || input.slice(0, y).every((line) => line[x] < tree)
            || input.slice(y + 1).every((line) => line[x] < tree)

        if (found) {
            return c + 1;
        }

        return c;
    }, 0);
}, 0)

console.log(answer);