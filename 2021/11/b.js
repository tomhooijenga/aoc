const {read, sum} = require("../util");

let input = read()
    .map(line => line.split('').map((num) => parseInt(num)))

function increase(x, y) {
    input[y][x] = input[y][x] + 1;
}

function neighbours(x, y) {
    return [
        [y - 1, x - 1],
        [y - 1, x - 0],
        [y - 1, x + 1],

        [y - 0, x - 1],
        [y + 0, x + 1],

        [y + 1, x - 1],
        [y + 1, x - 0],
        [y + 1, x + 1],
    ]
}

function iterate(cb) {
    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[0].length; x++) {
            cb(input[y][x], x, y);
        }
    }
}

function step() {
    iterate((_, x, y) => {
        increase(x, y);
    })

    let flashedNow = -1;
    let flashTotal = 0;

    while ((flashedNow = flash()) > 0) {
        flashTotal += flashedNow;
    }

    return flashTotal;
}

function flash() {
    let flashed = 0;

    iterate((octo, x, y) => {
        if (octo > 9) {
            neighbours(x, y).forEach(([y, x]) => {
                const neighbour = input?.[y]?.[x];

                if (neighbour !== undefined && neighbour !== 0) {
                    increase(x, y);
                }
            })
            input[y][x] = 0;
            flashed++;
        }
    });

    return flashed;
}

const megaflash = '0'.repeat(100);

for (let i = 0; ; i++) {
    step();
    if (input.flat().join('') === megaflash) {
        console.log(i);
        break;
    }
}