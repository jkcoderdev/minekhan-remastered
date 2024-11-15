import { minmax } from '../math/minmax.js';

class Color {
    constructor(r, g, b, a=1) {
        this.r = Number(r) || 0;
        this.g = Number(g) || 0;
        this.b = Number(b) || 0;
        this.a = Number(a) || 0;
    }

    toString() {
        let color = '#';
        color += minmax(0, 255, Math.floor(this.r)).toString(16).padStart(2, '0');
        color += minmax(0, 255, Math.floor(this.g)).toString(16).padStart(2, '0');
        color += minmax(0, 255, Math.floor(this.b)).toString(16).padStart(2, '0');

        if (this.a < 1) {
            color += minmax(0, 255, Math.floor(this.a * 255)).toString(16).padStart(2, '0');
        }

        return color;
    }
}

class HexColor extends Color {
    constructor(hex) {
        if (typeof hex !== 'string') {
            throw new Error('Please provide correct hex color');
        }

        const _hex = hex.toLowerCase().replaceAll(/[^0-9a-f]/g, '');

        if (_hex.length === 3) {
            const [ r, g, b ] = _hex.split('').map((n) => parseInt(n, 16) *17);

            super(r, g, b);
        } else if (_hex.length === 4) {
            const [ r, g, b, a ] = _hex.split('').map((n) => parseInt(n, 16) * 17);

            super(r, g, b, a / 255);
        } else if (_hex.length === 6) {
            const r = parseInt(_hex.slice(0, 2), 16);
            const g = parseInt(_hex.slice(2, 4), 16);
            const b = parseInt(_hex.slice(4, 6), 16);

            super(r, g, b);
        } else if (_hex.length === 8) {
            const r = parseInt(_hex.slice(0, 2), 16);
            const g = parseInt(_hex.slice(2, 4), 16);
            const b = parseInt(_hex.slice(4, 6), 16);
            const a = parseInt(_hex.slice(6, 8), 16);

            super(r, g, b, a / 255);
        } else {
            throw new Error('Please provide correct hex color');
        }
    }
}

export { Color, HexColor };