const {read, sum} = require("../util");
let input = read().map((num) => num.split(''))

const maxPos = input[0].length;

function getSignificantBit(input, position, ones) {
    const count = sum(input.map((num) => num[position]));
    const halve = input.length / 2;

    if (count === halve) {
        return 'eq';
    }

    if (ones) {
        return count > halve ? '1' : '0';
    } else {
        return count > halve ? '0' : '1';
    }
}

function filterStep(input, position, replaceEq, ones) {
    let commonBit = getSignificantBit(input, position, ones);

    if (commonBit === 'eq') {
        commonBit = replaceEq;
    }

    return input.filter((number) => number[position] === commonBit);
}

function filter(input, replaceEq, ones) {
    let pos = 0;
    while (input.length !== 1 && pos < maxPos) {
        input = filterStep(input, pos, replaceEq, ones);
        pos++;
    }
    return parseInt(input[0].join(''), 2);
}

const o2 = filter(input.slice(), '1', true);
const co2 = filter(input.slice(), '0', false);

console.log(o2 * co2);