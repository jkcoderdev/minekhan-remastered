import { Size } from '../../utils/enums.js';
import { GuiComponent } from '../GuiComponent.js';

class VerticalLayout extends GuiComponent {
    constructor(options) {
        super(options);

        this.optionsManager.setOptions({
            width: Size.matchParent,
            height: Size.matchParent,
            gap: 0,
        });

        const _options = this.optionsManager.loadFromObject(options);

        this.width = _options.width;
        this.height = _options.height;

        this.gap = _options.gap;
    }

    render(context) {
        super.render(context);

        const view = context.view;

        let y = 0;

        for (const child of this.children) {
            const size = child.measure(context);
            const childView = {
                x: view.x,
                y: view.y + y,
                width: size.width,
                height: size.height,
            };

            this.renderComponent(context.withView(childView), child);

            y += size.height + this.gap;
        }
    }
}

export { VerticalLayout };