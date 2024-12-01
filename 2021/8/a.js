const {read} = require('../util')

const nums = new Set([2, 4, 3, 7])
const input = read()
    .map((line) => line.split(' | ').pop().split(' '))
    .flat()
    .filter((number) => nums.has(number.length))

console.log(input.length)