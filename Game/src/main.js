
import Game from "./core/Game.js";
import WorldFactory from "./world/WorldFactory.js"
import BezierPathBuilder from "./path/BezierPathBuilder.js";
import CanvasRenderer from "./rendering/CanvasRenderer.js";
import UIManager from "./ui/UIManager.js";
import InputController from "./input/InputController.js";
import Clock from "./core/Clock.js";

import { buildCanvasContext } from "./rendering/CanvasBuilder.js";
import { ENTITY_CONFIG } from "./config/EntityConfig.js";
import { PATH_CONFIG } from "./config/PathConfig.js";
import { GAME_CONFIG } from "./config/GameConfig.js";
import { GRAPHICS_CONFIG } from "./config/GraphicsConfig.js";


// **********************************************************************
// **********************************************************************


const canvas = document.querySelector("#game-canvas");

const ctx = buildCanvasContext({
    canvas,
    width: GAME_CONFIG.WIDTH,
    height: GAME_CONFIG.HEIGHT,
    graphicsConfig: GRAPHICS_CONFIG
});


const bezierPathBuilder = new BezierPathBuilder({
    pathConfig: PATH_CONFIG,
    gameConfig: GAME_CONFIG,
    graphicsConfig: GRAPHICS_CONFIG
});


const worldFactory = new WorldFactory({
    entityConfigs : ENTITY_CONFIG,
    gameConfig: GAME_CONFIG,
    bezierPathBuilder
});


const renderer = new CanvasRenderer({
    ctx,
    width: GAME_CONFIG.WIDTH,
    height: GAME_CONFIG.HEIGHT,
    graphicsConfig: GRAPHICS_CONFIG
});


const ui = new UIManager({
    root: document.querySelector("#game-ui")
});


const input = new InputController({
    root: document
});


const clock = new Clock();


const game = new Game({
    worldFactory,
    renderer,
    ui,
    input,
    clock,
    gameConfig: GAME_CONFIG
});


game.initialize();
game.start();
