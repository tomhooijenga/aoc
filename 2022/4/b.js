const {read} = require('../../util');

const answer = read().map((line) => {
    const [ , start1, end1, start2, end2] = line
        .match(/(\d+)-(\d+),(\d+)-(\d+)/)
        .map(x => parseInt(x, 10));

    // start 1 in 2
    if (start1 >= start2 && start1 <= end2) {
        return true;
    }

    // start 2 in 1
    return start2 >= start1 && start2 <= end1;
}).filter(Boolean).length

console.log((answer));