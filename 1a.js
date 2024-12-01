import {readInput, regexGroup} from "./lib.js";

const left = readInput(1)
    .map((line) => regexGroup(line, /(\d+)/g, 0))
    .map(Number)
    .sort();

const right = readInput(1)
    .map((line) => regexGroup(line, /(\d+)/g, 1))
    .map(Number)
    .sort();

console.assert(left.length === right.length, 'Input lengths do not match');

const answer = left.reduce((acc, leftValue, index) => {
    const rightValue = right[index];
    const distance = Math.abs(leftValue - rightValue);

    return acc + distance;
}, 0);

console.log(answer);