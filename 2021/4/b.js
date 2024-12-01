const {read, sum} = require("../util");
let [numbers, _, ...rawBoards] = read();

numbers = numbers.split(',')
let boards = [];
for (let i = 0; i < rawBoards.length; i += 6) {
    const numbers = rawBoards
        .slice(i, i + 5)
        .map((row) => row.trim().split(/\s+/))
        .flat()

    boards.push({
        numbers,
        rows: new Array(5).fill(0),
        cols: new Array(5).fill(0),
    });
}

function getRow(index) {
    return Math.floor(index / 5);
}

function getCol(index) {
    return index % 5;
}

const called = new Set();
const winners = [];
let number;
for (let i = 0; i < numbers.length; i++) {
    number = numbers[i];

    called.add(number);

    const winners = boards.filter((board) => {
        const index = board.numbers.indexOf(number);

        if (index === -1) {
            return;
        }

        const row = getRow(index);
        const col = getCol(index);

        board.rows[row]++;
        board.cols[col]++;

        return board.rows[row] === 5 || board.cols[col] === 5;
    });

    if (winners.length) {
        boards = boards.filter(board => !winners.includes(board));

        if (boards.length === 0) {
            const winner = winners.pop();
            const unmarkedSum = sum(winner.numbers.filter((num) => !called.has(num)));
            console.log(number, unmarkedSum, number * unmarkedSum);
            break;
        }
    }
}