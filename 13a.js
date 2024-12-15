import {readInput} from "./lib.js";

const input = readInput(13);
const machines = []

for (let i = 0; i < input.length; i += 4) {
    const a = input[i].match(/(\d+)/g);
    const b = input[i + 1].match(/(\d+)/g);
    const prize = input[i + 2].match(/(\d+)/g);

    machines.push({
        a,
        b,
        prize
    })
}

const prizes = [];

for (const {a, b, prize} of machines) {
    console.log(prize);
    for (let aPress = 0; aPress < 100; aPress++) {
        for (let bPress = 0; bPress < 100; bPress++) {
            const x = a[0] * aPress + b[0] * bPress;
            const y = a[1] * aPress + b[1] * bPress;

            if (x == prize[0] && y == prize[1]) {
                prizes.push({aPress, bPress, prize, tokens: aPress * 3 + bPress})
            }
        }
    }
}

console.log(prizes.reduce((sum, {tokens}) => sum + tokens, 0));