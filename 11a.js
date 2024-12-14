import {readInput} from "./lib.js";

const input = readInput(11).at(0).split(' ').map(stone => parseInt(stone));
const steps = 25
let stones = [...input];

for (let step = 0; step < steps; step++) {
    const newStones = [];

    for (let i = 0; i < stones.length; i++) {
        const stone = stones[i];

        if (stone === 0) {
            newStones.push(1);
        }
        else if (stone.toString().length % 2 === 0) {
            const stoneStr = stone.toString();
            newStones.push(
                parseInt(stoneStr.slice(0, stoneStr.length / 2)),
                parseInt(stoneStr.slice(stoneStr.length / 2))
            )
        }
        else {
            newStones.push(stone * 2024);
        }
    }

    stones = newStones;
}

console.log(stones.length);
