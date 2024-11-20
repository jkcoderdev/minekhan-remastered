import { GuiScreen } from '../GuiScreen.js';

import { Container } from '../components/Container.js';
import { VerticalLayout } from '../components/VerticalLayout.js';
import { Text } from '../components/Text.js';

import { HexColor } from '../../utils/colors.js';

class MainMenuScreen extends GuiScreen {
    constructor() {
        super();
        
        this.layout = new Container({
            margin: 32,
            child: new VerticalLayout({
                gap: 8,
                children: [
                    new Container({
                        height: 128,
                        backgroundColor: new HexColor('#f004')
                    }),
                    new Container({
                        height: 64,
                        backgroundColor: new HexColor('#0f04')
                    }),
                    new Container({
                        height: 32,
                        backgroundColor: new HexColor('#00f4')
                    }),
                    new Text({
                        text: 'Hello World',
                        color: new HexColor('#fff')
                    }),
                ],
            })
        });
    }

    init(context) {
        super.init(context);
        
        const ctx = context.overlayContext;
        const images = context.images;
        
        ctx.fontFamily('MinecraftCHMC');
        
        const landscapeImage = images.get('landscape');
        this.backgroundImage = landscapeImage;
    }

    render(context) {
        super.render(context);
    }
}

export { MainMenuScreen };
