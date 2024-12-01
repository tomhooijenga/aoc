const {read} = require('../../util');

const answer = read()

const newline = answer.indexOf('');
const crateWidth = parseInt(answer[newline - 1].match(/\d+\s+$/)[0].trim());

const crates = answer
    .slice(0, newline - 1)
    .reduce((c, line) => {
        for (let i = 0; i < line.length;) {
            const crate = line.slice(i, i + 3);

            if (crate !== '   ') {
                c[Math.floor(i / 4) + 1].push(crate);
            }
            // crate
            i += 3;
            // separator
            i += 1;
        }

        return c;
    }, Array.from({length: crateWidth + 1}).map(() => []))
    .map((stack) => stack.reverse());

answer.slice(newline + 1).forEach((line) => {
    const [, amount, from, to] = line
        .match(/move (\d+) from (\d+) to (\d+)/)
        .map(x => parseInt(x));

    for (let i = 0; i < amount; i++) {
        const crate = crates[from].pop();
        crates[to].push(crate);
    }
});

console.log(
    crates
        .slice(1)
        .map(stack => stack.at(-1))
        .map(str => str[1])
        .join('')
);

//console.log((answer));