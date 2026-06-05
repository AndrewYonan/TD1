import Game from "./core/Game.js";

import WorldFactory from "./world/WorldFactory.js"
import CanvasRenderer from "./rendering/CanvasRenderer.js";
import UIManager from "./ui/UIManager.js";
import InputController from "./input/InputController.js";
import Clock from "./core/Clock.js";

import { ENTITY_CONFIGS } from "./config/EntityConfigs.js";
import { PATH_CONFIGS } from "./config/PathConfigs.js";
import { GAME_CONFIG } from "./config/GameConfig.js";


// **********************************************************************
// **********************************************************************


const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");


const worldFactory = new WorldFactory({
    entityConfigs: ENTITY_CONFIGS,
    pathConfigs: PATH_CONFIGS,
    gameConfig: GAME_CONFIG
});


const renderer = new CanvasRenderer({
    ctx,
    width: canvas.width,
    height: canvas.height
});


const ui = new UIManager({
    root: document.querySelector("#game-ui")
})


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
    config: GAME_CONFIG
});


game.initialize();
game.start();
