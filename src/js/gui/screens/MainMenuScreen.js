import { GuiScreen } from '../GuiScreen.js';

class MainMenuScreen extends GuiScreen {
    constructor() {
        super();

        this.on('init', this.#onInit.bind(this));
        this.on('render', this.#onRender.bind(this));
    }

    #onInit(renderer) {
        const ctx = renderer.overlay;
        ctx.fontFamily('MinecraftCHMC');
    }

    #onRender(renderer) {
        const ctx = renderer.overlay;
        const images = renderer.images;

        ctx.backgroundImage(images.get('landscape'));
    }
}

export { MainMenuScreen };