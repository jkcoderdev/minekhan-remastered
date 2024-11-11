import { FontManager } from './FontManager.js';
import { ImageManager } from './ImageManager.js';
import { ShaderManager } from './ShaderManager.js';
import { WorkerManager } from './WorkerManager.js';

class AssetsManager {
    #fontsQueue = [];
    #imagesQueue = [];
    #shadersQueue = [];
    #workersQueue = [];

    constructor() {
        this.fonts = new FontManager();
        this.images = new ImageManager();
        this.shaders = new ShaderManager();
        this.workers = new WorkerManager();
    }

    addImage(name, path) {
        const url = 'src/assets/images/' + path.replace(/^\/+/g, '');
        this.#imagesQueue.push({ name, url });
    }

    addShader(name, path) {
        const url = 'src/assets/shaders/' + path.replace(/^\/+|\/$/g, '') + '/';
        const vertUrl = url + 'vert.glsl';
        const fragUrl = url + 'frag.glsl';
        this.#shadersQueue.push({ name, vertUrl, fragUrl });
    }

    async loadEverything() {
        await this.images.loadAll(this.#imagesQueue);
        await this.shaders.loadAll(this.#shadersQueue);

        this.#fontsQueue = [];
        this.#imagesQueue = [];
        this.#shadersQueue = [];
        this.#workersQueue = [];
        
        return {
            fonts: this.fonts,
            images: this.images,
            shaders: this.shaders,
            workers: this.workers
        };
    }
}

export { AssetsManager };