import { CanvasContext } from '../CanvasContext.js';

class FlatContext extends CanvasContext {
    constructor(selector) {
        super(selector);

        this.ctx = this.canvas.getContext('2d');
    }
}

export { FlatContext };