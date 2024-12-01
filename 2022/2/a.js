const {read, sum} = require('../../util');

const shapes = {
    rock: 1,
    paper: 2,
    scissors: 3,

    A: 1,
    B: 2,
    C: 3,

    X: 1,
    Y: 2,
    Z: 3,
}

const scores = {
    win: 6,
    draw: 3,
    lose: 0
}

const wins = ['A Y', 'B Z', 'C X']

const answer = read().map(line => {
    const [opponent, you] = line.split(' ');

    let result = scores.lose;

    if (shapes[opponent] === shapes[you]) {
        result = scores.draw;
    }
    else if (wins.includes(line)) {
        result = scores.win;
    }

    return result + shapes[you];
})

console.log((answer));
console.log(sum(answer));