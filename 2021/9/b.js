const {sum, read, getCol, getRow, product} = require('../util')

let inputGrid = read()
    .map(line => line.split(''))
    .map(line => line.map(number => parseInt(number)))

const width = inputGrid[0].length;
const height = inputGrid.length

input = inputGrid
    .flat()

function getNeighbours(map, index) {
    return [
        map[index - width],
        map[index + 1],
        map[index + width],
        map[index - 1]
    ].filter(neighbour => neighbour !== undefined);
}

function isLowPoint(number, neighbours) {
    return neighbours.every(neighbour => neighbour > number);
}

function outOfBounds(oldIndex, newIndex) {
    const col = getCol(newIndex, width);
    const row = getRow(newIndex, width);

    if (col !== getCol(oldIndex, width) && row !== getRow(oldIndex, width)) {
        return true;
    }

    return col < 0 || col >= width || row < 0 || row >= height
}


const lows = input
    .reduce((lows, point, index) => {
        if (isLowPoint(point, getNeighbours(input, index))) {
            lows.push(index);
        }
        return lows;
    }, [])
    .map((startIndex) => {

        function count(low, index, delta, visited) {
            const neighbourIndex = index + delta;
            const neighbour = input[neighbourIndex];

            if (outOfBounds(index, neighbourIndex)) {
                return 0;
            }
            //
            if (low > neighbour) {
                return 0;
            }
            //
            if (neighbour === 9) {
                return 0;
            }

            if (visited.has(neighbourIndex)) {
                return 0;
            }

            visited.add(neighbourIndex)

            return 1
                + count(neighbour, neighbourIndex, -1, visited)
                + count(neighbour, neighbourIndex, 1, visited)
                + count(neighbour, neighbourIndex, -width, visited)
                + count(neighbour, neighbourIndex, width, visited)
        }

        console.log('start', startIndex, input[startIndex]);
        return count(input[startIndex], startIndex, 0, new Set);
    })
    .sort((a, b) => a -b)
    .slice(-3);


console.log(product(lows));