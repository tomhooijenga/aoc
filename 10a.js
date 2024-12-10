import {iterGrid, readInput} from "./lib.js";

const input = readInput(10)
    .map(line => line.split('').map(cell => parseInt(cell)));

const answer = [];

iterGrid(input, (cell, x, y) => {
    if (cell === 0) {
        answer.push(score(input, [], -1, x, y));
    }
});

function score(grid, route, prevTile, x, y) {
    const cell = grid[y]?.[x];
    // console.log(cell);
    if (cell === undefined || isNaN(cell) || cell - prevTile !== 1) {
        return 0;
    }

    if (cell === 9) {
        if (route.includes(`${x},${y}`)) {
            return 0;
        }

        route.push(`${x},${y}`);
        return 1;
    }

    return score(grid, route, cell, x, y + 1)
        + score(grid, route, cell, x, y - 1)
        + score(grid,route, cell, x + 1, y)
        + score(grid,route, cell, x - 1, y);
}

console.log(answer.reduce((a, b) => a + b, 0));
