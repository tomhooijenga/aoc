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

for (const file of [...input].reverse()) {
    if (file.type !== 'file') {
        continue;
    }

    let free = null;
    const fileIndex = input.indexOf(file);
    for (let i = 0; i < fileIndex; i++) {
        const block = input[i];
        if (block.type === 'empty' && block.size >= file.size) {
            free = block;
            break;
        }
    }

    if (!free) {
        continue;
    }

    if (free.size > file.size) {
        input.splice(fileIndex, 1, {
            id: null,
            type: 'empty',
            size: file.size
        });

        input.splice(input.indexOf(free), 1, {
            id: file.id,
            type: 'file',
            size: file.size,
        },{
            id: null,
            type: 'empty',
            size: free.size - file.size,
        });
        const x = 1;
    } else {
        free.id = file.id;
        free.type = 'file';

        input.splice(fileIndex, 1, {
            id: null,
            type: 'empty',
            size: file.size
        });
    }

    mergeEmpty();
}

function mergeEmpty() {
    for (let i = 0; i < input.length - 1; i++) {
        const block = input[i];
        const nextBlock = input[i + 1];
        if (block.type === 'empty' && nextBlock.type === 'empty') {
            block.size += nextBlock.size;
            input.splice(i + 1, 1);
        }
    }
}

console.log(input);

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