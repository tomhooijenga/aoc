import {readInput} from "./lib.js";

const input = readInput(7).map((line) => line.split(" ").map(x => parseInt(x)));
const answer = input
    .filter(([test, ...ops]) => {
        console.log(ops.length);

        for (const comb of combination(['+', '*', '||'], ops.length)) {
            let result = ops[0];
            for (const [i, op] of ops.entries()) {
                if (i === 0) continue;

                if (comb[i] === '+') result += op;
                if (comb[i] === '*') result *= op;
                if (comb[i] === '||') result = concat(result, op);
            }

            if (result === test) {
                return true;
            }
        }

        return false;
    })
    .map(([test]) => test)
    .reduce((acc, test) => acc + test, 0);

function* combination(parts, N) {
    if (N === 0) {
        yield [];
    } else {
        for (const part of parts) {
            for (const subComb of combination(parts, N - 1)) {
                yield [part, ...subComb];
            }
        }
    }
}

function concat(a, b) {
    const sizeOfA = Math.log(b) * Math.LOG10E + 1 | 0;
    return a * (10 ** sizeOfA) + b;
}

// console.log(combination(['+', '*', '||'], 1));
// console.log([...combination(['+', '*'], 3)]);
console.log([...combination(['+', '*', '||'], 12)].length);
// console.log(combination(['+', '*', '||'], 11));

console.log(answer);