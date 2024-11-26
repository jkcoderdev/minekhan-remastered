import { GuiComponent } from '../GuiComponent.js';

import { Size, Alignment } from '../../utils/enums.js';

class VerticalLayout extends GuiComponent {
    constructor(options) {
        super(options);

        this.optionsManager.setOptions({
            width: Size.matchParent,
            height: Size.wrapContent,
            alignment: Alignment.topLeft,
            gap: 0,
        });

        const _options = this.optionsManager.loadFromObject(options);

        this.width = _options.width;
        this.height = _options.height;

        this.alignment = _options.alignment;

        this.gap = _options.gap;
    }

    wrapHeight(context) {
        let height = this.gap * Math.max(this.children.length - 1, 0);

        for (const child of this.children) {
            height += child.measureHeight(context);
        }

        return height;
    }

    wrapWidth(context) {
        let maxWidth = 0;

        for (const child of this.children) {
            const width = child.measureWidth(context);
            if (maxWidth < width) {
                maxWidth = width;
            }
        }

        return maxWidth;
    }

    computeViews(context) {
        super.computeViews(context);

        const view = context.view;
        const size = this.measure(context);

        const wrapWidth = this.wrapWidth(context);
        const wrapHeight = this.wrapHeight(context);

        const children = this.children;

        let aligmentX = 'start';
        let aligmentY = 'start';

        switch (this.alignment) {
            case Alignment.topLeft:
                aligmentX = 'start';
                aligmentY = 'start';
                break;
            case Alignment.topCenter:
                aligmentX = 'center';
                aligmentY = 'start';
                break;
            case Alignment.topRight:
                aligmentX = 'end';
                aligmentY = 'start';
                break;
            case Alignment.centerLeft:
                aligmentX = 'start';
                aligmentY = 'center';
                break;
            case Alignment.center:
                aligmentX = 'center';
                aligmentY = 'center';
                break;
            case Alignment.centerRight:
                aligmentX = 'end';
                aligmentY = 'center';
                break;
            case Alignment.bottomLeft:
                aligmentX = 'start';
                aligmentY = 'end';
                break;
            case Alignment.bottomCenter:
                aligmentX = 'center';
                aligmentY = 'end';
                break;
            case Alignment.bottomRight:
                aligmentX = 'end';
                aligmentY = 'end';
                break;
        }

        let y = 0;

        for (let i = 0; i < children.length; i++) {
            const child = children[i];

            const childSize = child.measure(context);
            
            let offsetX = 0;
            let offsetY = 0;

            if (aligmentX === 'center') {
                offsetX = (size.width - wrapWidth) / 2 + (wrapWidth - childSize.width) / 2;
            } else if (aligmentX === 'end') {
                offsetX = size.width - childSize.width;
            }

            if (aligmentY === 'center') {
                offsetY = (size.height - wrapHeight) / 2;
            } else if (aligmentY === 'end') {
                offsetY = size.height - wrapHeight;
            }

            const childView = {
                x: view.x + offsetX,
                y: view.y + offsetY + y,
                width: childSize.width,
                height: childSize.height,
            };

            this.views[i] = childView;

            y += childSize.height + this.gap;
        }
    }

    render(context) {
        super.render(context);

        this.renderChildren(context);

        // const view = context.view;
        // const size = this.measure(context);

        // let y = 0;

        // for (const child of this.children) {
        //     const childSize = child.measure(context);
        //     const childView = {
        //         x: view.x,
        //         y: view.y + y,
        //         width: childSize.width,
        //         height: childSize.height,
        //     };

        //     this.renderChild(context.withView(childView), child);

        //     y += childSize.height + this.gap;
        // }
    }
}

export { VerticalLayout };