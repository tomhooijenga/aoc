const {read, sum} = require("../util");
const input = read()[0]
    .split(',')
    .map((num) => parseInt(num));

const fish = input.reduce((fish, num) => {
    fish[num]++;
    return fish;
}, new Array(9).fill(0));

const days = 256 ;

for (let day = 1; day <= days; day++) {
    const parents = fish.shift();

    fish[6] += parents;
    fish[8] = parents;
}

console.log(sum(fish));