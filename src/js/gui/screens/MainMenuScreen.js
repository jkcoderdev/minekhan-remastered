import { GuiScreen } from '../GuiScreen.js';

import { Container } from '../components/Container.js';
import { VerticalLayout } from '../components/VerticalLayout.js';

import { HexColor } from '../../utils/colors.js';

class MainMenuScreen extends GuiScreen {
    constructor() {
        super();
        
        this.components = [
            new Container({
                margin: 32,
                child: new VerticalLayout({
                    children: [
                        new Container({
                            backgroundColor: new HexColor('#ff0000'),
                            height: 128
                        }),
                        new Container({
                            backgroundColor: new HexColor('#ffff00'),
                            height: 128
                        }),
                        new Container({
                            backgroundColor: new HexColor('#00ff00'),
                            height: 128
                        }),
                        new Container({
                            backgroundColor: new HexColor('#0000ff'),
                            height: 128
                        }),
                    ],
                    gap: 16
                }),
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
