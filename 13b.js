import {readInput} from "./lib.js";

const input = readInput(13);
const machines = []

for (let i = 0; i < input.length; i += 4) {
    const a = input[i].match(/(\d+)/g);
    const b = input[i + 1].match(/(\d+)/g);
    const prize = input[i + 2].match(/(\d+)/g);

    machines.push({
        a: [parseInt(a[0]), parseInt(a[1])],
        b: [parseInt(b[0]), parseInt(b[1])],
        prize: [
            10000000000000 + parseInt(prize[0]),
            10000000000000 + parseInt(prize[1]),
        ]
    })
}

let total = 0;

for (const {a, b, prize} of machines) {
    const [ax, ay] = a;
    const [bx, by] = b;
    const [x, y] = prize;
    const A = (bx*y - by*x) / (bx*ay - by*ax)
    const B = (x-ax*A) / bx

    if (Math.abs(A - Math.round(A)) > 0.0001 || Math.abs(B - Math.round(B)) > 0.0001) {
        continue;
    }

    total += 3*A + B
}

console.log(total);
