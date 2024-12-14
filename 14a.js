import {readInput} from "./lib.js";

const input = readInput(14).map(line => {
    const [x, y, dx, dy] = line.match(/(-?\d+)/g)

    return {
        x: parseInt(x),
        y: parseInt(y),
        dx: parseInt(dx),
        dy: parseInt(dy),
        quadrant: null
    }
});


const width = 101;
const height = 103;
const seconds = 100;

for (let i = 0; i < seconds; i++) {
    for (const robot of input) {
        robot.x += robot.dx;
        robot.y += robot.dy;

        if (robot.x < 0) {
            robot.x = width + robot.x;
        }
        if (robot.y < 0) {
            robot.y = height + robot.y;
        }
        if (robot.x >= width) {
            robot.x = robot.x - width;
        }
        if (robot.y >= height) {
            robot.y = robot.y - height;
        }
    }
}

const scores = input
    .filter(({x, y}) => x !== Math.floor(width / 2) && y !== Math.floor(height / 2))
    .map((robot) => {
        const { x, y } = robot;
        robot.quadrant = `${Math.round(x / width)},${Math.round(y / height)}`;
        return robot;
    })
    .filter((robot) => robot.quadrant)
    .reduce((acc, robot) => {
        acc[robot.quadrant] = (acc[robot.quadrant] || 0) + 1;
        return acc;
    }, {});


console.log(scores);
console.log(Object.values(scores).reduce((acc, score) => acc * score, 1));
