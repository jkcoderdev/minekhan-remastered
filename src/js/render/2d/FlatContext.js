import { minmax } from '../../math/minmax.js';
import { CanvasContext } from '../CanvasContext.js';

function rgbaString(r, g, b, a) {
    return `rgba(${minmax(0, 255, r * 255) | 0}, ${minmax(0, 255, g * 255) | 0}, ${minmax(0, 255, b * 255) | 0}, ${minmax(0.0, 1.0, a)})`;
}

class FlatContext extends CanvasContext {
    #fontSize = 12;
    #fontFamily = 'sans-serif';
    #fontStyle = null;

    constructor(selector) {
        super(selector);

        /**
         * @type CanvasRenderingContext2D
         */
        this.ctx = this.canvas.getContext('2d');

        this.#updateFontProperties();
    }

    #updateFontProperties() {
        this.ctx.font = `${this.#fontStyle ?? ''} ${this.#fontSize}px ${this.#fontFamily}`.trim();
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    saveState() {
        this.ctx.save();
    }

    restoreState() {
        this.ctx.restore();
    }

    fillColor(r, g, b, a=1) {
        this.ctx.fillStyle = rgbaString(r, g, b, a);
    }

    strokeColor(r, g, b, a=1) {
        this.ctx.strokeStyle = rgbaString(r, g, b, a);
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

    backgroundColor(r, g, b, a=1) {
        this.fillColor(r, g, b, a);
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    backgroundImage(image) {
        const imageAspectRatio = image.width / image.height;
        const canvasAspectRatio = this.width / this.height;

        let x = 0;
        let y = 0;
        let width = this.width;
        let height = this.height;

        if (imageAspectRatio > canvasAspectRatio) {
            width = height * imageAspectRatio;
            x = -(width - this.width) / 2;
        } else {
            height = width / imageAspectRatio;
            y = -(height - this.height) / 2;
        }

        this.ctx.drawImage(image, x, y, width, height);
    }
}

export { FlatContext };
