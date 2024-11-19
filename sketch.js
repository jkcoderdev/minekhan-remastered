function minmax(min, max, value) {
    if (value < min) return min;
    if (value > max) return max;

    return value;
}

class Color {
    constructor(r, g, b, a=1) {
        this.r = Number(r) || 0;
        this.g = Number(g) || 0;
        this.b = Number(b) || 0;
        this.a = Number(a) || 0;
    }

    toString() {
        let color = '#';
        color += minmax(0, 255, Math.floor(this.r)).toString(16).padStart(2, '0');
        color += minmax(0, 255, Math.floor(this.g)).toString(16).padStart(2, '0');
        color += minmax(0, 255, Math.floor(this.b)).toString(16).padStart(2, '0');

        if (this.a < 1) {
            color += minmax(0, 255, Math.floor(this.a * 255)).toString(16).padStart(2, '0');
        }

        return color;
    }
}

/**
 * @description Contains all rendering contexts, information about parent component, current screen etc. For now it doesn't have any parameters in the constructor but it will need have them
 */
class GuiContext {
    constructor() {}

    // get overlay() {
    //     ...
    // }

    // get view() {
    //     ...
    // }

    // get parent() {
    //     ...
    // }
}

class GuiScreen {
    constructor() {
        this.layout = null;
    }

    init(context) {
        if (this.layout) {
            // Create new context based on this screen context "context"
            const layoutContext = new GuiContext();

            this.layout.init(layoutContext);
        }
    }

    dispatch(context) {
        if (this.layout) {
            // Create new context based on this screen context "context"
            const layoutContext = new GuiContext();

            this.layout.dispatch(layoutContext);
        }
    }

    render(context) {
        if (this.layout) {
            // Create new context based on this screen context "context"
            const layoutContext = new GuiContext();

            this.layout.render(layoutContext);
        }
    }
}

class OptionsManager {
    #options = new Map();

    constructor(optionsConfig) {
        if (typeof optionsConfig !== 'object') {
            throw new Error(`Please provide correct options config object`);
        }

        Object.entries(optionsConfig).forEach(([name, value]) => {
            this.#options.set(name, value);
        });
    }

    get options() {
        const options = {};

        for (const optionName of this.#options.keys()) {
            const optionValue = this.#options.get(optionName);
            options[optionName] = optionValue;
        }
    }

    setOption(name, value) {
        this.#options.set(name, value);
    }

    setOptions(options) {
        Object.entries(options).forEach(([name, value]) => {
            this.setOption(name, value);
        });
    }

    loadFromObject(_options={}) {
        for (const optionName of Object.keys(_options)) {
            const optionValue = _options[optionName];

            this.#options.set(optionName, optionValue);
        }

        return this.options;
    }
}

class GuiComponent {
    constructor(options) {
        this.optionsManager = new OptionsManager({
            width: null,
            height: null,
            child: null,
            children: []
        });

        const _options = this.optionsManager.loadFromObject(options);;

        this.width = _options.width;
        this.height = _options.height;

        if (_options.child) {
            this.children = [_options.child];
        } else {
            this.children = _options.children;
        }
    }

    get child() {
        if (this.children.length !== 0) {
            return this.children[0];
        } else {
            return null;
        }
    }

    init(context) {}

    dispatch(context) {}

    render(context) {}
}

class Container extends GuiComponent {
    constructor(options) {
        super(options);

        this.optionsManager.setOptions({
            backgroudColor: null
        });
    }
}


class Text extends GuiComponent {
    constructor(options) {
        super(options);

        this.optionsManager.setOptions({
            text: ''
        });

        const _options = this.optionsManager.loadFromObject(options);

        this.text = _options.text;
    }

    render(context) {
        super.render(context);

        const view = context.view;

        const ctx = context.overlay;

        // Render text
    }
}

class DemoScreen extends GuiScreen {
    constructor() {
        super();

        this.layout = new Container({
            child: new Text({
                text: 'Hello World!'
            })
        });
    }
}

class GuiRenderer {
    constructor() {
        this.currentScreen = null;
    }

    setScreen(screen) {
        if (this.currentScreen) {
            this.currentScreen.dispatch(new GuiContext());
        }
    }
}