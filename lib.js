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