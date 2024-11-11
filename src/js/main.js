import { WebGLContext } from './render/webgl/WebGLContext.js';
import { FlatContext } from './render/2d/FlatContext.js';

import { AssetsManager } from './assets/AssetsManager.js';

const assets = new AssetsManager();
assets.addImage('landscape', 'minekhan-landscape.png');

const webglContext = new WebGLContext('canvas#webgl');
const overlayContext = new FlatContext('canvas#overlay');

(async function() {
    const { fonts, images, shaders, workers } = await assets.loadEverything();

    console.log(fonts);
    console.log(images),
    console.log(shaders);
    console.log(workers);
})();