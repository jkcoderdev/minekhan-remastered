class ShaderManager {
    #shaders = new Map();

    async load(name, vertUrl, fragUrl) {
        const vertexShaderRequest = await fetch(vertUrl).catch(() => {
            throw new Error(`Could not find vertex shader with url '${vertUrl}'`);
        });

        const vertexShader = await vertexShaderRequest.text();

        const fragmentShaderRequest = await fetch(fragUrl).catch(() => {
            throw new Error(`Could not find fragment shader with url '${fragUrl}'`);
        });

        const fragmentShader = await fragmentShaderRequest.text();

        const shader = {
            vert: vertexShader,
            frag: fragmentShader
        };

        const exists = this.#shaders.has(name);
        if (exists) {
            throw new Error(`Can't assign new shader to already existing one with name '${name}'`);
        }

        this.#shaders.set(name, shader);

        return shader;
    }

    async loadAll(shaders) {
        console.log(shaders)
        const isArray = typeof shaders === 'object' && typeof shaders.length === 'number';
        if (!isArray) {
            throw new Error(`Please provide an array`);
        }

        for (const shader of shaders) {
            const isValidObject = typeof shader === 'object' && typeof shader.name === 'string' && typeof shader.vertUrl === 'string' && typeof shader.fragUrl === 'string';
            if (!isValidObject) {
                throw new Error(`Each shader has to contain specific object:\n{ name: string; vertUrl: string; fragUrl: string; }`);
            }

            await this.load(shader.name, shader.vertUrl, shader.fragUrl);
        }
    }

    get(name) {
        const exists = this.#shaders.has(name);
        if (!exists) {
            throw new Error(`Can't get shader named '${name}'`);
        }

        return this.#shaders.get(name);
    }
}

export { ShaderManager };