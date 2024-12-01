const {read, sum, chunk} = require('../../util');

const answer = read()
    .curry(chunk, 3)
    .map((group) => {
        const [a, b, c] = group

        for (const item of a) {
            if (b.includes(item) && c.includes(item)) {
                return item;
            }
        }
    })
    .map((item) => {
        const value = item.charCodeAt(0);

        // lowercase
        if (value >= 97) {
            return value - 96
        }
        return value - 38;
    })
    .curry(sum)

console.log(answer);