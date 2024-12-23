import {readInput} from "./lib.js";

const input = readInput(22);

function next(prev) {
    let result;
    let secret = prev;

    result = secret * 64n;
    secret = secret ^ result;
    secret = secret % 16777216n;

    result = secret / 32n;
    // result = Math.floor(result);
    secret = secret ^ result;
    secret = secret % 16777216n;

    result = secret * 2048n;
    secret = secret ^ result;
    secret = secret % 16777216n;

    return secret;
}

const counts = new Map();

input
    .map(BigInt)
    .map(x => {
        const numbers = [x];

        for (let i = 0; i < 2000; i++) {
            x = next(x);
            numbers.push(x);
        }

        return numbers;
    })
    .map((numbers) => {
        return numbers.map((num, i) => {
            return parseInt(num.toString().at(-1));
        });
    })
    // .map((numbers) => {
    //     return numbers.map((num, i) => {
    //         return [num, num - numbers[i - 1]];
    //     })
    // })
    .map((numbers) => {
        const seen = new Set();

        for (let i = 0; i < numbers.length - 4; i++) {
            const [a, b, c, d, e] = numbers.slice(i, i + 5);

            const key = `${b - a},${c - b},${d - c},${e - d}`;

            if (seen.has(key)) {
                continue;
            }

            seen.add(key);

            if (counts.has(key)) {
                // counts.get(key).push(e);
                counts.set(key, counts.get(key) + e);
            } else {
                // counts.set(key, [e]);
                counts.set(key, e);
            }
        }
    });

const answer = [...counts.entries()].sort((a, b) => b[1] - a[1]);//.at(0).at(1);

console.log(answer.at(0).at(1));