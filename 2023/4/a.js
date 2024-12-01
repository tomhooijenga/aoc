const {read, sum} = require('../../util');

const answer = read()
    .map((line) => line.split(/Card +\d+: +/)[1])
    .map(line => line.split(' | '))
    .map(([winning, having]) => [
        winning.trim().split(/ +/),
        having.trim().split(/ +/),
    ])
    // .map(([winning, having]) => {
    //     if (having.length !== 25) {
    //         throw 'nope';
    //     }
    //     if (winning.length !== 10) {
    //         throw 'nope';
    //     }
    // })
    .map(([winning, having]) => [
        new Set(winning),
        having
    ])
    .map(([winning, having]) => {
        return having.filter((num) => winning.has(num));
        // return [
        //     having.filter((num) => winning.has(num)),
        //     [...winning].filter(num => having.includes(num))
        // ]
    })
    .map(matches => matches.length ? 2 ** (matches.length - 1) : 0)
    .log()
    .curry(sum)

console.log((answer));