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

const answer = input.map(BigInt).map(x => {
    for (let i = 0; i < 2000; i++) {
        x = next(x);
    }

    return x;
}).reduce((acc, x) => acc + x, 0n);

console.log(answer);