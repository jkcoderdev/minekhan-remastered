import { GuiComponent } from '../GuiComponent.js';

import { minmax } from '../../math/minmax.js';
import { Size, ScrollAxis } from '../../utils/enums.js';

import { OverflowBox } from './OverflowBox.js';

class ScrollView extends GuiComponent {
    #scroll = { x: 0, y: 0 };

    constructor(options) {
        super(options);

        this.optionsManager.setOptions({
            width: Size.matchParent,
            height: Size.matchParent,
            axis: ScrollAxis.vertical
        });

        const _options = this.optionsManager.loadFromObject(options);

        this.width = _options.width;
        this.height = _options.height;

        this.build();
    }

    build() {
        this.box = new OverflowBox({
            child: this.child,
            offsetX: -this.#scroll.x,
            offsetY: -this.#scroll.y,
        });
    }

    limitScroll(context) {
        if (!this.child) return;

        const size = this.measure(context);
        const childSize = this.child.measure(context);

        const maxX = Math.max(childSize.width - size.width, 0);
        const maxY = Math.max(childSize.height - size.height, 0);

        this.#scroll.x = minmax(0, maxX, this.#scroll.x);
        this.#scroll.y = minmax(0, maxY, this.#scroll.y);
    }

    init(context) {
        super.init(context);

        window.addEventListener('wheel', e => {
            // console.log(e.deltaY);
            this.#scroll.y += e.deltaY;
        });
    }

    render(context) {
        super.render(context);

        this.limitScroll(context);
        this.build();

        // console.log(this.#scroll);

        this.renderChild(context.withParent(this), this.box);
    }
}

export { ScrollView };