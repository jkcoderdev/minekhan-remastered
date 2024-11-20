import { GuiContext } from '../gui/GuiContext.js';

import { GuiScreen } from '../gui/GuiScreen.js';

class GuiRenderer {
    constructor(renderer) {
        this.renderer = renderer;

        this.context = new GuiContext(renderer);

        this.currentScreen = null;

        const ctx = renderer.overlay;

        ctx.on('resize', () => {
            this.context = new GuiContext(renderer);
        });

        ctx.on('frame', () => {
            if (this.currentScreen) {
                const screen = this.currentScreen;
                screen.render(this.context);
            }
        });
    }

    setScreen(screen) {
        if (!(screen instanceof GuiScreen)) {
            throw new Error(`Please provide correct gui screen object`);
        }

        if (this.currentScreen) {
            this.currentScreen.dispatch(this.context);
        }

        this.currentScreen = screen;
        screen.init(this.context);
    }
}

export { GuiRenderer };