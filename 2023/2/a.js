const {read, sum} = require('../../util');

const config = {
    red: 12,
    green: 13,
    blue: 14
}

const answer = read()
    .map((line) => line.match(/(\d+): /))
    .map(match => ({
        id: match[1],
        input: match.input
    }))
    // .log()
    .map((game) => {
        game.sets = game.input
            .split(': ')[1]
            .split('; ')
            // .log()
            .map(set => set
                .split(', ')
                .map(x => x.split(' '))
                .reduce((obj, [amount, color]) => {
                    obj[color] = parseInt(amount);
                    return obj;
                }, {})
            );
        return game;
    })
    .map((game) => {
        game.possible = game.sets.every((set) => {
            return Object.entries(set).every(([color, amount]) => config[color] >= amount);
        });

        return game;
    })
    .log()
    .filter(game => game.possible)
    .map(game => game.id)

console.log(answer.curry(sum));