const {read, sum} = require('../../util');

const map = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9
}

const answer = read()
    .map(line => line.match(/(one|two|three|four|five|six|seven|eight|nine|\d)/g))
    .map((matches) =>{
        const first = matches.at(0);
        const last = matches.at(-1);

        return `${map[first] ?? first}${map[last] ?? last}`
    })
    // .curry(console.log)
    .map(x => parseInt(x))
    .curry(sum)

console.log((answer));