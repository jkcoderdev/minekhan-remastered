class GuiScreen {
    constructor() {
        this.layout = null;
        
        this.backgroundImage = null;
        this.backgroundColor = null;
    }

    createLayoutContext(context) {
        const size = this.layout.measure(context);
        const view = {
            x: context.view.x,
            y: context.view.y,
            width: size.width,
            height: size.height
        };

        return context.withView(view).withScreen(this);
    }

    init(context) {
        if (this.layout) {
            const layoutContext = this.createLayoutContext(context);
            this.layout.init(layoutContext);
        }
    }

    dispatch(context) {
        if (this.layout) {
            const layoutContext = this.createLayoutContext(context);
            this.layout.dispatch(layoutContext);
        }
    }

    render(context) {
        const ctx = context.overlayContext;
        ctx.clear();

        const view = context.view;
        
        if (this.backgroundColor) {
            const color = this.backgroundColor;
            ctx.fillColor(color);
            ctx.rect(view.x, view.y, view.width, view.height);
            ctx.fill();
        }
        
        if (this.backgroundImage) {
            const image = this.backgroundImage;
            ctx.backgroundImage(image);
        }

        if (this.layout) {
            const layoutContext = this.createLayoutContext(context);
            this.layout.render(layoutContext);
        }
    }
}

export { GuiScreen };
