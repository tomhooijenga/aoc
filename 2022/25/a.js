const {read, sum} = require('../../util');

// 1, 5, 25, 125, 625
// - = -1
// = = -2

function toSnafu(num) {
    let sn = [];

    while (num > 0) {
        const remainder = num % 5;
        num = Math.floor(num / 5);

        sn.unshift(remainder);
    }

    sn.unshift(0);

    for (let i = sn.length - 1; i >= 0; i--) {
        const digit = sn[i];

        if (digit === 3) {
            sn[i - 1]++;
            sn[i] = '='
        }
        if (digit === 4) {
            sn[i - 1]++;
            sn[i] = '-'
        }
        if (digit === 5) {
            sn[i - 1]++;
            sn[i] = 0;
        }
    }

    if (sn[0] === 0) {
        sn.shift();
    }

    return sn.join('');
}

// console.log(2, toSnafu(2));
// console.log(3, toSnafu(3));
// console.log(4, toSnafu(4));
// console.log(5, toSnafu(5));
// console.log(8, toSnafu(8));
// console.log(10, toSnafu(10));
// console.log(15, toSnafu(15));
// console.log(20, toSnafu(20));
// console.log(2022, toSnafu(2022));
// console.log(12345, toSnafu(12345));
// console.log(314159265, toSnafu(314159265));

// console.log(fromSnafu('1=2-2'))
// console.log(fromSnafu('1=11-2'))

function fromSnafu(sn) {
    let value = 0;

    const digits = {
        '=': -2,
        '-': -1,
        0: 0,
        1: 1,
        2: 2
    };

    for (let i = 0; i < sn.length; i++) {
        const char = sn[i];
        const power = sn.length - i - 1;
        value += digits[char] * (5 ** power);
    }

    return value;
}

const answer = read().map((line) => fromSnafu(line)).curry(sum);

console.log(toSnafu(answer));