import {readInput} from "./lib.js";

const input = readInput(7).map((line) => line.split(" ").map(x => parseInt(x)));

const answer = input
    .filter(([test, ...ops]) => {
        return combination(['+', '*'], ops.length).some((comb) => {
            const result = ops.reduce((acc, op, i) => {
                if (comb[i] === '+') return acc + op;
                if (comb[i] === '*') return acc * op;
            });
            return result === test;
        });
    })
    .map(([test]) => test)
    .reduce((acc, test) => acc + test, 0);

function combination(parts,N){
    const parts_normalize = []
    while (N--) parts_normalize.push(parts)
    return parts_normalize.reduce((a, b) => a.reduce((r, v) => r.concat(b.map(w => [].concat(v, w))), []));
}

console.log(answer);