const {sum, read} = require('../util')

const pairs = {
    '(': ')',
    '[': ']',
    '{': '}',
    '<': '>'
}
const scores = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
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
                    return char;
                }
            } else {
                stack.push(char);
            }
        }
    })
    .filter(Boolean)
    .map((closer) => scores[closer])

console.timeEnd();
console.log(sum(result));