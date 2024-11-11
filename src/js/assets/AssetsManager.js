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
        const url = 'src/assets/images/' + path;
        this.#imagesQueue.push({ name, url });
        console.log(this.#imagesQueue);
    }

    async loadEverything() {
        await this.images.loadAll(this.#imagesQueue);

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