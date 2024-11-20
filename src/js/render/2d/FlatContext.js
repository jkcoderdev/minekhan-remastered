import { minmax } from '../../math/minmax.js';
import { CanvasContext } from '../CanvasContext.js';

function rgbaString(r, g, b, a) {
    return `rgba(${minmax(0, 255, r * 255) | 0}, ${minmax(0, 255, g * 255) | 0}, ${minmax(0, 255, b * 255) | 0}, ${minmax(0.0, 1.0, a)})`;
}

function colorString(colorData) {
    const isArray = typeof colorData === 'object' && typeof colorData.length === 'number';
    if (!isArray) {
        throw new Error(`Please provide an array`);
    }

    if (colorData.length === 0) {
        throw new Error('Please provide color data. Color data array cannot be empty.');
    }

    if (colorData.length === 1 && typeof colorData[0] === 'string') {
        const validColorPattern = /^(#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b)|((rgb|hsl)a?\(\s*(\d{1,3}%?\s*,\s*){2}\d{1,3}%?\s*(,\s*(0|1|0?\.\d+)\s*)?\))|([a-zA-Z]+)$/;
        if (!validColorPattern.test(colorData[0])) {
            throw new Error('Please provide correct color string');
        }

        return colorData[0];
    } else if (colorData.length === 3 || colorData.length === 4) {
        try {
            const color = colorData.map(Number);
            return rgbaString(...color);
        } catch (e) {
            throw new Error('Please provide correct color data');
        }
    }

    throw new Error('Please provide correct color data');
}

class FlatContext extends CanvasContext {
    #fontSize = 12;
    #fontFamily = 'sans-serif';
    #fontStyle = null;

    #filter = new Map();

    #savedStates = 0;

    constructor(selector) {
        super(selector);

        /**
         * @type CanvasRenderingContext2D
         */
        this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });

        this.#updateFontProperties();

        this.saveState();
    }

    #updateFontProperties() {
        this.ctx.font = `${this.#fontStyle ?? ''} ${this.#fontSize}px '${this.#fontFamily}'`.trim();
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    reset() {
        for (let i = 0; i < this.#savedStates; i++) {
            this.ctx.restore();
        }

        this.#savedStates = 0;

        this.#fontSize = 12;
        this.#fontFamily = 'sans-serif';
        this.#fontStyle = null;

        this.saveState();

        this.clear();
    }

    saveState() {
        this.ctx.save();
        this.#savedStates++;
    }

    restoreState() {
        if (this.#savedStates === 0) {
            throw new Error(`You can't restore a non saved state`);
        }

        this.ctx.restore();
        this.#savedStates--;
    }

    filterArea(x, y, width, height, filterFunction) {
        this.ctx.save();

        const imageData = this.ctx.getImageData(x, y, width, height);

        const offsetCanvas = document.createElement('canvas');
        const offsetContext = offsetCanvas.getContext('2d');

        offsetCanvas.width = width;
        offsetCanvas.height = height;
        
        offsetContext.putImageData(imageData, 0, 0);

        filterFunction(this);

        offsetContext.filter = this.ctx.filter;
        offsetContext.drawImage(offsetCanvas, 0, 0);

        const processedImageData = offsetContext.getImageData(0, 0, width, height);

        this.ctx.putImageData(processedImageData, x, y);

        this.#filter.clear();

        this.ctx.restore();
    }

    #updateFilter() {
        this.ctx.filter = Array.from(this.#filter.keys()).map(key => {
            const value = this.#filter.get(key);

            return `${key}(${value})`;
        }).join(' ');
    }

    blur(value) {
        if (value === null && this.#filter.has('blur')) {
            this.#filter.delete('blur');
        } else {
            this.#filter.set('blur', `${value}px`);
        }

        this.#updateFilter();
    }

    brightness(value) {
        console.log(value);
        if (value === null && this.#filter.has('brightness')) {
            this.#filter.delete('brightness');
        } else {
            console.log(value);
            this.#filter.set('brightness', `${value}`);
        }

        this.#updateFilter();

        console.log(this.ctx.filter);
    }

    fillColor(color) {
        this.ctx.fillStyle = color.toString();
    }

    strokeColor(color) {
        this.ctx.strokeStyle = color.toString();
    }

    rect(x, y, width, height) {
        this.ctx.beginPath();
        this.ctx.rect(x, y, width, height);
    }

    circle(cx, cy, radius) {
        this.beginPath();
        this.ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    }

    fill() {
        this.ctx.fill();
    }

    stroke() {
        this.ctx.stroke();
    }

    textAlign(alignment) {
        this.ctx.textAlign = alignment;
    }

    textBaseline(baseline) {
        this.ctx.textBaseline = baseline;
    }

    fontSize(size) {
        this.#fontSize = size;
        this.#updateFontProperties();
    }

    fontFamily(family) {
        this.#fontFamily = family;
        this.#updateFontProperties();
    }

    fontStyle(style) {
        this.#fontStyle = style;
        this.#updateFontProperties();
    }

    measureTextWidth(text) {
        return this.ctx.measureText(text);
    }

    text(text, x, y) {
        this.ctx.fillText(text, x, y);
    }

    backgroundColor(...colorData) {
        this.fillColor(...colorData);
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    image(image, x, y, width, height) {
        const imageAspectRatio = image.width / image.height;
        const viewAspectRatio = width / height;
        
        let imageX = 0;
        let imageY = 0;
        let imageWidth = image.width;
        let imageHeight = image.height;

        if (imageAspectRatio > viewAspectRatio) {
            imageWidth *= viewAspectRatio / imageAspectRatio;
            imageX = (image.width - imageWidth) / 2;
        } else {
            imageHeight *= imageAspectRatio / viewAspectRatio;
            imageY = (image.height - imageHeight) / 2;
        }

        this.ctx.drawImage(image, imageX, imageY, imageWidth, imageHeight, x, y, width, height);
    }
    
    backgroundImage(image) {
        this.image(image, 0, 0, this.width, this.height);
    }
}

export { FlatContext };
