const {read, sum} = require('../../util');

const answer = read().reduce((elfs, calories) => {
    if (calories === '') {
        elfs.unshift(0);
    } else {
        elfs[0] += +calories;
    }

    return elfs;
}, [0]).sort((a, b) => b - a).slice(0, 3);


console.log(sum(answer));