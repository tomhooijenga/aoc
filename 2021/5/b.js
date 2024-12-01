const {read} = require("../util");

const input = read()
    .map((line) => line.match(/(\d+),(\d+) -> (\d+),(\d+)/))
    .map(([, ...rest]) => rest.map(num => parseInt(num)))
    .map(([x1, y1, x2, y2]) => ({x1, y1, x2, y2}))

const maxX = Math.max(...input.map(({x1, x2}) => [x1, x2]).flat())
const maxY = Math.max(...input.map(({y1, y2}) => [y1, y2]).flat())

const grid = Array.from({length: maxY + 1}).map(() => new Array(maxX + 1).fill(0));

input.forEach(({x1, x2, y1, y2}) => {

    let x = x1;
    let y = y1;

    for (; ;) {
        grid[y][x]++;

        if (x === x2 && y === y2) {
            break;
        }

        if (x1 !== x2) {
            x += x1 < x2 ? 1 : -1;
        }

        if (y1 !== y2) {
            y += y1 < y2 ? 1 : -1;
        }
    }
});

console.log(grid
    .map((line) =>
        line
            .map((num) => num === 0 ? '.' : num)
            .join(' ')
    ).join('\n'));
console.log(grid.flat().filter((num) => num >= 2).length);