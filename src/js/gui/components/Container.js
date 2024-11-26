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

    wrapWidth(context) {
        if (this.child) {
            if (this.child.width === Size.matchParent) {
                return context.view.width;
            } else {
                return this.child.measureWidth(context) + this.padding * 2 + this.margin * 2;
            }
        }

        return 0;
    }

    wrapHeight(context) {
        if (this.child) {
            if (this.child.height === Size.matchParent) {
                return context.view.height;
            } else {
                return this.child.measureHeight(context) + this.padding * 2 + this.margin * 2;
            }
        }

        return 0;
    }

    computeViews(context) {
        super.computeViews(context);

        if (!this.child) return;

        const view = context.view;
        const size = this.measure(context);

        this.view = {
            x: view.x + this.margin + this.padding,
            y: view.y + this.margin + this.padding,
            width: size.width - this.margin * 2 - this.padding * 2,
            height: size.height - this.margin * 2 - this.padding * 2
        };
    }
    
    render(context) {
        super.render(context);

        const view = context.view;
        const size = this.measure(context);

        const ctx = context.overlayContext;

        const x = view.x + this.margin;
        const y = view.y + this.margin;
        const width = size.width - this.margin * 2;
        const height = size.height - this.margin * 2;

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

        this.renderChildren(context);
    }
}

export { Container };
