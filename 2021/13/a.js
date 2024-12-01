const {read, makeGrid, logGrid} = require("../util");

let input = read()

let [, ...folds] = input
    .splice(input.indexOf(''), Infinity);

folds = folds
    .map((line) => line.match(/(\w)=(\d+)/))
    .map(([, axis, line]) => [axis, parseInt(line)])

input = input
    .map((line) => line.split(','))
    .map(([x, y]) => [parseInt(x), parseInt(y)])

const maxX = Math.max(...input.map(([x]) => x))
const maxY = Math.max(...input.map(([, y]) => y))

const grid = makeGrid(maxX, maxY);

input.forEach(([x, y]) => grid[y][x] = '#')
logGrid(grid);
console.log('\n')

const [axis, line] = folds[0];

grid.forEach((gridLine, y) => {
    gridLine.forEach((cell, x) => {
        if (cell === '#') {
            if (axis === 'y' && y > line) {
                grid[y][x] = '.'
                grid[maxY - y][x] = '#'
            }

            if (axis === 'x' && x > line) {
                grid[y][x] = '.'
                grid[y][maxX - x] = '#'
            }
        }
    })
})

console.log(grid.flat().filter((cell) => cell === '#').length);