import { GuiComponent } from '../GuiComponent.js';

import { Size } from '../../utils/enums.js';

class OverflowBox extends GuiComponent {
    constructor(options) {
        super(options);

        this.optionsManager.setOptions({
            width: Size.matchParent,
            height: Size.matchParent,
        });

        const _options = this.optionsManager.loadFromObject(options);

        this.width = _options.width;
        this.height = _options.height;
    }

    render(context) {
        super.render(context);

        const view = context.view;
        const ctx = context.overlayContext;

        if (this.child) {
            const childSize = this.child.measure(context);
            const childView = {
                x: view.x,
                y: view.y,
                width: childSize.width,
                height: childSize.height
            };

            ctx.restrictArea(childView.x, childView.y, childView.width, childView.height, () => {
                this.renderChild(context.withView(childView), this.child);
            });
        }
    }
}

export { OverflowBox };