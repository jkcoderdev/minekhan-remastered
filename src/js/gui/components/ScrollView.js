import { GuiComponent } from '../GuiComponent.js';

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

        this.box = new OverflowBox({
            child: this.child,
            offsetX: -this.#scroll.x,
            offsetY: -this.#scroll.y,
        });
    }

    get scrollX() {
        return this.#scroll.x;
    }

    get scrollY() {
        return this.#scroll.y;
    }

    set scrollX(x) {
        this.#scroll.x = x;

        this.box = new OverflowBox({
            child: this.child,
            offsetX: -this.#scroll.x,
            offsetY: -this.#scroll.y,
        });
    }

    set scrollY(y) {
        this.#scroll.y = y;

        this.box = new OverflowBox({
            child: this.child,
            offsetX: -this.#scroll.x,
            offsetY: -this.#scroll.y,
        });
    }

    init(context) {
        super.init(context);

        // Event handling
        window.addEventListener('wheel', e => {
            console.log(e.deltaY);
            this.scrollY += e.deltaY;
        });
    }

    render(context) {
        super.render(context);

        this.renderChild(context, this.box);
    }
}

export { ScrollView };