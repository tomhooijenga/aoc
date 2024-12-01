const {read, sum} = require('../../util');

const schema = read();
const width = schema[0].length;

const isDigit = x => /\d/.test(x)

const neighbourIsPart = (schema, x, y) => {
    const neighbour = schema[y]?.[x];

    return neighbour !== undefined && neighbour !== '.' && !isDigit(neighbour)
}

const answer = schema.map((line, y) => {
    let sum = 0;

    for (let x = 0; x < line.length; x++) {
        let num = '';

        for (let numStart = x; isDigit(line[numStart]); numStart++) {
            num += line[numStart];
        }

        if (!num) {
            continue;
        }

        let include = false;

        for (let i = 0; i < num.length; i++) {
            include = neighbourIsPart(schema, x + i, y - 1)
            || neighbourIsPart(schema, x + i, y + 1)

            if (include) {
                break;
            }
        }

        // first digit
        include = include
            || neighbourIsPart(schema, x - 1, y) // mid left
            || neighbourIsPart(schema, x - 1, y - 1) // top left
            || neighbourIsPart(schema, x - 1, y + 1) // bot left;

        // last digit
        include = include
            || neighbourIsPart(schema, x + num.length, y) // mid r
            || neighbourIsPart(schema, x + num.length, y - 1) // top r
            || neighbourIsPart(schema, x + num.length, y + 1) // bot r;

        x += num.length;

        if (include) {
            sum += +num;
        }
    }

    return sum;
}).curry(sum)

console.log((answer));