import { GuiComponent } from '../GuiComponent.js';

import { Container } from './Container.js';
import { Text } from './Text.js';

import { Size } from '../../utils/enums.js';
import { HexColor } from '../../utils/colors.js';

class Button extends GuiComponent {
    #text = '';

    constructor(options) {
        super(options);

        this.optionsManager.setOptions({
            width: Size.wrapContent,
            height: Size.wrapContent,
            text: 'Button'
        });

        const _options = this.optionsManager.loadFromObject(options);
        
        this.width = _options.width;
        this.height = _options.height;

        this.#text = _options.text;
        this.build();
    }

    set text(text) {
        this.#text = text;
        this.build();
    }

    wrapWidth(context) {
        return this.container.measureWidth(context);
    }

    wrapHeight(context) {
        return this.container.measureHeight(context);
    }

    build() {
        this.container = new Container({
            width: this.width,
            height: this.height,
            backgroundColor: new HexColor('#888'),
            padding: 8,
            child: new Text({
                text: this.#text
            })
        });
    }

    render(context) {
        super.render(context);

        this.renderChild(context, this.container)
    }
}

export { Button };