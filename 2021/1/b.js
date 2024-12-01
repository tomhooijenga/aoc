const {read} = require('../util');

const input = read().map(x => parseInt(x))

const WINDOW_LENGTH = 3;

function getWindowSum(arr, start) {
    return arr.slice(start, start + WINDOW_LENGTH).reduce((sum, num) => num + sum);
}

const answer = input
    .slice(0, -(WINDOW_LENGTH - 1))
    .map((_, index) => getWindowSum(input, index))
    .reduce((count, value, index, input) => {
        if (index === 0) {
            console.log('n/a')
            return 0;
        }
        const prev = input[index - 1];

        if (value > prev) {
            console.log(value, prev, 'increase')
            return count + 1;
        }

        console.log(value, prev, value === prev ? 'no change' : 'decrease')

        return count;
    }, 0)

console.log(answer);