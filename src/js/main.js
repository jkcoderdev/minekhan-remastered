import { WebGLContext } from './render/webgl/WebGLContext.js';
import { FlatContext } from './render/2d/FlatContext.js';

const webglContext = new WebGLContext('canvas#webgl');
const overlayContext = new FlatContext('canvas#overlay');

webglContext.on('frame', ({ fps }) => {
    // console.log(`WebGL Canvas FPS: ${fps}`);
});

webglContext.on('resize', () => console.log('Resized'));