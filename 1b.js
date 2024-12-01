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

const rightOccurrences = right.reduce((acc, value) => {
    acc[value] = (acc[value] || 0) + 1;
    return acc;
}, {});

const answer = left.reduce((acc, leftValue) => {
    const similarity = leftValue * (rightOccurrences[leftValue] ?? 0);

    return acc + similarity;
}, 0);

console.log(answer);