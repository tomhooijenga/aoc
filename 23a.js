import {readInput} from "./lib.js";

const connections = new Map();

readInput(23)
    .map((line) => {
        const [left, right] = line.split("-");

        connections.set(left, []);
        connections.set(right, []);

        return [left, right];
    })
    .forEach(([left, right]) => {
        connections.get(left).push(right);
        connections.get(right).push(left);
    });

const x= [];

for (const [computer, peers] of connections) {
    if (peers.length < 2) {
        continue;
    }

    for (let i = 0; i < peers.length - 1; i++) {
        const p1 = peers[i];
        for (let j = i + 1; j < peers.length; j++) {
            const p2 = peers[j];

            if (!connections.get(p1).includes(p2)) {
                continue;
            }

            if (computer.startsWith('t') || p1.startsWith('t') || p2.startsWith('t')) {
                x.push([computer, p1, p2].sort().join(","));
            }
        }
    }
}

// console.log([...new Set(x)].sort().join("\n"));
console.log([...new Set(x)].length);
