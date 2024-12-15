import {iterGrid, logGrid, readInput} from "./lib.js";

const input = readInput(15);
const brk = input.findIndex((line) => line === '');

const warehouse =  input.slice(0, brk).map((line) => line.split(''));
const instructions = input.slice(brk + 1).map((line) => line.split('')).flat();

const robot = {
    x: 0,
    y: 0,
};

for (const [y, line] of warehouse.entries()) {
    for (const [x, cell] of line.entries()) {
        if (cell === '@') {
            robot.x = x;
            robot.y = y;
            break;
        }
    }
}

const movements = {
    '^': [0, -1],
    '>': [1, 0],
    'v': [0, 1],
    '<': [-1, 0],
}

for (const instruction of instructions) {
    const direction = movements[instruction];

    if (move(warehouse, robot.x, robot.y, instruction)) {
        robot.x += direction[0];
        robot.y += direction[1];
    }
}

function move(input, x, y, instruction) {
    const delta = movements[instruction];
    const cell = read(input, x, y, 0, 0);

    if (cell === '#') {
        return false;
    }
    if (cell === '.') {
        return true;
    }
    if (cell === '@' || cell === 'O') {
        const canMove = move(input, x + delta[0], y + delta[1], instruction);

        if (canMove) {
            input[y + delta[1]][x + delta[0]] = cell;
            input[y][x] = '.';
        }

        return canMove;
    }
}

function read(grid, x, y, dx, dy) {
    return grid[y + dy]?.[x + dx];
}

logGrid(warehouse);

let gps = 0;

iterGrid(warehouse, (cell, x, y) => {
    if (cell !== 'O') {
        return;
    }

    gps += y * 100 + x;
});

console.log(gps);