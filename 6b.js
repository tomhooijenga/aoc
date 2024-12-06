import {readInput} from "./lib.js";

let input = readInput(6).map((line) => line.split(""));

let guardStart = null;

for (let y = 0; y < input.length; y++) {
    const line = input[y];
    for (let x = 0; x < line.length; x++) {
        if (line[x] === "^") {
            guardStart = {x, y};
            break;
        }
    }
}

function patrolIsLoop() {
    let guard = {...guardStart};
    let direction = 0;
    const steps = new Set();

    // steps.add(`${guard.x},${guard.y}`);

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

        if (!(newGuard.x >= 0 && newGuard.x < input[0].length && newGuard.y >= 0 && newGuard.y < input.length)) {
            return false;
        }

        if (steps.has(`${newGuard.x},${newGuard.y},${direction}`)) {
            return true;
        }

        const tile = input[newGuard.y][newGuard.x];

        if (tile === '#') {
            direction = (direction + 1) % 4;
        } else {
            guard = newGuard;
            steps.add(`${guard.x},${guard.y},${direction}`);
        }
    } while (true);
}

let loops = [];

// input[guardStart.y][guardStart.x - 1] = "#";

// console.log(patrolIsLoop());
//
for (let y = 0; y < input.length; y++) {
    const line = input[y];
    for (let x = 0; x < line.length; x++) {
        if (line[x] === "^") {
            continue;
        }
        if (line[x] === "#") {
            continue;
        }

        input[y][x] = "#";
        if (patrolIsLoop()) {
            loops.push({x, y});
        }

        input = readInput(6).map((line) => line.split(""));
    }
    console.log(y);
}


console.log(loops.length);
