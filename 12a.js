import {iterGrid, readInput} from "./lib.js";

const input = readInput(12).map(x => x.split(''));

const seenFence = new Set();
const seenArea = new Set();
let activePlant = null;
const areas = [];

iterGrid(input, (plant, x, y) => {
    if (plant !== activePlant) {
        activePlant = plant;
        areas.push({
            plant,
            area: areaCount(x, y),
            fence: areaFenceCount(x, y)
        });
    }
});

function areaCount(x, y) {
    const plant = read(input, x, y, 0, 0);
    if (plant !== activePlant) {
        return 0;
    }

    if (seenArea.has(`${x},${y}`)) {
        return 0;
    }

    seenArea.add(`${x},${y}`);

    return 1 + areaCount(x + 1, y) + areaCount(x - 1, y) + areaCount(x, y + 1) + areaCount(x, y - 1);
}

function areaFenceCount(x, y) {
    const plant = read(input, x, y, 0, 0);
    if (plant !== activePlant) {
        return 1;
    }

    if (seenFence.has(`${x},${y}`)) {
        return 0;
    }

    seenFence.add(`${x},${y}`);

    return areaFenceCount(x + 1, y) + areaFenceCount(x - 1, y) + areaFenceCount(x, y + 1) + areaFenceCount(x, y - 1);
}

function read(grid, x, y, dx, dy) {
    return grid[y + dy]?.[x + dx];
}

console.log(
    areas
        .filter(({ fence}) => fence > 0)
        .map(({ area, fence }) => area * fence)
        .reduce((a, b) => a + b, 0)
);