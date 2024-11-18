class GuiScreen {
    constructor() {
        this.components = [];
        
        this.backgroundImage = null;
        this.backgroundColor = null;
    }

    init(renderer) {
        const ctx = renderer.overlay;
        ctx.reset();
        
        for (const component of this.components) {
            component.init(renderer);
        }
    }

    dispatch(renderer) {
        const ctx = renderer.overlay;
        ctx.reset();
    }

    render(renderer) {
        const ctx = renderer.overlay;
        ctx.clear();
        
        if (this.backgroundColor) {
            const color = this.backgroundColor;
            ctx.fillColor(color.toString());
            ctx.rect(0, 0, renderer.width, renderer.height);
            ctx.fill();
        }
        
        if (this.backgroundImage) {
            const image = this.backgroundImage;
            ctx.backgroundImage(image);
        }
    }

    renderComponents(renderer) {
        for (const component of this.components) {
            component.render(renderer, {
                view: {
                    x: 0,
                    y: 0,
                    width: renderer.width,
                    height: renderer.height
                }
            });
        }
    }

    dispatchComponents() {
        for (const component of this.components) {
            component.dispatch(renderer);
        }
    }
}

export { GuiScreen };
