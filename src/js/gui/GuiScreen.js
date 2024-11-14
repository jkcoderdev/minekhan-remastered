import { Dispatcher } from '../events/Dispatcher.js';

class GuiScreen extends Dispatcher {
    constructor() {
        super();
        
        this.components = [];
    }

    init(renderer) {
        const ctx = renderer.overlay;
        ctx.reset();

        this.emit('init', renderer);
    }

    dispatch(renderer) {
        const ctx = renderer.overlay;
        ctx.reset();

        this.emit('dispatch', renderer);
    }

    render(renderer) {
        const ctx = renderer.overlay;
        ctx.clear();

        this.emit('render', renderer);
    }
}

export { GuiScreen };