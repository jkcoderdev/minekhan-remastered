import { CanvasContext } from '../CanvasContext.js';

class WebGlContextError extends Error {
    constructor(msg) {
        super(msg);
    }
}

class WebGLContext extends CanvasContext {
    constructor(selector) {
        super(selector);
        
        this.gl = this.canvas.getContext('webgl') || this.canvas.getContext('webgl-experimental');

        if (!this.gl) {
            const compatibilityErrorMsg = 'WebGL is not supported in this browser. Please upgrade your browser to the newest version in order to be able to play this game.';
            alert(compatibilityErrorMsg);
            throw new WebGlContextError(compatibilityErrorMsg);
        }

        this.on('resize', () => {
            this.gl.viewport(0, 0, this.width, this.height);
        });
    }
}

export { WebGLContext };