import { GuiComponent } from '../GuiComponent.js';

class VerticalLayout extends GuiComponent {
    constructor(options={}) {
        super();

        const _options = Object.assign({
            children: [],
            gap: 0,
        }, options);

        this.children = _options.children;

        this.gap = _options.gap;
        this.fullWidth = _options.fullWidth;
    }

    dispatch(renderer) {
        super.dispatch(renderer);

        for (const child of this.children) {
            child.dispatch(renderer);
        }
    }

    render(renderer, parent) {
        super.render(renderer, parent);

        const view = parent.view;

        let y = 0;

        for (const child of this.children) {
            const size = child.getSize(view);

            child.render(renderer, {
                view: {
                    x: view.x,
                    y: view.y + y,
                    width: size.width,
                    height: size.height,
                }
            });

            y += size.height;

            if (y > view.height) {
                console.warn(`Viewport overflown by ${y - view.height}px`);
            }

            y += this.gap;
        }
    }
}

export { VerticalLayout };