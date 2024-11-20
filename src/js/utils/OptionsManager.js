class OptionsManager {
    #options = new Map();

    constructor(optionsConfig) {
        if (typeof optionsConfig !== 'object') {
            throw new Error(`Please provide correct options config object`);
        }

        Object.entries(optionsConfig).forEach(([name, value]) => {
            this.#options.set(name, value);
        });
    }

    get options() {
        const options = {};

        for (const optionName of this.#options.keys()) {
            const optionValue = this.#options.get(optionName);
            options[optionName] = optionValue;
        }

        return options;
    }

    setOption(name, value) {
        this.#options.set(name, value);
    }

    setOptions(options) {
        Object.entries(options).forEach(([name, value]) => {
            this.setOption(name, value);
        });
    }

    loadFromObject(_options = {}) {
        for (const optionName of Object.keys(_options)) {
            const optionValue = _options[optionName];

            this.#options.set(optionName, optionValue);
        }

        return this.options;
    }
}

export { OptionsManager };