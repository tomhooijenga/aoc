const {read} = require('../../util');

const MARKER_LENGTH = 14;
const input = read()[0];

let answer = MARKER_LENGTH;
const win = [...input.slice(0, MARKER_LENGTH)];
for (; answer < input.length; answer++) {
    const char = input[answer];

    if (new Set(win).size === win.length) {
        break;
    }

    win.shift();
    win.push(char);
}

console.log((answer));