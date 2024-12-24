import {readInput} from "./lib.js";

const input = readInput(24);

const brk = input.findIndex(line => line === "");

const wires = new Map(input.slice(0, brk).map((line) => {
    const [wire, value ] = line.split(': ')

    return [wire, value === '1'];
}));

const gateFns = {
    AND(gate) {
        const {first, second, target} = gate;

        wires.set(target, wires.get(first) && wires.get(second));
    },
    OR(gate) {
        const {first, second, target} = gate;

        wires.set(target, wires.get(first) || wires.get(second));
    },
    XOR(gate) {
        const {first, second, target} = gate;

        wires.set(target, wires.get(first) !== wires.get(second));
    }
}

const gates = input.slice(brk + 1).map((line) => {
    const [, first, type, second, target] = /(\w+) (\w+) (\w+) -> (\w+)/.exec(line);

    return {
        first,
        type,
        second,
        target,
    }
});

const seen = new Set();
const queue = [...gates];

while (queue.length) {
    const gate = queue.shift();

    if (seen.has(gate)) {
        continue;
    }

    const { first, second, target } = gate;

    if (wires.has(first) && wires.has(second)) {
        seen.add(gate);

        gateFns[gate.type](gate);

        const targets = gates.filter(({first, second}) => first === target || second === target);

        queue.unshift(...targets);
    }
}

console.log(
    [...wires.entries()]
        // .filter(([wire]) => wire.startsWith('z'))
        .map(([wire, value]) => `${wire}: ${value ? 1 : 0}`)
        .sort()
        .join('\n')
);

console.log(
    parseInt(
        [...wires.entries()]
        .filter(([wire]) => wire.startsWith('z'))
        .sort(([a], [b]) => b.localeCompare(a))
        .map(([, value]) => value ? 1 : 0)
        .join('')
    , 2)
);