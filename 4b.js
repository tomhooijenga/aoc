import {readInput} from "./lib.js";

const grid = readInput(4).map(line => line.split(''));

let answer = 0;

const word = 'MAS';

for (let y = 0; y < grid.length; y++) {
    const line = grid[y];
    for (let x = 0; x < line.length; x++) {

        const letter = line[x];

        if (letter !== 'A') {
            continue;
        }

        if (
            (read(grid, x - 1, y - 1, 1, 1) || read(grid, x + 1, y + 1, -1, -1))
            && (read(grid, x - 1, y + 1, 1, -1) || read(grid, x + 1, y - 1, -1, 1))
        ) {
            answer++;
        }
    }
}

function read(grid, x, y, dx, dy) {
    return grid[y]?.[x] === word.at(0)
        && grid[y + dy]?.[x + dx] === word.at(1)
        && grid[y + 2 * dy]?.[x + 2 * dx] === word.at(2);
}

console.log(answer);