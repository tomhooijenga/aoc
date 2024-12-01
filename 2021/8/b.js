const {sum, read} = require('../util')

const nums = new Set([2, 4, 3, 7])
const input = read()
    .map((line) => line.replace(' |', '').split(' ').map(sort))

function sort(str) {
    return str.split('').sort().join('');
}

function detectKnown(patterns, number) {
    const known = {
        2: 1,
        4: 4,
        3: 7,
        7: 8
    }

    if (number.length in known) {
        return known[number.length];
    }
}


function detect(patterns, number) {
    if (number in patterns) {
        return patterns[number]
    }

    if (number.length === 6) {
        // 0, 6, 9
        if (minus(patterns, number, 1).length === 4) {
            // 0, 9
            if (minus(patterns, number, 4).length === 3) {
                return 0;
            }

            return 9;
        }

        return 6;
    }

    if (number.length === 5) {
        // 2, 3, 5
        if (minus(patterns, number, 7).length === 3) {
            // 2, 5
            if (minus(patterns, number, 4).length === 3) {
                return 2;
            }

            return 5;
        }

        return 3;
    }
}

function minus(patterns, number, remove) {
    for (const pattern in patterns) {
        if (patterns[pattern] === remove) {
            const regex = new RegExp(pattern.split('').join('|'), 'g');

            return number.replace(regex, '');
        }
    }
    return '';
}

const answer = input
    .map((line) => {
        const patterns = {};
        line.forEach((number) => {
            const value = detectKnown(patterns, number);

            if (value !== undefined) {
                patterns[number] = value;
            }
        })
        line.forEach((number) => {
            const value = detect(patterns, number);

            if (value !== undefined) {
                patterns[number] = value;
            }
        })
        line.forEach((number) => {
            const value = detect(patterns, number);

            if (value !== undefined) {
                patterns[number] = value;
            }
        })
        // console.log(patterns)
        return line
            .map((pattern) => patterns[pattern])
            .slice(-4)
            .join('');
    })
    // .flat()

console.log(answer.join('\n'), sum(answer))