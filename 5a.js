import {readInput} from "./lib.js";

const input = readInput(5);

const splitIndex = input.findIndex((line) => line === '');
const orderings =     input
    .slice(0, splitIndex)
    .map((line) => line.split('|'))

const updates = input
    .slice(splitIndex + 1)
    .map((line) => line.split(','));

function isOrdered(update) {
    for (const [index, page] of update.entries()) {
        for (const [orderingPage, beforePage] of orderings) {
            if (orderingPage !== page) {
                continue
            }

            const beforePageIndex = update.indexOf(beforePage);

            if (beforePageIndex === -1 || beforePageIndex > index) {
              continue;
            }

            return false;
        }
    }

    return true;
}
const answer = updates
    .filter((update) => isOrdered(update))
    .reduce((acc, update) => {
        return acc + +update[Math.floor(update.length / 2)];
    }, 0);

// assert.ok(isOrdered(updates[0]));
// assert.ok(isOrdered(updates[1]));
// assert.ok(isOrdered(updates[2]));
// assert.ok(!isOrdered(updates[3]));

console.log(answer);