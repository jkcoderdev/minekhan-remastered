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

    computeViews(context) {
        super.computeViews(context);

        if (!this.child) return;

        const view = context.view;
        const childSize = this.child.measure(context);

        this.view = {
            x: view.x + this.offsetX,
            y: view.y + this.offsetY,
            width: childSize.width,
            height: childSize.height
        };
    }

    render(context) {
        super.render(context);

        const ctx = context.overlayContext;

        const view = context.view;
        const size = this.measure(context);

        ctx.restrictArea(view.x, view.y, size.width, size.height, () => {
            this.renderChildren(context);
        });
    }
}

export { OverflowBox };