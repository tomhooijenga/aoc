import {readInput} from "./lib.js";

const input = readInput(19);

const towels = input.at(0).split(', ');
const designs = input.slice(2);

const cache = new Map();

function isPossible(design, towels) {
    if (design.length === 0) {
        return 1;
    }

    if (cache.has(design)) {
        return cache.get(design);
    }

    const possibleTowels = towels.filter(towel => design.includes(towel));

    let count = 0;

    for (const towel of possibleTowels) {
        if (!design.startsWith(towel)) {
            continue;
        }

        count += isPossible(design.slice(towel.length), possibleTowels);
    }

    cache.set(design, count);

    return count;
}

console.log(designs.map((design) => isPossible(design, towels)).reduce((acc, count) => acc + count, 0));