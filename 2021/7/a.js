const {sum, read} = require('../util')

const input = read()[0]
    .split(',')
    .map((num) => parseInt(num));

const min = Math.min(...input);
const max = Math.max(...input);

const costs = []
for (let x = min; x < max; x++) {
    costs.push(
        sum(input.map((pos) => Math.abs(pos - x)))
    )
}

console.log(Math.min(...costs));