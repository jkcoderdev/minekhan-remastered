class GuiScreen {
    constructor() {
        this.layout = null;
        
        this.backgroundImage = null;
        this.backgroundColor = null;
    }

    init(context) {
        if (this.layout) {
            this.layout.init(context.withScreen(this));
        }
    }

    dispatch(context) {
        if (this.layout) {
            this.layout.dispatch(context.withScreen(this));
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
            const size = this.layout.measure(context);
            const layoutContext = context.withScreen(this).withView({
                x: view.x + (this.layout?.x ?? 0),
                y: view.y + (this.layout?.y ?? 0),
                width: size.width,
                height: size.height
            });
            this.layout.render(layoutContext);
        }
    }
}

export { GuiScreen };
