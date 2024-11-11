import { WebGLContext } from './render/webgl/WebGLContext.js';
import { FlatContext } from './render/2d/FlatContext.js';

import { AssetsManager } from './assets/AssetsManager.js';

const loading = document.querySelector('#loading');

const assets = new AssetsManager();
assets.addImage('landscape', 'minekhan-landscape.png');

const webglContext = new WebGLContext('canvas#webgl');
const overlayContext = new FlatContext('canvas#overlay');

(async function() {
    const { fonts, images, shaders, workers } = await assets.loadEverything();

    // All assets are loaded so remove loading screen
    const loadingDisapearAnimation = loading.animate({ opacity: 0 }, { duration: 500 });
    loadingDisapearAnimation.addEventListener('finish', () => loading.remove());

    console.log(fonts);
    console.log(images),
    console.log(shaders);
    console.log(workers);
})();