const {read} = require('../../util');

const answer = read().map((line) => {
    const [ , start1, end1, start2, end2] = line
        .match(/(\d+)-(\d+),(\d+)-(\d+)/)
        .map(x => parseInt(x, 10));

    // 1 in 2
    if (start1 >= start2 && end1 <= end2) {
        return true;
    }
    // 2 in 1
    else if (start2 >= start1 && end2 <= end1) {
        return true;
    }

    return false
}).filter(Boolean).length

console.log((answer));