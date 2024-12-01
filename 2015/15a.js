// Sprinkles: capacity 2, durability 0, flavor -2, texture 0, calories 3
// Butterscotch: capacity 0, durability 5, flavor -3, texture 0, calories 3
// Chocolate: capacity 0, durability 0, flavor 5, texture -1, calories 8
// Candy: capacity 0, durability -1, flavor 0, texture 5, calories 8

const {sum} = require("../util");
const ingr = `Sprinkles: capacity 2, durability 0, flavor -2, texture 0, calories 3
Butterscotch: capacity 0, durability 5, flavor -3, texture 0, calories 3
Chocolate: capacity 0, durability 0, flavor 5, texture -1, calories 8
Candy: capacity 0, durability -1, flavor 0, texture 5, calories 8`
    .split('\n')
    .map((line) => line
        .match(/-?\d/g)
        // .slice(0, -1)
        .map(num => parseInt(num))
    )

const max = 100;
const combinations = [];

function score(property, amounts) {
    let sum = 0;

    for (const [ingredient, amount] of amounts.entries()) {
        sum += ingr[ingredient][property] * amount;
    }

    return sum > 0 ? sum : 0;
}

for (let a = 1; a <= max; a++) {
    for (let b = 1; b <= max - a; b++) {
        for (let c = 1; c <= max - a - b; c++) {
            const d = max - a - b - c;

            const amounts = [a, b, c, d];
            const calories = score(4, amounts);

            if (calories === 500) {
                const combinationScore =
                    score(0, amounts)
                    * score(1, amounts)
                    * score(2, amounts)
                    * score(3, amounts)

                combinations.push(combinationScore);
            }
        }
    }
}

console.log(combinations.sort((a, b) => b - a).at(0));
