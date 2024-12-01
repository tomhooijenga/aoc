const {read, sum} = require("../util");
let input = read().map((num) => num.split(''))

const bits = input[0].map((_, index) => {
    return input.map(number => number[index]);
});

const gamma = bits.map((bitNumber) => sum(bitNumber) > bitNumber.length / 2 ? '1' : '0').join('')
const epsilon = bits.map((bitNumber) => sum(bitNumber) < bitNumber.length / 2 ? '1' : '0').join('')


console.log(gamma, epsilon, );
console.log(parseInt(gamma, 2) * parseInt(epsilon, 2));