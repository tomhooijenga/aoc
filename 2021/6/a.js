const {read} = require("../util");
const input = read()[0]
    .split(',')
    .map((num) => parseInt(num));

const days = 80;

for (let day = 1; day <= days; day++) {
    let children = 0;

    for (let i = 0; i < input.length; i++) {
        const fish = input[i];
        if (fish === 0) {
            input[i] = 6;
            children++;
        } else {
            input[i]--;
        }
    }

    input.push(...new Array(children).fill(8));
}

console.log(input.length)