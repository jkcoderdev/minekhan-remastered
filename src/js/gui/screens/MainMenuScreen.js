import { GuiScreen } from '../GuiScreen.js';

import { Container } from '../components/Container.js';

import { HexColor } from '../../utils/colors.js';

class MainMenuScreen extends GuiScreen {
    constructor() {
        super();
        
        this.components = [
            new Container({
                padding: 16
            })
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
}

export { MainMenuScreen };
