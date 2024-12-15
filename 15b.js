import {iterGrid, logGrid, readInput} from "./lib.js";

const input = readInput(15);
const brk = input.findIndex((line) => line === '');

const warehouse = input
    .slice(0, brk)
    .map((line) => {
        return line.split('').map((cell) => {
            if (cell === '#') {
                return ['#', '#'];
            }
            if (cell === 'O') {
                return ['[', ']'];
            }
            if (cell === '.') {
                return ['.', '.'];
            }
            if (cell === '@') {
                return ['@', '.'];
            }
        }).flat()
    });
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
logGrid(warehouse);

for (const instruction of instructions) {
    const direction = movements[instruction];

    if (canMove(warehouse, robot.x, robot.y, instruction, new Map())) {
        doMove(warehouse, robot.x, robot.y, instruction, new Set());
        robot.x += direction[0];
        robot.y += direction[1];
    }
}

function canMove(input, x, y, instruction, checked) {
    const [dx, dy] = movements[instruction];
    const cell = read(input, x, y, 0, 0);

    if (checked.has(`${x},${y}`)) {
        return checked.get(`${x},${y}`);
    }

    if (cell === '#') {
        return false;
    }
    if (cell === '.') {
        return true;
    }
    if (cell === '@') {
        return canMove(input, x + dx, y + dy, instruction, checked);
    }
    if (cell === '[') {
        if (instruction === '<' || instruction === '>') {
            return canMove(input, x + dx, y, instruction, checked);
        } else {
            const canThisHalveMove = canMove(input, x, y + dy, instruction, checked);
            checked.set(`${x},${y}`, canThisHalveMove);
            const canRelatedHalveMove = canMove(input, x + 1, y, instruction, checked);
            checked.set(`${x + 1},${y}`, canRelatedHalveMove);

            return canThisHalveMove && canRelatedHalveMove;
        }
    }
    if (cell === ']') {
        if (instruction === '<' || instruction === '>') {
            return canMove(input, x + dx, y, instruction, checked);
        } else {
            const canThisHalveMove = canMove(input, x, y + dy, instruction, checked);
            checked.set(`${x},${y}`, canThisHalveMove);
            const canRelatedHalveMove = canMove(input, x - 1, y, instruction, checked);
            checked.set(`${x - 1},${y}`, canRelatedHalveMove );
            return canThisHalveMove && canRelatedHalveMove;
        }
    }
}

function doMove(input, x, y, instruction, seen) {
    const [dx, dy] = movements[instruction];
    const cell = read(input, x, y, 0, 0);

    if (seen.has(`${x},${y}`)) {
        return;
    }

    seen.add(`${x},${y}`);

    if (cell === '@') {
        doMove(input, x + dx, y + dy, instruction, seen);

        input[y + dy][x + dx] = cell;
        input[y][x] = '.';
    }
    if (cell === '[') {
        if (instruction === '<' || instruction === '>') {
            doMove(input, x + dx, y, instruction, seen);

            input[y][x + dx] = cell;
            input[y][x] = '.';
        } else {
            doMove(input, x, y + dy, instruction, seen);
            doMove(input, x + 1, y, instruction, seen);

            input[y + dy][x] = cell;
            input[y][x] = '.';

            input[y + dy][x] = cell;
            input[y][x + 1] = '.';
        }
    }
    if (cell === ']') {
        if (instruction === '<' || instruction === '>') {
            doMove(input, x + dx, y, instruction, seen);

            input[y][x + dx] = cell;
            input[y][x] = '.';
        } else {
            doMove(input, x, y + dy, instruction, seen);
            doMove(input, x - 1, y, instruction, seen);

            input[y + dy][x] = cell;
            input[y][x] = '.';

            input[y + dy][x] = cell;
            input[y][x - 1] = '.';
        }
    }
}

function read(grid, x, y, dx, dy) {
    return grid[y + dy][x + dx];
}

logGrid(warehouse);

let gps = 0;

iterGrid(warehouse, (cell, x, y) => {
    if (cell !== '[') {
        return;
    }

    gps += y * 100 + x;
});

console.log(gps);