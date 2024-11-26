import { GuiComponent } from '../GuiComponent.js';

import { Size } from '../../utils/enums.js';

class Center extends GuiComponent {
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

    computeViews(context) {
        super.computeViews(context);

        if (!this.child) return;

        const view = context.view;
        const size = this.measure(context);

        const childSize = this.child.measure(context);
        const childView = {
            x: view.x + (size.width - childSize.width) / 2,
            y: view.y + (size.height - childSize.height) / 2,
            width: childSize.width,
            height: childSize.height
        };

        this.view = childView;
    }

    render(context) {
        super.render(context);

        if (this.child) {
            const view = context.view;
            const size = this.child.measure(context);
            const childView = {
                x: view.x + (view.width - size.width) / 2,
                y: view.y + (view.height - size.height) / 2,
                width: size.width,
                height: size.height
            };

            this.renderChild(context.withView(childView), this.child);
        }
    }
}

export { Center };