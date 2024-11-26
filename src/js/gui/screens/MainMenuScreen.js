import { GuiScreen } from '../GuiScreen.js';

import { Container } from '../components/Container.js';
import { Center } from '../components/Center.js';
import { VerticalLayout } from '../components/VerticalLayout.js';
import { Text } from '../components/Text.js';

import { HexColor } from '../../utils/colors.js';
import { Alignment, Size } from '../../utils/enums.js';

class MainMenuScreen extends GuiScreen {
    constructor() {
        super();
        
        this.layout = new Container({
            height: Size.wrapContent,
            margin: 32,
            child: new Center({
                child: new VerticalLayout({
                    alignment: Alignment.center,
                    width: Size.wrapContent,
                    height: Size.wrapContent,
                    children: [
                        new Text({
                            text: 'Hello World'
                        }),
                        new Text({
                            text: 'Lorem ipsum lorem ipsum lorem ispum. Lorem ipsum.',
                            wordWrap: true,
                            width: 256
                        }),
                        new Text({
                            text: 'Hello World'
                        }),
                        new Text({
                            text: 'Hello World'
                        }),
                    ]
                })
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
