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

console.log(sum(Array.from({length: 100}).map(() => step())));
// step();
// check(`6594254334
// 3856965822
// 6375667284
// 7252447257
// 7468496589
// 5278635756
// 3287952832
// 7993992245
// 5957959665
// 6394862637`);
// // check(`34543
// // 40004
// // 50005
// // 40004
// // 34543`)
//
// step();
// check(`8807476555
// 5089087054
// 8597889608
// 8485769600
// 8700908800
// 6600088989
// 6800005943
// 0000007456
// 9000000876
// 8700006848`);
//
// step();
// check(`0050900866
// 8500800575
// 9900000039
// 9700000041
// 9935080063
// 7712300000
// 7911250009
// 2211130000
// 0421125000
// 0021119000`)
// // check(`45654
// // 51115
// // 61116
// // 51115
// // 45654`)

function check(expected) {
    expected = expected.replace(/\s/g, '');
    if (input.flat().join('') === expected) {
        console.log('bueno');
        return;
    }

    console.log(
        input
            .map((line, y) => {
                return line.map((num, x) => {
                    if (num != expected[y * 10 + x]) {
                        return `\x1b[31m${num.toString().padStart(3, ' ')}\x1b[0m`
                    }

                    return num.toString().padStart(3, ' ')
                }).join('')
            })

            .join('\n'),
        '\n\n'
    );
}