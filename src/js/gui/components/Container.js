import { GuiComponent } from '../GuiComponent.js';

class Container extends GuiComponent {
    constructor(options={}) {
        super();
        
        const {} = Object.assign({
            child: null,
            padding: 0,
            margin:0
        }, options);
        
        this.padding = 0;
        this.margin = 0;
        
        this.child = null;
    }
    
    render(renderer, parent) {
        super.render(renderer, parent);
    
        if (this.child != null) {
            this.child.render(renderer, {
                view: {
                    x: parent.view.x + this.padding + this.margin,
                    y: parent.view.y + this.padding + this.margin,
                    width: parent.view.width - (this.padding + this.margin) * 2,
                    height: parent.view.height - (this.padding + this.margin) * 2
                }
            });
        }
    }
}

export { Container };
