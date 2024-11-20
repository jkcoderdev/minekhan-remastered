import { Renderer } from '../render/Renderer.js';

class GuiContext {
    constructor(renderer) {
        this.renderer = renderer;
    }

    get overlayContext() {
        return this.renderer.overlay;
    }

    get webglContext() {
        return this.renderer.webgl;
    }
}

export { GuiContext };