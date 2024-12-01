const {read, sum} = require("../util");

let input = read()
    .map(line => line.split('-'))
    .reduce((obj, [from, to]) => {
        if (!obj[from]) {
            obj[from] = []
        }
        if (!obj[to]) {
            obj[to] = []
        }

        obj[from].push(to);
        obj[to].push(from);
        return obj;
    }, {})

function paths(cave, visited = [], considerSmallTwice = true) {
    if (cave === 'end') {
        return 1;
    }

    if (/[a-z]/.test(cave)) {
        visited = [...visited, cave]
    }

    return input[cave].reduce((sum, cave) => {
        if (visited.includes(cave)) {
            if (considerSmallTwice && cave !== 'start') {
                return sum + paths(cave, visited, false);
            }

            return sum;
        }

        return sum + paths(cave, visited, considerSmallTwice);
    }, 0);
}

console.log(paths('start'));