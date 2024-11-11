import { CanvasContext } from '../CanvasContext.js';

class WebGlContextError extends Error {
    constructor(msg) {
        super(msg);
    }
}

class WebGLContext extends CanvasContext {
    #programs = new Map();

    constructor(selector) {
        super(selector);
        
        /**
         * @type WebGLRenderingContext
         */
        this.gl = this.canvas.getContext('webgl') || this.canvas.getContext('webgl-experimental');

        if (!this.gl) {
            const compatibilityErrorMsg = 'WebGL is not supported in this browser. Please update your browser to the newest version in order to be able to play this game.';
            alert(compatibilityErrorMsg);
            throw new WebGlContextError(compatibilityErrorMsg);
        }

        this.on('resize', () => {
            this.gl.viewport(0, 0, this.width, this.height);
        });
    }

    clear() {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }

    compileShader(name, shader) {
        const exists = this.#programs.has(name);
        if (exists) {
            throw new Error(`Shader named '${name}' already exists`);
        }

        const isValidObject = typeof shader === 'object' && typeof shader.vert === 'string' && typeof shader.frag === 'string';
        if (!isValidObject) {
            throw new Error(`Please provide correct shader config object:\n{ vert: string; frag: string; }`);
        }

        const gl = this.gl;

        const vertexShader = gl.createShader(gl.VERTEX_SHADER);
        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

        gl.shaderSource(vertexShader, shader.vert);
        gl.compileShader(vertexShader);

        if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
            throw new Error(gl.getShaderInfoLog(vertexShader));
        }

        gl.shaderSource(fragmentShader, shader.frag);
        gl.compileShader(fragmentShader);

        if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
            throw new Error(gl.getShaderInfoLog(fragmentShader));
        }

        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        
	    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            throw new Error(gl.getProgramInfoLog(program));
        }

        this.#programs.set(name, program);

        return program;
    }

    useShader(name) {
        const exists = this.#programs.has(name);
        if (!exists) {
            throw new Error(`Shader named '${name}' doesn't exist`);
        }

        const program = this.#programs.get(name);
        this.gl.useProgram(program);
    }
}

export { WebGLContext };