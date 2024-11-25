import { GuiScreen } from '../GuiScreen.js';

import { Container } from '../components/Container.js';
import { ScrollView } from '../components/ScrollView.js';
import { OverflowBox } from '../components/OverflowBox.js';
import { Text } from '../components/Text.js';

import { HexColor } from '../../utils/colors.js';
import { Size } from '../../utils/enums.js';

class MainMenuScreen extends GuiScreen {
    constructor() {
        super();
        
        this.layout = new Container({
            height: Size.wrapContent,
            margin: 32,
            padding: 16,
            backgroundColor: new HexColor('#fff4'),
            child: new ScrollView({
                child: new Text({
                    height: Size.matchParent,
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed viverra mi, sit amet feugiat sem. Curabitur vitae dignissim justo. Ut non neque porta, efficitur eros sit amet, pellentesque leo. Phasellus faucibus leo in risus ultrices, quis ullamcorper ante aliquet. Pellentesque mauris felis, efficitur sit amet massa vitae, ornare ultrices elit. Praesent a nunc eleifend lacus fringilla euismod. Aenean aliquam, risus in scelerisque aliquet, ipsum massa fermentum velit, ut lobortis metus arcu ut nisl. Phasellus ultricies dignissim malesuada. Sed consequat metus sed purus aliquet egestas. Suspendisse potenti. Phasellus venenatis ultrices quam. Aenean mollis quam eros, eu aliquet eros maximus eu. Pellentesque sodales arcu in interdum blandit.',
                    color: new HexColor('#fff'),
                    fontSize: 28,
                    wordWrap: true
                }),
            }),
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
