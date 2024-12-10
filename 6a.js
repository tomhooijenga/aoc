import {readInput} from "./lib.js";

const input = readInput(6).map((line) => line.split(""));

let guard = null;
let direction = 0;
const steps = new Set();

for (let y = 0; y < input.length; y++) {
    const line = input[y];
    for (let x = 0; x < line.length; x++) {
        if (line[x] === "^") {
            guard = {x, y};
            break;
        }
    }
}

console.log(guard);
steps.add(`${guard.x},${guard.y}`);

do {
    const newGuard = {...guard};

    if (direction === 0) {
        newGuard.y--;
    } else if (direction === 1) {
        newGuard.x++;
    } else if (direction === 2) {
        newGuard.y++;
    } else {
        newGuard.x--;
    }

    if (!(newGuard.x >= 0 && newGuard.x < input[0].length - 1 && newGuard.y >= 0 && newGuard.y < input.length - 1)) {
        break;
    }

    const tile = input[newGuard.y][newGuard.x];

    if (tile === '#') {
        direction = (direction + 1) % 4;
    } else {
        guard = newGuard;
        steps.add(`${guard.x},${guard.y}`);
    }
} while (true);

// console.log(steps);

let answer;

console.log(steps.size);