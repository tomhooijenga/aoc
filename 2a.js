import {readInput, regexGroup} from "./lib.js";
import * as assert from "node:assert";

const input = readInput(2)

assert.ok(!isSafe('1 2 1'.split(' '))); // up then down
assert.ok(!isSafe('1 2 2'.split(' '))); // no inc
assert.ok(!isSafe('1 2 10'.split(' '))); // big inc

assert.ok(!isSafe('1 2 1'.split(' '))); // down then up
assert.ok(!isSafe('2 1 1'.split(' '))); // no dec
assert.ok(!isSafe('10 9 1'.split(' '))); // big inc

assert.ok(!isSafe('14 13 14 12 15 18 15'.split(' '))); // down up down

const answer = input
    .map((line) => {
        return line.split(' ').map((x) => parseInt(x));
    })
    .filter((report) => {
        return isSafe(report);
    })
    .map((report) => {
        return report;
    })
    .length;

function isSafe(report) {
    const [first, second] = report;
    const up = first < second;

    for (let i = 1; i < report.length; i++) {
        const lvl = report[i];
        const prevLvl = report[i - 1];
        let difference = lvl - prevLvl;

        difference = up ? difference : -difference;

        if (difference > 3 || difference <= 0) {
            return false;
        }
    }

    return true;
}

console.log(answer);