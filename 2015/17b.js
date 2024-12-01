const {sum} = require("../util");
const elements = `33
14
18
20
45
35
16
35
1
13
18
13
50
44
48
6
24
41
30
42`.split('\n')

const getAllSubsets =
    theArray => theArray.reduce(
        (subsets, value) => subsets.concat(
            subsets.map(set => [value, ...set])
        ),
        [[]]
    );

const containers = getAllSubsets(elements)
    .filter((subset) => sum(subset) === 150)
    .sort((a, b) => a.length - b.length)

console.log(
    containers
        .filter((set) => set.length === containers[0].length)
        .length
)