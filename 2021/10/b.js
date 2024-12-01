const {read} = require('../util')

const pairs = {
    '(': ')',
    '[': ']',
    '{': '}',
    '<': '>'
}
const scores = {
    '(': 1,
    '[': 2,
    '{': 3,
    '<': 4
}
const closers = new Set(Object.values(pairs));

const input = read();
console.time();
const result = input
    .map(line => {
        const stack = [];
        for (const char of line) {
            if (closers.has(char)) {
                const opener = stack.pop();

                if (pairs[opener] !== char) {
                    return false;
                }
            } else {
                stack.push(char);
            }
        }
        return stack;
    })
    .filter(Boolean)
    .map(closers => {
        return closers.reduceRight((sum, closer) => {
            return sum * 5 + scores[closer];
        }, 0);
    })
    .sort((a, b) => a - b);
console.timeEnd();
console.log(result[(result.length - 1) / 2]);