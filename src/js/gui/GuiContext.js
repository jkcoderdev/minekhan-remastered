import { OptionsManager } from '../utils/OptionsManager.js';

class GuiContext {
    constructor(renderer, options = {}) {
        this.optionsManager = new OptionsManager({
            view: {
                x: 0,
                y: 0,
                width: renderer.width,
                height: renderer.height
            },
            parent: null,
            screen: null
        });

        this.options = this.optionsManager.loadFromObject(options);

        this.renderer = renderer;
    }

    get view() {
        return this.options.view;
    }

    get parent() {
        return this.options.parent;
    }

    get screen() {
        return this.options.screen;
    }

    withView(view) {
        return new GuiContext(this.renderer, Object.assign(this.options, { view }));
    }

    withParent(parent) {
        return new GuiContext(this.renderer, Object.assign(this.options, { parent }));
    }

    withScreen(screen) {
        return new GuiContext(this.renderer, Object.assign(this.options, { screen }));
    }

    get overlayContext() {
        return this.renderer.overlay;
    }

    get webglContext() {
        return this.renderer.webgl;
    }

    get screenWidth() {
        return this.renderer.width;
    }

    get screenHeight() {
        return this.renderer.height;
    }

    get images() {
        return this.renderer.images;
    }
}

export { GuiContext };