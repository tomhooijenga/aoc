const assert = require('assert');
const {sum} = require("../util");

const TYPE_LITERAL = 4;
const LENGTH_BITS = 0;
const LENGTH_PACKETS = 1;

function toBits(str) {
    return str
        .split('')
        .map((char) =>
            parseInt(char, 16).toString(2).padStart(4, '0'))
        .join('');
}

assert(toBits('D2FE28') === '110100101111111000101000')
assert(toBits('38006F45291200') === '00111000000000000110111101000101001010010001001000000000')
assert(toBits('EE00D40C823060') === '11101110000000001101010000001100100000100011000001100000')

function getVersion(bits) {
    return parseInt(bits.substr(0, 3), 2);
}

assert.equal(getVersion('110100101111111000101000'), 6)
assert.equal(getVersion('00111000000000000110111101000101001010010001001000000000'), 1)
assert.equal(getVersion('11101110000000001101010000001100100000100011000001100000'), 7)

function getType(bits) {
    return parseInt(bits.substr(3, 3), 2);
}

assert.equal(getType('110100101111111000101000'), 4)
assert.equal(getType('00111000000000000110111101000101001010010001001000000000'), 6)
assert.equal(getType('11101110000000001101010000001100100000100011000001100000'), 3)

function getLiteralPart(bits) {
    let parts = '';
    let start = 0;
    while (true) {
        const marker = bits[start];
        const part = bits.substr(start + 1, 4);

        parts += part;
        start += 5;

        if (marker === '0') {
            break;
        }
    }

    return parts;
}

function getLengthId(bits) {
    return parseInt(bits[6]);
}

assert.equal(getLengthId('00111000000000000110111101000101001010010001001000000000'), 0)
assert.equal(getLengthId('11101110000000001101010000001100100000100011000001100000'), 1)

function getLength(bits) {
    const lengthId = getLengthId(bits);

    if (lengthId === LENGTH_BITS) {
        return parseInt(bits.substr(7, 15), 2);
    }

    if (lengthId === LENGTH_PACKETS) {
        return parseInt(bits.substr(7, 11), 2);
    }
}

function decode(bits) {
    let cursor = 0;

    function consume(amount) {
        const value = parseInt(bits.substr(cursor, amount), 2);
        cursor += amount;
        return value;
    }

    function consumeLiteral() {
        while (true) {
            const marker = bits[cursor];
            cursor += 5;

            if (marker === '0') {
                break;
            }
        }
    }

    function actualDecode(bits) {
        const version = consume(3);
        const type = consume(3);

        if (type === TYPE_LITERAL) {
            consumeLiteral();

            return {
                version,
                type,
                children: []
            }
        }

        const lengthId = consume(1)
        const packet = {
            version,
            type,
            lengthId,
            children: []
        }

        if (lengthId === LENGTH_BITS) {
            const start = cursor;
            const end = consume(15);
            while (cursor - start < end) {
                packet.children.push(actualDecode(bits));
            }
        } else {
            const packets = consume(11);
            while (packet.children.length < packets) {
                packet.children.push(actualDecode(bits));
            }
        }

        return packet;
    }

    return actualDecode(bits);
}


function versions(node) {
    return [node.version, node.children.map(versions)]
    // console.log(node);
    // return node.version + sum(node.children.map(versionSum));
}

const x = decode(toBits('880086C3E88112'))
console.log((versions(x).flat(Infinity).length));