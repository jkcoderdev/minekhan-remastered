import { GuiComponent } from '../GuiComponent.js';

import { Color } from '../../utils/colors.js';
import { Size } from '../../utils/enums.js';

class Text extends GuiComponent {
    constructor(options) {
        super(options);
        
        this.optionsManager.setOptions({
            width: Size.matchParent,
            height: Size.wrapContent,
            text: '',
            color: new Color(0, 0, 0),
            lineHeight: 1,
            wordWrap: false,
            textAlign: 'left',
            fontSize: 24
        });

        const _options = this.optionsManager.loadFromObject(options);

        this.width = _options.width;
        this.height = _options.height;

        this.text = _options.text;

        this.color = _options.color;
        this.lineHeight = _options.lineHeight;
        this.wordWrap = _options.wordWrap;
        this.textAlign = _options.textAlign;
        this.fontSize = _options.fontSize;
    }

    #wrapText(text, widthCallback, wrapWidth) {
        if (wrapWidth === 0) {
            return text.split('');
        }

        const rawLines = text.split('\n');
        const lines = [];

        for (let i = 0; i < rawLines.length; i++) {
            const rawLine = rawLines[i];
            const words = rawLine.split(' ');

            let line = '';

            for (const word of words) {
                const testLine = line ? `${line} ${word}` : word;
                const testWidth = widthCallback(testLine);

                if (testWidth <= wrapWidth) {
                    line = testLine;
                } else {
                    if (line) lines.push(line);
                    line = word;
                }
            }

            lines.push(line);
        }

        return lines;
    }

    render(context) {
        super.render(context);

        const ctx = context.overlayContext;

        const view = context.view;

        ctx.fontSize(this.fontSize);
        ctx.textAlign(this.textAlign);
        ctx.textBaseline('middle');
        ctx.fillColor(this.color);

        const wrapWidth = this.measure(context).width;

        const lines = this.wordWrap
            ? this.#wrapText(this.text, (text) => ctx.measureTextWidth(text), wrapWidth)
            : [this.text];

        this.wrapHeight = lines.length * this.lineHeight * this.fontSize;
        
        const size = this.measure(context);

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            const y = view.y + (i + 0.5) * this.lineHeight * this.fontSize;

            switch(this.textAlign) {
                case 'left':
                    ctx.text(line, view.x, y);
                    break;
                case 'center':
                    ctx.text(line, view.x + size.width / 2, y);
                    break;
                case 'right':
                    ctx.text(line, view.x + size.width, y);
                    break;
            }
        }
    }
}

export { Text };