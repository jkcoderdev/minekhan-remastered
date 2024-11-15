import { GuiScreen } from '../gui/GuiScreen.js';

class GuiRenderer {
    constructor(renderer) {
        this.renderer = renderer;

        this.currentScreen = null;

        const ctx = renderer.overlay;
        ctx.on('frame', () => {
            if (this.currentScreen) {
                const screen = this.currentScreen;
                screen.render(renderer);
                screen.renderComponents(renderer);
            }
        });
    }

    setScreen(screen) {
        if (!(screen instanceof GuiScreen)) {
            throw new Error(`Please provide correct gui screen object`);
        }

        if (this.currentScreen) {
            this.currentScreen.dispatch(this.renderer);
        }

        this.currentScreen = screen;
        screen.init(this.renderer);
    }
}

export { GuiRenderer };