import {readInput} from "./lib.js";

const input = readInput(17);

let A = parseInt(input[0].match(/(\d+)/g)[0]);
let B = parseInt(input[1].match(/(\d+)/g)[0]);
let C = parseInt(input[2].match(/(\d+)/g)[0]);

const program = input[4].match(/(\d+)/g).map(Number);

const combos = [
    () => 0,
    () => 1,
    () => 2,
    () => 3,
    () => A,
    () => B,
    () => C,
    () => {
        throw new Error("7 is not valid")
    }
];

let pointer = 0;
const output = [];

const instructions = [
    // adv
    (combo) => {
        const comboValue = combos[combo]();

        A = Math.trunc(A / (2 ** comboValue));

        pointer += 2;
    },
    // bxl
    (literal) => {
        B = B ^ literal;

        pointer += 2;
    },
    // bst
    (combo) => {
        const comboValue = combos[combo]();

        B = comboValue % 8;

        pointer += 2;
    },
    // jnz
    (literal) => {
        if (A === 0) {
            pointer += 2;
            return;
        }

        pointer = literal;
    },
    // bxc
    () => {
        B = B ^ C;

        pointer += 2;
    },
    // out
    (combo) => {
        const comboValue = combos[combo]();

        output.push(comboValue % 8);

        pointer += 2;
    },
    // bdv
    (combo) => {
        const comboValue = combos[combo]();

        B = Math.trunc(A / (2 ** comboValue));

        pointer += 2;
    },
    // cdv
    (combo) => {
        const comboValue = combos[combo]();

        C = Math.trunc(A / (2 ** comboValue));

        pointer += 2;
    },
];

while (true) {
    const instruction = program[pointer];
    const operand = program[pointer + 1];

    if (pointer >= program.length) {
        break;
    }

    instructions[instruction](operand);
}

console.log(output.join(','));
