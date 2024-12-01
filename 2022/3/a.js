const {read, sum} = require('../../util');

const answer = read().map((line) => {
    const half = line.length / 2;
    const left = line.slice(0, half);
    const right = line.slice(half);

    for (const item of left) {
        if (right.includes(item)) {
            return item;
        }
    }
}).map((item) => {
    const value = item.charCodeAt(0);

    // lowercase
    if (value >= 97) {
        return value - 96
    }
    return value - 38;
})

console.log(sum(answer));