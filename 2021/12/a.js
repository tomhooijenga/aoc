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

function paths(cave, visited = [cave]) {
    if (cave === 'end') {
        return 1;
    }

    return input[cave].reduce((sum, cave) => {
        if (visited.includes(cave)) {
            return sum;
        }

        if (/[a-z]/.test(cave)) {
            return sum + paths(cave, [...visited, cave]);
        }

        return sum + paths(cave, visited);
    }, 0);
}

console.log(paths('start'));