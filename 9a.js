import {readInput} from "./lib.js";

const input = readInput(9)
    .at(0)
    .split('')
    .map((map, index) => {
        return {
            id: index % 2 === 0 ? index / 2 : null,
            type: index % 2 === 0 ? 'file' : 'empty',
            size: parseInt(map),
        }
    });

let fileToMove = input.pop();
for (const [index, block] of input.entries()) {
    if (block.type !== 'empty') {
        continue;
    }

    if (block.size > fileToMove.size) {
        input.splice(index, 1, {
            id: fileToMove.id,
            type: 'file',
            size: fileToMove.size,
        },{
            id: null,
            type: 'empty',
            size: block.size - fileToMove.size,
        });

        fileToMove = takeLastFile();
    } else if (block.size === fileToMove.size) {
        block.id = fileToMove.id;
        block.type = 'file';
        fileToMove.size -= block.size;

        fileToMove = takeLastFile();
    } else {
        block.id = fileToMove.id;
        block.type = 'file';
        fileToMove.size -= block.size;
    }
}

if (fileToMove.id === input.at(-1).id) {
    input.at(-1).size += fileToMove.size;
} else {
    input.push(fileToMove);
}


function takeLastFile() {
    let file = input.pop();
    while (file.type === 'empty') {
        file = input.pop();
    }
    return file;
}

let totalSize = 0;
const answer = input
    .map(({id, size}) => {
        let total = 0;
        for (let i = totalSize; i < totalSize + size; i++) {
            total += i * id;
        }
        totalSize += size;

        return total;
    })
    .reduce((sum, value) => sum + value, 0);

console.log(answer);