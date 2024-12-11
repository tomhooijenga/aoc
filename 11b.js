import {readInput} from "./lib.js";

const input = readInput(11).at(0).split(' ').map(stone => parseInt(stone));
const steps = 75

const cache = {};

function blink(stone, iteration) {
    const key = `${stone},${iteration}`;

    if (key in cache) {
        return cache[key];
    }

    // console.log(iteration);
    if (iteration === 0) {
        cache[key] = 1;
    }
    else if (stone === 0) {
        cache[key] = blink(1, iteration - 1);
    }
    else if (stone.toString().length % 2 === 0) {
        const stoneStr = stone.toString();
        cache[key] = blink(parseInt(stoneStr.slice(0, stoneStr.length / 2)), iteration - 1) + blink(parseInt(stoneStr.slice(stoneStr.length / 2)), iteration - 1);
    }
    else {
        cache[key] = blink(stone * 2024, iteration - 1);
    }

    return cache[key];
}

console.log(input.map(x => blink(x, steps)).reduce((acc, x) => acc + x, 0));
