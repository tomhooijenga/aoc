const {read} = require('../../util');

const almanac = read()

let seeds = almanac[0].replace('seeds: ', '').split(' ').map(x => parseInt(x));
const maps = {};
let map = null;

almanac.slice(2).forEach((line) => {
    if (line.length === 0) {
        map = null;
        return;
    }

    if (line.endsWith(' map:')) {
        map = line.replace(' map:', '');
        maps[map] = [];
        return;
    }

    maps[map].push(
        line.split(' ').map(x => parseInt(x))
    )
});

function convert(seed, map) {
    // console.log('convrt', seed);
    for (let i = 0; i < map.length; i++) {
        const [destStart, sourceStart, range] = map[i];

        if (seed >= sourceStart && seed < sourceStart + range) {
            return seed + destStart - sourceStart;
        }
    }

    return seed;
}

function convertAll(seed) {
    return [
        'seed-to-soil',
        'soil-to-fertilizer',
        'fertilizer-to-water',
        'water-to-light',
        'light-to-temperature',
        'temperature-to-humidity',
        'humidity-to-location'
    ].reduce((seed, mapId) => {
        return convert(seed, maps[mapId])
    }, seed);
}

// not fast enough
let minSeed = Infinity;
for (let i = 0; i < seeds.length; i += 2) {
    for (let j = 0; j < seeds[i + 1]; j++) {
        const seed = convertAll(seeds[i] + j);

        if (seed < minSeed) {
            minSeed = seed;
        }
    }
}

console.log(minSeed);
