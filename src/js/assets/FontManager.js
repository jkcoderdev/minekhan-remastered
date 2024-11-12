class FontManager {
    async load(name, url) {
        const fontAlreadyLoaded = document.fonts.check(`10px ${name}`);
        if (fontAlreadyLoaded) {
            throw new Error(`Font named ${name} already loaded`);
        }

        const font = new FontFace(name, `url(${url})`);

        try {
            await font.load();
            document.fonts.add(font);
        } catch (e) {
            throw new Error(`Font with url '${url}' doesn't exist`);
        }

        return font;
    }

    async loadAll(fonts) {
        const isArray = typeof fonts === 'object' && typeof fonts.length === 'number';
        if (!isArray) {
            throw new Error(`Please provide an array`);
        }

        for (const font of fonts) {
            const isValidObject = typeof font === 'object' && typeof font.name === 'string' && typeof font.url === 'string';
            if (!isValidObject) {
                throw new Error(`Each font has to contain specific object:\n{ name: string; url: string; }`);
            }

            await this.load(font.name, font.url);
        }
    }
}

export { FontManager };