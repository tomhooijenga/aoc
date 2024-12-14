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

(async () => {
    for (let i = 0; i < Number.MAX_SAFE_INTEGER; i++) {
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

        // Already submitted, too low.
        if (i < 6376) {
            continue;
        }
        // Already submitted, too high.
        if (i > 15000) {
            break;
        }

        if (detectFrame(input)) {
            const grid = Array.from({length: height}, () => Array.from({length: width}, () => '.'));

            for (const robot of input) {
                grid[robot.y][robot.x] = '#';
            }

            console.log(grid.map(row => row.join('')).join('\n'));
            console.error(i + 1);

            await new Promise(resolve => setTimeout(resolve, 700));
        }
    }
})();

function detectFrame(robots) {
    for (const robot of robots) {
        const frameRobots = robots.filter(({y}) => robot.y === y);

        if (frameRobots.length > 30) {
            return true;
        }
    }

    return false;
}