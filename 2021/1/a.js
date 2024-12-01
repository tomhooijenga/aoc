const {read} = require('../util');

const answer = read().reduce((count, value, index, input) => {
    if (index === 0) {
        console.log('n/a')
       return 0;
    }
    const prev = input[index - 1];

    if (value > input[index - 1]) {
        console.log(value, prev, 'increase')
        return count + 1;
    }

    console.log(value, prev, 'decrease')

    return count;
}, 0);

console.log(answer);