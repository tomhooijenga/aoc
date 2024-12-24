import {readInput} from "./lib.js";

const input = readInput(19);

const towels = input.at(0).split(', ');
const designs = input.slice(2);

const cache = new Map();

function isPossible(design, towels) {
    if (design.length === 0) {
        return true;
    }

    if (cache.has(design)) {
        return cache.get(design);
    }

    const possibleTowels = towels.filter(towel => design.includes(towel));

    for (const towel of possibleTowels) {
        if (design.startsWith(towel) && isPossible(design.slice(towel.length), possibleTowels)) {
            cache.set(design, true);

            return true;
        }
    }

    cache.set(design, false);

    return false;
}

console.log(designs.filter((design) => isPossible(design, towels)).length);