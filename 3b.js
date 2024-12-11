import {readInput, regexGroup} from "./lib.js";

const instructions = readInput(3)
    .at(0)
    .match(/(mul\(\d+,\d+\)|do\(\)|don't\(\))/g)

function parseMult(mult) {
    const [a, b] = mult.match(/\d+/g).map(Number);
    return a * b;
}

let answer = 0;
let enabled = true;

for (const instruction of instructions) {
    if (instruction === 'do()') {
        enabled = true;
    }
    else if (instruction === 'don\'t()') {
        enabled = false;
    }
    else if (enabled) {
        answer += parseMult(instruction);
    }
}

console.log(answer);