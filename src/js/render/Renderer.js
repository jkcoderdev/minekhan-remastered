import { FlatContext } from './2d/FlatContext.js';
import { WebGLContext } from './webgl/WebGLContext.js';

import { ShaderManager } from '../assets/ShaderManager.js';
import { ImageManager } from '../assets/ImageManager.js';

class Renderer {
    #images = new ImageManager();

    constructor(overlaySelector, webglSelector) {
        const webglContext = new WebGLContext(overlaySelector);
        const overlayContext = new FlatContext(webglSelector);

        this.webglContext = webglContext;
        this.overlayContext = overlayContext;
    }

    storeImages(images) {
        if (!(images instanceof ImageManager)) {
            throw new Error('Please provide image manager object');
        }

        this.#images = images;
    }

    compileShaders(shaders) {
        const { webglContext } = this;

        if (!(shaders instanceof ShaderManager)) {
            throw new Error('Please provide shader manager object');
        }

        shaders.forEach((shader, name) => {
            webglContext.compileShader(name, shader);
        });
    }

    get images() {
        return this.#images;
    }

    get webgl() {
        return this.webglContext;
    }

    get overlay() {
        return this.overlayContext;
    }
}

export { Renderer };