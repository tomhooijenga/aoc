import {readInput} from "./lib.js";

const grid = readInput(4).map(line => line.split(''));

let answer = 0;

const word = 'XMAS';

for (let y = 0; y < grid.length; y++) {
    const line = grid[y];
    for (let x = 0; x < line.length; x++) {
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy    = -1; dy <= 1; dy++) {
                if (read(grid, x, y, dx, dy)) {
                    answer++;
                }
            }
        }
    }
}

function read(grid, x, y, dx, dy) {
    return grid[y][x] === word.at(0)
        && grid[y + dy]?.[x + dx] === word.at(1)
        && grid[y + 2 * dy]?.[x + 2 * dx] === word.at(2)
        && grid[y + 3 * dy]?.[x + 3 * dx] === word.at(3);
}

console.log(answer);