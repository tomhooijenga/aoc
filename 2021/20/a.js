const {read, makeGrid, logGrid, iterateGrid} = require("../util");

let [enhancement, , ...image] = read();

enhancement = enhancement.split('').map(char => char === '#' ? 1 : 0);
const height = image.length - 1;
const width = image[0].length - 1;
image = image.map(line => line.split('').map(char => char === '#' ? 1 : 0));

const grid = makeGrid(width, height);
image.forEach((line, y) => line.forEach((pixel, x) => grid[y][x] = pixel));

function getPixelIndex(image, x, y) {
    return [
        image[y - 1]?.[x - 1],
        image[y - 1]?.[x],
        image[y - 1]?.[x + 1],

        image[y][x - 1],
        image[y][x],
        image[y][x + 1],

        image[y + 1]?.[x - 1],
        image[y + 1]?.[x],
        image[y + 1]?.[x + 1],
    ]

        .map((pixel) => pixel === undefined ? 0 : pixel)
        .reduce((value, pixel, index, pixels) => {
            if (pixel === 0) {
                return value;
            }
            return value + 2 ** (pixels.length - index - 1)
        }, 0);
}

const newGrid = makeGrid(width, height)
iterateGrid(grid, (x, y) => {
    const pixelIndex = getPixelIndex(image, x, y)
    newGrid[y][x] = enhancement[pixelIndex]
})

logGrid(grid);

iterateGrid(grid, (x, y, cell) => {
    const pixelIndex = getPixelIndex(image, x, y)
    return enhancement[pixelIndex]
})

logGrid(grid);

image = image.map((_, index) => {
    return enhancement[getPixelIndex(image, index)]
})

console.log(image.filter(Boolean).length);