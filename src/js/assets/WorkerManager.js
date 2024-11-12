class WorkerManager {
    #workers = new Map();

    async load(name, url) {
        const exists = this.#workers.has(name);
        if (exists) {
            throw new Error(`Worker named '${name}' already exists`);
        }

        const workerRequest = await fetch(url).catch(() => {
            throw new Error(`Could not find worker with url '${url}'`);
        });

        const workerCode = await workerRequest.text();

        this.#workers.set(name, workerCode);

        return workerCode;
    }

    async loadAll(workers) {
        const isArray = typeof workers === 'object' && typeof workers.length === 'number';
        if (!isArray) {
            throw new Error(`Please provide an array`);
        }

        for (const worker of workers) {
            const isValidObject = typeof worker === 'object' && typeof worker.name === 'string' && typeof worker.url === 'string';
            if (!isValidObject) {
                throw new Error(`Each worker has to contain specific object:\n{ name: string; url: string; }`);
            }

            await this.load(worker.name, worker.url);
        }
    }
}

export { WorkerManager };