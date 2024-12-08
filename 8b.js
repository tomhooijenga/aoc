import {iterGrid, readInput} from "./lib.js";

const grid = readInput(8).map(line => line.split(''));

const antennas = {};
const antiAntennas = new Set();

iterGrid(grid, (cell, x, y) => {
    if (cell === '.') {
        return;
    }

    antennas[cell] = antennas[cell] || [];
    antennas[cell].push({x, y});
});

for (const [antenna, positions] of Object.entries(antennas)) {
    if (positions.length < 2) {
        console.log(antenna);
        continue;
    }

    for (const combination of combinations(positions)) {
        const [a, b] = combination;
        const dx = b.x - a.x;
        const dy = b.y - a.y;

        const antiA = {
            x: a.x - dx,
            y: a.y - dy
        };
        const antiB = {
            x: b.x + dx,
            y: b.y + dy
        };

        antiAntennas.add(`${a.x},${a.y}`);
        antiAntennas.add(`${b.x},${b.y}`);

        while (antiA.x >= 0 && antiA.y >= 0 && antiA.x < grid[0].length && antiA.y < grid.length) {
            antiAntennas.add(`${antiA.x},${antiA.y}`);
            antiA.x -= dx;
            antiA.y -= dy;
        }

        while (antiB.x >= 0 && antiB.y >= 0 && antiB.x < grid[0].length && antiB.y < grid.length) {
            antiAntennas.add(`${antiB.x},${antiB.y}`);
            antiB.x += dx;
            antiB.y += dy;
        }
    }
}

function combinations (positions) {
    const result = [];

    for (let i = 0; i < positions.length; i++) {
        for (let j = i + 1; j < positions.length; j++) {
            result.push([positions[i], positions[j]]);
        }
    }

    return result;
}


console.log([...antiAntennas].sort());
