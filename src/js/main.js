import { disableZoom } from './utils/disableZoom.js';

import { WebGLContext } from './render/webgl/WebGLContext.js';
import { FlatContext } from './render/2d/FlatContext.js';

import { AssetsManager } from './assets/AssetsManager.js';

// Prevent user from zooming in on the website
disableZoom();

const loading = document.querySelector('#loading');

const assets = new AssetsManager();

// Fonts
assets.addFont('MinecraftCHMC', 'minecraftchmc/MinecraftCHMC.ttf');

// Images
assets.addImage('landscape', 'minekhan-landscape.png');

// Shaders
assets.addShader('2d', '2d');
assets.addShader('block', 'block');
assets.addShader('block-fogless', 'block-fogless');
assets.addShader('entity', 'entity');
assets.addShader('sky', 'sky');

const webglContext = new WebGLContext('canvas#webgl');
const overlayContext = new FlatContext('canvas#overlay');

(async function() {
    const { fonts, images, shaders, workers } = await assets.loadEverything();

    // All assets are loaded so remove loading screen
    const loadingDisapearAnimation = loading.animate({ opacity: 0 }, { duration: 500 });
    loadingDisapearAnimation.addEventListener('finish', () => loading.remove());

    // Compile all shaders
    shaders.forEach((shader, name) => {
        webglContext.compileShader(name, shader);
    });

    console.log(fonts);
    console.log(images),
    console.log(shaders);
    console.log(workers);

    overlayContext.on('frame', () => {
        overlayContext.backgroundImage(images.get('landscape'));

        const { width, height } = overlayContext;

        overlayContext.fontFamily('MinecraftCHMC');
        overlayContext.textAlign('center');
        overlayContext.textBaseline('middle');
        overlayContext.fontSize(128);
        overlayContext.fillColor('#aaaaaa');
        overlayContext.text('Hello World', width / 2, height / 2);
    });
})();