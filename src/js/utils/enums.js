function Enum(name, values) {
    const object = {};

    for (let i = 0; i < values.length; i++) {
        const value = values[i];
        object[value] = Symbol(`enum:${name}.${value}`);
    }

    return Object.freeze(object);
}

function isEnum(value) {
    return typeof value === 'symbol' && /^Symbol\(enum:[\d\w]+\.[\d\w]+\)$/.test(value.toString());
}

const Size = Enum('Size', [
    'matchParent',
    'wrapContent'
]);

const Alignment = Enum('Alignment', [
    'topLeft',
    'topCenter',
    'topBottom',
    'centerLeft',
    'center',
    'centerRight',
    'bottomLeft',
    'bottomCenter',
    'bottomRight'
]);

export { Size, Alignment, isEnum };