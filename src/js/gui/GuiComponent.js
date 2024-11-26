import { OptionsManager } from '../utils/OptionsManager.js';

import { Size, isEnum } from '../utils/enums.js';

const DEFAULT_VIEW = { x: 0, y: 0, width: 0, height: 0 };

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

        this.views = Array(this.children.length).fill(DEFAULT_VIEW);
    }

    get child() {
        return this.children.length === 0 ? null : this.children[0];
    }

    get view() {
        return this.views.length === 0 ? null : this.views[0];
    }

    set view(view) {
        if (this.views.length === 0) {
            throw new Error(`Can't set "view" property because there is no views set`);
        }

        this.views[0] = view;
    }

    init(context) {
        this.computeViews(context);

        const views = this.views;
        const children = this.children;

        for (let i = 0; i < children.length; i++) {
            const view = views[i];
            const child = children[i];

            child.init(context.withParent(this).withView(view));
        }
    }

    destroy(context) {
        this.computeViews(context);

        const views = this.views;
        const children = this.children;

        for (let i = 0; i < children.length; i++) {
            const view = views[i];
            const child = children[i];

            child.destroy(context.withParent(this).withView(view));
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

    computeViews(context) {
        this.views = Array(this.children.length).fill(DEFAULT_VIEW);
    }

    render(context) {}

    renderChildren(context) {
        this.computeViews(context);

        const views = this.views;
        const children = this.children;

        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            const view = views[i];

            child.render(context.withView(view).withParent(this));
        }
    }

    renderChild(context, child) {
        child.render(context.withParent(this));
    }
}

export { GuiComponent };
