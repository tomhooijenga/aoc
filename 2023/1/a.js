const {read, sum} = require('../../util');

const answer = read().map(line => line.match(/(\d).*(\d)|(\d)/))
    .map(([, left, right, single]) => single ? `${single}${single}` : `${left}${right}`)
    .map(x => parseInt(x))
    .curry(sum)

console.log((answer));