import { GuiComponent } from '../GuiComponent.js';

import { Size } from '../../utils/enums.js';

class OverflowBox extends GuiComponent {
    constructor(options) {
        super(options);

        this.optionsManager.setOptions({
            width: Size.matchParent,
            height: Size.matchParent,
            offsetX: 0,
            offsetY: 0
        });

        const _options = this.optionsManager.loadFromObject(options);

        this.width = _options.width;
        this.height = _options.height;

        this.offsetX = _options.offsetX;
        this.offsetY = _options.offsetY;
    }

    render(context) {
        super.render(context);

        const view = context.view;
        const ctx = context.overlayContext;

        if (this.child) {
            const childSize = this.child.measure(context);
            const childView = {
                x: view.x + this.offsetX,
                y: view.y + this.offsetY,
                width: childSize.width,
                height: childSize.height
            };

            ctx.restrictArea(view.x, view.y, childSize.width, childSize.height, () => {
                this.renderChild(context.withView(childView), this.child);
            });
        }
    }
}

export { OverflowBox };