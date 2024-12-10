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

function sort(update) {
    const sorted = [update[0]];

    for (const [index, page] of update.slice(1).entries()) {

        const befores = orderings
            .filter(([orderingPage]) => orderingPage === page)
            .map(([ , beforePage]) => beforePage)
            .map((beforePage) => sorted.indexOf(beforePage))
            .filter((beforePageIndex) => beforePageIndex !== -1);
        const afters = orderings
            .filter(([ , beforePage]) => beforePage === page)
            .map(([orderingPage]) => orderingPage)
            .map((orderingPage) => sorted.indexOf(orderingPage))
            .filter((orderingPageIndex) => orderingPageIndex !== -1);

        const index = befores.length ? Math.min(...befores) : Math.max(...afters) + 1;

        sorted.splice(index, 0, page);
    }

    return sorted;
}

const answer = updates
    .filter((update) => !isOrdered(update))
    .map((update) => sort(update))
    .reduce((acc, update) => {
        return acc + +update[Math.floor(update.length / 2)];
    }, 0);

// assert.ok(sort([75,97,47,61,53]).join(',') === '97,75,47,61,53');

console.log(answer);