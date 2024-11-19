import { GuiComponent } from '../GuiComponent.js';

class Container extends GuiComponent {
    constructor(options={}) {
        super();
        
        const _options = Object.assign({
            child: null,
            padding: 0,
            margin: 0,
            width: null,
            height: null,
            backgroundColor: null,
            backdropBlur: null,
            backdropBrightness: null,
        }, options);
        
        this.padding = _options.padding;
        this.margin = _options.margin;

        this.width = _options.width;
        this.height = _options.height;

        this.backgroundColor = _options.backgroundColor;
        this.backdropBlur = _options.backdropBlur;
        this.backdropBrightness = _options.backdropBrightness;
        
        this.child = _options.child;
    }

    dispatch(renderer) {
        super.dispatch(renderer);

        if (this.child) {
            this.child.dispatch(renderer);
        }
    }
    
    render(renderer, parent) {
        super.render(renderer, parent);

        const ctx = renderer.overlay;

        const view = parent.view;

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
            this.child.render(renderer, {
                view: {
                    x: x + this.padding,
                    y: y + this.padding,
                    width: width - this.padding * 2,
                    height: height - this.padding * 2
                }
            });
        }
    }
}

export { Container };
