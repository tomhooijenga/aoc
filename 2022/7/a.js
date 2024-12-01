const {read, sum} = require('../../util');

const root = {
    '..': null,
    size: 0,
}
let dir = root;
const answer = read().forEach((line) => {
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

console.log(leaves(root).map(dir => dir.size).filter(size => size <= 100000).curry(sum));