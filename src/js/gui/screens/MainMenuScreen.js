import { GuiScreen } from '../GuiScreen.js';

import { Container } from '../components/Container.js';
import { Center } from '../components/Center.js';
import { VerticalLayout } from '../components/VerticalLayout.js';
import { Button } from '../components/Button.js';
import { Text } from '../components/Text.js';

import { HexColor } from '../../utils/colors.js';
import { Alignment, Size, TextAlign } from '../../utils/enums.js';

class MainMenuScreen extends GuiScreen {
    constructor() {
        super();
        
        this.layout = new Container({
            height: Size.wrapContent,
            margin: 32,
            child: new Center({
                child: new VerticalLayout({
                    alignment: Alignment.center,
                    width: Size.matchParent,
                    height: Size.matchParent,
                    children: [
                        new Text({
                            text: 'Hello World'
                        }),
                        new Button({
                            text: 'Test Buttoooooon'
                        })
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
