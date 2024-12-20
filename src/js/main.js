import { disableZoom } from './utils/disableZoom.js';

import { Renderer } from './render/Renderer.js';

import { AssetsManager } from './assets/AssetsManager.js';
import { GuiRenderer } from './render/GuiRenderer.js';

import { MainMenuScreen } from './gui/screens/MainMenuScreen.js';

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

// Workers
assets.addWorker('caves', 'Caves.js');

const renderer = new Renderer('#overlay', '#webgl');
const gui = new GuiRenderer(renderer);

(async function() {
    const { images, shaders, workers } = await assets.loadEverything();

    // All assets are loaded so remove loading screen
    const loadingDisapearAnimation = loading.animate({ opacity: 0 }, { duration: 500 });
    loadingDisapearAnimation.addEventListener('finish', () => loading.remove());

    // Compile all shaders
    renderer.compileShaders(shaders);

    // Make images accessible from renderer object
    renderer.storeImages(images);

    gui.setScreen(new MainMenuScreen());
})();