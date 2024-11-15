import { GuiScreen } from '../GuiScreen.js';

import { Container } from '../components/Container.js';

class MainMenuScreen extends GuiScreen {
    constructor() {
        super();
        
        this.components = [
            new Container()
        ];
    }

    init(renderer) {
        super.init(renderer);
        
        const ctx = renderer.overlay;
        const images = renderer.images;
        
        ctx.fontFamily('MinecraftCHMC');
        
        const landscapeImage = images.get('landscape');
        this.backgroundImage = landscapeImage;
    }

    render(renderer) {
        super.render(renderer);
        
        const ctx = renderer.overlay;
    }
}

export { MainMenuScreen };
