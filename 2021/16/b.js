const assert = require('assert');
const {sum, product} = require("../util");

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
        let parts = '';
        while (true) {
            const marker = bits[cursor];
            parts += bits.substr(cursor + 1, 4);
            cursor += 5;

            if (marker === '0') {
                break;
            }
        }

        return parseInt(parts, 2);
    }

    function actualDecode(bits) {
        const version = consume(3);
        const type = consume(3);

        if (type === TYPE_LITERAL) {
            const value = consumeLiteral();

            return {
                type,
                value,
                children: [],
            }
        }

        const lengthId = consume(1)
        const packet = {
            type,
            children: []
        }

        if (lengthId === LENGTH_BITS) {
            const end = consume(15);
            const start = cursor;
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

const operations = {
    0: sum,
    1: product,
    2: arr => Math.min(...arr),
    3: arr => Math.max(...arr),

    5: ([a, b]) => a > b ? 1 : 0,
    6: ([a, b]) => a < b ? 1 : 0,
    7: ([a, b]) => a === b ? 1 : 0,
}

function calculate({ type, value, children }) {
    if (type === TYPE_LITERAL) {
        return value;
    }

    return operations[type](children.map(calculate));
}

const x = decode(toBits('620D7B005DF2549DF6D51466E599E2BF1F60016A3F980293FFC16E802B325332544017CC951E3801A19A3C98A7FF5141004A48627F21A400C0C9344EBA4D9345D987A8393D43D000172329802F3F5DE753D56AB76009080350CE3B44810076274468946009E002AD2D9936CF8C4E2C472400732699E531EDDE0A4401F9CB9D7802F339DE253B00CCE77894EC084027D4EFFD006C00D50001098B708A340803118E0CC5C200A1E691E691E78EA719A642D400A913120098216D80292B08104DE598803A3B00465E7B8738812F3DC39C46965F82E60087802335CF4BFE219BA34CEC56C002EB9695BDAE573C1C87F2B49A3380273709D5327A1498C4F6968004EC3007E1844289240086C4D8D5174C01B8271CA2A880473F19F5024A5F1892EF4AA279007332980CA0090252919DEFA52978ED80804CA100622D463860200FC608FB0BC401888B09E2A1005B725FA25580213C392D69F9A1401891CD617EAF4A65F27BC5E6008580233405340D2BBD7B66A60094A2FE004D93F99B0CF5A52FF3994630086609A75B271DA457080307B005A68A6665F3F92E7A17010011966A350C92AA1CBD52A4E996293BEF5CBFC3480085994095007009A6A76DF136194E27CE34980212B0E6B3940B004C0010A8631E20D0803F0F21AC2020085B401694DA4491840D201237C0130004222BC3F8C2200DC7686B14A67432E0063801AC05C3080146005101362E0071010EC403E19801000340A801A002A118012C0200B006AC4015088018000B398019399C2FC432013E3003551006E304108AA000844718B51165F35FA89802F22D3801374CE3C3B2B8B5B7DDC11CC011C0090A6E92BF5226E92BF5327F3FD48750036898CC7DD9A14238DD373C6E70FBCA0096536673DC9C7770D98EE19A67308154B7BB799FC8CE61EE017CFDE2933FBE954C69864D1E5A1BCEC38C0179E5E98280'))
console.log(x, calculate(x));