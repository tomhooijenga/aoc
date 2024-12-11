import {readInput, regexGroup} from "./lib.js";

const mults = readInput(3)
    .at(0)
    .match(/(mul\(\d+,\d+\))/g).map((mult) => {
        const [a, b] = mult.match(/\d+/g).map(Number);
        return a * b;
    })
    .reduce((acc, value) => acc + value, 0);

console.log(mults);

// console.log(answer);