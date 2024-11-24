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