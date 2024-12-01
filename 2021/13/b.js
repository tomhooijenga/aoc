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

let maxX = Math.max(...input.map(([x]) => x))
let maxY = Math.max(...input.map(([, y]) => y))

const grid = makeGrid(maxX, maxY);

input.forEach(([x, y]) => grid[y][x] = '#')

folds.forEach(([axis, line]) => {
    grid.forEach((gridLine, y) => {
        gridLine.forEach((cell, x) => {
            if (cell === '#') {
                if (axis === 'y' && y > line) {
                    grid[y][x] = '.'
                    grid[line * 2 - y][x] = '#'
                }

                if (axis === 'x' && x > line) {
                    grid[y][x] = '.'
                    grid[y][line * 2 - x] = '#'

                }
            }
        })

        if (axis === 'x') {
            gridLine.length = line;
        }
    })

    if (axis === 'y') {
        grid.length = line;
    }
})

logGrid(grid);
