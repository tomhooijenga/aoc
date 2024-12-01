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

const wins = {
    A: 'Y',
    B: 'Z',
    C: 'X',
}

const loses = {
    A: 'Z',
    B: 'X',
    C: 'Y',
}

const answer = read().map(line => {
    const [opponent, outcome] = line.split(' ');

    let you = shapes[opponent];
    let result = scores.draw;

    // lose
    if (outcome === 'X') {
        you = shapes[loses[opponent]];
        result = scores.lose;
    }
    // win
    else if (outcome === 'Z') {
        you = shapes[wins[opponent]];
        result = scores.win;
    }

    return result + you;
})

console.log((answer));
console.log(sum(answer));