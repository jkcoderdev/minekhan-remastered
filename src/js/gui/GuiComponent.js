import { OptionsManager } from '../utils/OptionsManager.js';

import { Size, isEnum } from '../utils/enums.js';

class GuiComponent {
    constructor(options = {}) {
        this.optionsManager = new OptionsManager({
            width: Size.wrapContent,
            height: Size.wrapContent,
            child: null,
            children: [],
        });

        const _options = this.optionsManager.loadFromObject(options);

        this.width = _options.width;
        this.height = _options.height;

        this.children = _options.child ? [_options.child] : _options.children;
    }

    get child() {
        return this.children.length === 0 ? null : this.children[0];
    }

    init(context) {
        for (const child of this.children) {
            child.init(context.withParent(this));
        }
    }

    dispatch(context) {
        for (const child of this.children) {
            child.dispatch(context.withParent(this));
        }
    }

    wrapWidth(context) {
        return 0;
    }

    wrapHeight(context) {
        return 0;
    }

    measureWidth(context) {
        const view = context.view;

        if (!isEnum(this.width)) {
            return this.width;
        } else if (this.width === Size.matchParent) {
            return view.width;
        } else if (this.width === Size.wrapContent) {
            return this.wrapWidth(context);
        }

        return 0;
    }

    measureHeight(context) {
        const view = context.view;

        if (!isEnum(this.height)) {
            return this.height;
        } else if (this.height === Size.matchParent) {
            return view.height;
        } else if (this.height === Size.wrapContent) {
            return this.wrapHeight(context);
        }

        return 0;
    }

    measure(context) {
        const width = this.measureWidth(context);
        const height = this.measureHeight(context);

        return { width, height };
    }

    render(context) {}

    renderChild(context, child) {
        child.render(context.withParent(this));
    }
}

export { GuiComponent };
