import { Dispatcher } from '../events/Dispatcher.js';

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

class CanvasContextError extends Error {
    constructor(msg) {
        super(msg);
    }
}

class CanvasContext extends Dispatcher {
    #canvasToDisplaySizeMap = new Map();
    #frameId = 0;
    #previousFrameTimestamp = 0;

    constructor(selector) {
        super();
        
        if (!selector) {
            throw new CanvasContextError('Please provide a canvas element selector');
        }
        
        /**
         * @type HTMLCanvasElement
         */
        this.canvas = document.querySelector(selector);

        const dpr = window.devicePixelRatio;
        const box = this.canvas.getBoundingClientRect();

        const displayWidth = Math.round(box.width * dpr);
        const displayHeight = Math.round(box.height * dpr);

        this.#canvasToDisplaySizeMap.set(this.canvas, [displayWidth, displayHeight]);

        const resizeObserver = new ResizeObserver((entries) => this.#onResize(entries));
        resizeObserver.observe(this.canvas, { box: 'content-box' });

        this.#frameId = requestAnimationFrame((timestamp) => this.#render(timestamp));
    }

    css(key, value) {
        const property = key.toLowerCase().split('-').filter(a => a.trim().length).map(((word, index) => index === 0 ? word : word.capitalize())).join('');

        if (typeof this.canvas.style[property] === 'undefined') {
            throw new CanvasContextError(`CSS property '${property}' doesn't exist`);
        }

        this.canvas[property] = value;
    }

    get width() { this.canvas.width };
    get height() { this.canvas.height };

    #onResize(entries) {
        for (const entry of entries) {
            let width, height;
            let dpr = window.devicePixelRatio;

            if (entry.devicePixelContentBoxSize) {
                width = entry.devicePixelContentBoxSize[0].inlineSize;
                height = entry.devicePixelContentBoxSize[0].blockSize;
                dpr = 1; // it's already in width and height
            } else if (entry.contentBoxSize) {
                if (entry.contentBoxSize[0]) {
                    width = entry.contentBoxSize[0].inlineSize;
                    height = entry.contentBoxSize[0].blockSize;
                } else {
                    width = entry.contentBoxSize.inlineSize;
                    height = entry.contentBoxSize.blockSize;
                }
            } else {
                width = entry.contentRect.width;
                height = entry.contentRect.height;
            }

            const displayWidth = Math.round(width * dpr);
            const displayHeight = Math.round(height * dpr);

            this.#canvasToDisplaySizeMap.set(entry.target, [displayWidth, displayHeight]);
        }
    }

    #resizeCanvasToDisplaySize() {
        const [ displayWidth, displayHeight ] = this.#canvasToDisplaySizeMap.get(this.canvas);

        // Stop resizing if not needed
        if (this.canvas.width === displayWidth && this.canvas.height === displayHeight) {
            return;
        }

        this.canvas.width = displayWidth;
        this.canvas.height = displayHeight;

        this.emit('resize');
    }

    #render(frameTimestamp) {
        this.#resizeCanvasToDisplaySize();

        const frameDeltaTime = (frameTimestamp - this.#previousFrameTimestamp) / 1000;
        this.#previousFrameTimestamp = frameTimestamp;

		const fps = 1 / frameDeltaTime;

        this.emit('frame', {
            frameTime: frameDeltaTime,
            fps: fps
        });

        this.#frameId = requestAnimationFrame((timestamp) => this.#render(timestamp));
        return this.#frameId;
    }

    cancelFrame() {
        cancelAnimationFrame(this.#frameId);
    }
}

export { CanvasContext };