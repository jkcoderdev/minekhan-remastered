class ImageManager {
    #images = new Map();

    load(name, url) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.src = url;

            image.onerror = () => {
                reject(`Error fetching image from url '${url}'`);
            };

            image.onload = () => {
                const exists = this.#images.has(name);
                if (exists) {
                    reject(`Can't assign new image to already existing one with name '${name}'`);
                    return;
                }

                this.#images.set(name, image)
                resolve(image);
            }
        });
    }

    async loadAll(images) {
        const isArray = typeof images === 'object' && typeof images.length === 'number';
        if (!isArray) {
            throw new Error(`Please provide an array`);
        }

        for (const image of images) {
            const isValidObject = typeof image === 'object' && typeof image.name === 'string' && typeof image.url === 'string';
            if (!isValidObject) {
                throw new Error(`Each image has to contain specific object:\n{ name: string; url: string; }`);
            }

            await this.load(image.name, image.url);
        }
    }

    get(name) {
        const exists = this.#images.has(name);
        if (!exists) {
            throw new Error(`Can't get image named '${name}'`);
        }

        return this.#images.get(name);
    }
}

export { ImageManager };