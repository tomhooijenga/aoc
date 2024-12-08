import fs from 'node:fs';

/**
 * Read input from a day and return it as an array of strings
 */
export function readInput(day) {
    const input = fs.readFileSync(`./inputs/${day}.txt`, 'utf-8');

    return input.split('\r\n');
}

/**
 * Return a specific group from a regex match
 */
export function regexGroup(line, regex, group) {
    const match = line.match(regex);

    return match?.[group];
}

export function iterGrid(grid, callback) {
    for (let y = 0; y < grid.length; y++) {
        const line = grid[y];
        for (let x = 0; x < line.length; x++) {
            callback(line[x], x, y);
        }
    }
}