import { GuiComponent } from '../GuiComponent.js';

class Container extends GuiComponent {
    constructor(options={}) {
        super();
        
        const _options = Object.assign({
            child: null,
            padding: 0,
            margin: 0,
            backgroundColor: null,
            width: null,
            height: null
        }, options);
        
        this.padding = _options.padding;
        this.margin = _options.margin;

        this.width = _options.width;
        this.height = _options.height;

        this.backgroundColor = _options.backgroundColor;
        
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

        if (this.backgroundColor) {
            ctx.fillColor(this.backgroundColor);
            ctx.rect(view.x + this.margin, view.y + this.margin, view.width - this.margin * 2, view.height - this.margin * 2);
            ctx.fill();
        }
    
        if (this.child) {
            this.child.render(renderer, {
                view: {
                    x: view.x + this.padding + this.margin,
                    y: view.y + this.padding + this.margin,
                    width: view.width - (this.padding + this.margin) * 2,
                    height: view.height - (this.padding + this.margin) * 2
                }
            });
        }
    }
}

export { Container };
