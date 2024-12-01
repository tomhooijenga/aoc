const {read} = require("../util");

let [polymer, , ...insertions] = read();

const chars = {};
let pairs = {}
polymer.split('').forEach((char, index) => {
    safeAdd(chars, char, 1)
    const pair = char + polymer[index + 1];
    safeAdd(pairs, pair, 1)
})

insertions = insertions
    .map((line) => line.split(' -> '))
    .map(([from, to]) => (
        [
            from,
            {
                to,
                first: from[0],
                second: from[1]
            }
        ]
    ))

insertions = Object.fromEntries(insertions);

for (let iter = 0; iter < 40; iter++) {
    const newPairs = {};

    Object.entries(pairs).forEach(([pair, count]) => {
        if (insertions[pair]) {
            const {first, second, to} = insertions[pair];

            const leftPair = first + to;
            const rightPair = to + second;

            safeAdd(chars, to, count);
            safeAdd(newPairs, leftPair, count)
            safeAdd(newPairs, rightPair, count)
        }
    })

    pairs = newPairs;
}

function safeAdd(pairs, pair, amount) {
    if (!(pair in pairs)) {
        pairs[pair] = amount;
    } else {
        pairs[pair] += amount;
    }
}

let counts = Object
    .values(chars)
    .sort((a, b) => b - a)

console.log(chars);
console.log(counts.at(0) - counts.at(-1));
