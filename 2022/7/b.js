const {read, sum} = require('../../util');

const root = {
    '..': null,
    size: 0,
}
let dir = root;
read().forEach((line) => {
    if (line.startsWith('$')) {
        const [, cmd, d] = line.split(' ');

        if (cmd === 'cd') {
            if (d === '/') {
                dir = root;
            } else {
                dir = dir[d];
            }
        }
        else if (cmd === 'ls') {
            // don't really care
        }
    } else {
        let [left, right] = line.split(' ');

        if (left === 'dir') {
            dir[right] = {
                '..': dir,
                size: 0,
            }
        } else {
            let d = dir;

            while (d) {
                d.size += parseInt(left);
                d = d['..']
            }
        }
    }
})

function leaves(node) {
    return Object
        .keys(node)
        .filter((k) => k !== 'size' && k !== '..')
        .map((key) => node[key])
        .map((child) => [child, ...leaves(child)])
        .flat()
}

const disk = 70000000;
const used = root.size;
const free = disk - used;
const needed = 30000000 - free;

const answer = leaves(root)
    .map(dir => dir.size)
    .filter(size => size >= needed)
    .sort((a, b) => a - b)
    .at(0);

console.log(answer);