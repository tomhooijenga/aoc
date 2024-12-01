const {read} = require("../util");

const input = read().map((cmd) => {
        const [action, value] = cmd.split(' ');
        return [action, parseInt(value)]
    });

const coord = {
    forward: 0,
    depth: 0,
    aim: 0,
}
const actions = {
    forward(amount) {
        coord.forward += amount;
        coord.depth += coord.aim * amount;
    },
    up(amount) {
        coord.aim -= amount;
    },
    down(amount) {
        coord.aim += amount;
    }
}

input.forEach(([cmd, amount]) => actions[cmd](amount));

console.log(coord, coord.depth * coord.forward);