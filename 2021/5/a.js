const {read} = require("../util");
const input = read()
    .map((line) => line.match(/(\d+),(\d+) -> (\d+),(\d+)/))
    .map(([, x1, y1, x2, y2]) => ({x1, y1, x2, y2}))
    .filter(({x1, x2, y1, y2}) => x1 === x2 || y1 === y2)

const maxX = Math.max(...input.map(({x1, x2}) => [x1, x2]).flat())
const maxY = Math.max(...input.map(({y1, y2}) => [y1, y2]).flat())

const grid = Array.from({ length: maxX + 1}).map(() => new Array(maxY + 1).fill(0));

input.forEach(({x1, x2, y1, y2}) => {
    for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
        for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
            grid[x][y]++;
        }
    }
});

console.log(grid.flat().filter((num) => num >= 2).length);