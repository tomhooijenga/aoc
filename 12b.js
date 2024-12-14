import {iterGrid, readInput} from "./lib.js";

const input = readInput(12).map(x => x.split(''));

const seenFence = new Set();
const seenArea = new Set();
const seenSides = new Set();
const seenAreaSides = new Set();
let activePlant = null;
const areas = [];

iterGrid(input, (plant, x, y) => {
    if (plant !== activePlant) {
        activePlant = plant;
        areas.push({
            plant,
            area: areaCount(x, y),
            fence: areaFenceCount(x, y),
            sides: areaSidesCount(input, x, y, plant, new Set()),
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

function areaSidesCount(grid, x, y, plant, seen) {
    const p = read(grid, x, y, 0, 0);

    if (p === undefined || p !== plant || seen.has(`${x},${y}`)) {
        return 0;
    }

    seen.add(`${x},${y}`);

    const top = read(grid, x, y, 0, -1);
    const bottom = read(grid, x, y, 0, 1);
    const left = read(grid, x, y, -1, 0);
    const right = read(grid, x, y, 1, 0);

    let corners = 0;

    if (top !== plant && right !== plant) {
        corners++;
    }
    if (right !== plant && bottom !== plant) {
        corners++;
    }
    if (bottom !== plant && left !== plant) {
        corners++;
    }
    if (left !== plant && top !== plant) {
        corners++;
    }

    const topRight = read(grid, x, y, 1, -1);
    const topLeft = read(grid, x, y, -1, -1);
    const bottomRight = read(grid, x, y, 1, 1);
    const bottomLeft = read(grid, x, y, -1, 1);

    if (top === plant && right === plant && topRight !== plant) {
        corners++;
    }
    if (right === plant && bottom === plant && bottomRight !== plant) {
        corners++;
    }
    if (bottom === plant && left === plant && bottomLeft !== plant) {
        corners++;
    }
    if (left === plant && top === plant && topLeft !== plant) {
        corners++;
    }

    return corners
        + areaSidesCount(grid, x + 1, y, plant, seen)
        + areaSidesCount(grid, x - 1, y, plant, seen)
        + areaSidesCount(grid, x, y + 1, plant, seen)
        + areaSidesCount(grid, x, y - 1, plant, seen);
}

function read(grid, x, y, dx, dy) {
    return grid[y + dy]?.[x + dx];
}

console.log(
    areas
        .filter(({fence}) => fence > 0)
        .map(({sides, area}) => sides * area)
        .reduce((a, b) => a + b, 0)
);