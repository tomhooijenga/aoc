const {read} = require("../util");

let [polymer, , ...insertions] = read();

polymer = polymer.split('');

insertions = Object.fromEntries(
    insertions.map((line) => line.split(' -> '))
)

console.log(polymer, insertions);

for (let iter = 0; iter < 10; iter++) {
    for (let i = 0; i < polymer.length - 1; i++) {
        const char = polymer[i];
        const nextChar = polymer[i + 1];
        const pair = char + nextChar;

        if (insertions[pair]) {
            polymer.splice(i + 1, 0, insertions[pair]);
            i++;
        }
    }
}

const counts = Object.values(
    polymer.reduce((map, element) => {
        if (!map[element]) {
            map[element] = 0;
        }
        map[element]++;
        return map;
    }, {})
).sort((a, b) => b - a)

console.log(counts.at(0) - counts.at(-1));
