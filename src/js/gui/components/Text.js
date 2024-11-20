import { GuiComponent } from '../GuiComponent.js';

import { HexColor } from '../../utils/colors.js';

import { FlatContext } from '../../render/2d/FlatContext.js';

class Text extends GuiComponent {
    #text = '';

    constructor(options={}) {
        super();

        const _options = Object.assign({
            text: '',
            color: new HexColor('#000'),
            width: null,
            lineHeight: 1.2,
            wordWrap: false,
            textAlign: 'left',
            fontSize: 24
        }, options);

        this.color = _options.color;
        this.lineHeight = _options.lineHeight;
        this.wordWrap = _options.wordWrap;
        this.textAlign = _options.textAlign;
        this.fontSize = _options.fontSize;

        this.text = _options.text;

        this.lines = [];

        this.height = 0;
    }

    #prepareContext(ctx) {
        ctx.fontSize(this.fontSize);
        ctx.textAlign(this.textAlign);
        ctx.textBaseline('middle');
        ctx.fillColor(this.color);
    }

    render(renderer, parent) {
        super.render(renderer, parent);

        /**
         * @type FlatContext
         */
        const ctx = renderer.overlay;

        const view = parent.view;

        this.#prepareContext(ctx);

        const lines = this.lines;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            const y = view.y + (i + 0.5) * this.lineHeight * this.fontSize;

            switch(this.textAlign) {
                case 'left':
                    ctx.text(line, view.x, y);
                    break;
                case 'center':
                    ctx.text(line, view.x + view.width / 2, y);
                    break;
                case 'right':
                    ctx.text(line, view.x + view.width, y);
                    break;
            }
        }
    }
}

export { Text };