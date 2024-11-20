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

        this.wrapWidth = 0;
        this.wrapHeight = 0;

        this.children = _options.child ? [_options.child] : _options.children;
    }

    get child() {
        return this.children.length === 0 ? null : this.children[0];
    }

    init(context) {
        for (const child of this.children) {
            child.init(context);
        }
    }

    dispatch(context) {
        for (const child of this.children) {
            child.dispatch(context);
        }
    }

    measure(context) {
        const view = context.view;

        let width = 0;
        let height = 0;

        if (!isEnum(this.width)) {
            width = this.width;
        } else if (this.width === Size.matchParent) {
            width = view.width;
        } else if (this.width === Size.wrapContent) {
            width = this.wrapWidth;
        }

        if (!isEnum(this.height)) {
            height = this.height;
        } else if (this.height === Size.matchParent) {
            height = view.height;
        } else if (this.height === Size.wrapContent) {
            height = this.wrapHeight;
        }

        return { width, height };
    }

    render(context) {}

    renderComponent(context, component) {
        const view = context.view;
        const size = component.measure(context);

        const componentContext = context.withParent(this).withView({
            x: view.x + (this.layout?.x ?? 0),
            y: view.y + (this.layout?.y ?? 0),
            width: size.width,
            height: size.height
        });

        component.render(componentContext);
    }
}

export { GuiComponent };
