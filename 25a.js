import {readInput} from "./lib.js";

const input = readInput(25);
const height = 7;
const width = 5;

const keys = [];
const locks = [];

for (let i = 0; i < input.length; i += height + 1) {
    const block = input.slice(i, i + height);

    // lock
    if (block[0][0] === '#') {
        const lock = new Array(width).fill(0);

        for (let x = 0; x < width; x++) {
            for (let y = 1; y < height; y++) {
                lock[x] += block[y][x] === '#' ? 1 : 0;
            }
        }

        locks.push(lock);
    }
    // key
    else {
        const key = new Array(width).fill(0);

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height - 1; y++) {
                key[x] += block[y][x] === '#' ? 1 : 0;
            }
        }

        keys.push(key);
    }
}

let matches = []

for (const key of keys) {
    for (const lock of locks) {
        let match = true;


        for (const [index, pin] of key.entries()) {
            if (pin + lock[index] > 5) {
                match = false;
                break;
            }
        }

        if (match) {
            matches.push({key, lock});
        }
    }
}

console.log(keys.length, locks.length, matches.length);