import { GuiComponent } from '../GuiComponent.js';

import { Size } from '../../utils/enums.js';

class Container extends GuiComponent {
    constructor(options) {
        super(options);
        
        this.optionsManager.setOptions({
            width: Size.matchParent,
            height: Size.matchParent,
            margin: 0,
            padding: 0,
            backgroundColor: null,
            backdropBlur: null,
            backdropBrightness: null
        });

        const _options = this.optionsManager.loadFromObject(options);

        this.width = _options.width;
        this.height = _options.height;
        
        this.padding = _options.padding;
        this.margin = _options.margin;

        this.backgroundColor = _options.backgroundColor;
        this.backdropBlur = _options.backdropBlur;
        this.backdropBrightness = _options.backdropBrightness;
    }
    
    render(context) {
        super.render(context);

        const ctx = context.overlayContext;

        const view = context.view;

        const x = view.x + this.margin;
        const y = view.y + this.margin;
        const width = view.width - this.margin * 2;
        const height = view.height - this.margin * 2;

        if (this.backdropBlur || this.backdropBrightness) {
            ctx.filterArea(x, y, width, height, () => {
                if (this.backdropBlur !== null) ctx.blur(this.backdropBlur);
                if (this.backdropBrightness !== null) ctx.brightness(this.backdropBrightness);
            });
        }

        if (this.backgroundColor) {
            ctx.fillColor(this.backgroundColor);
            ctx.rect(x, y, width, height);
            ctx.fill();
        }
    
        if (this.child) {
            const childView = {
                x: x + this.padding,
                y: y + this.padding,
                width: width - this.padding * 2,
                height: height - this.padding * 2
            };

            this.renderComponent(context.withView(childView), this.child);
        }
    }
}

export { Container };
