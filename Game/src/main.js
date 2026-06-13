import Game from "./core/Game.js";
import WorldFactory from "./world/WorldFactory.js"
import CollisionSystemFactory from "./systems/CollisionSystemFactory.js";
import EntityFactory from "./entities/EntityFactory.js";
import TowerFactory from "./towers/TowerFactory.js";
import RoundSystemFactory from "./round/RoundSystemFactory.js";
import BezierPathBuilder from "./path/BezierPathBuilder.js";
import CanvasRenderer from "./rendering/CanvasRenderer.js";
import PathRenderer from "./rendering/PathRenderer.js";
import TowerRenderer from "./rendering/TowerRenderer.js";
import EntityRenderer from "./rendering/EntityRenderer.js";
import ProjectileRenderer from "./rendering/ProjectileRenderer.js";
import UIManager from "./ui/UIManager.js";
import InputController from "./input/InputController.js";
import Clock from "./core/Clock.js";

import { buildCanvasContext } from "./rendering/CanvasBuilder.js";
import { ENTITY_CONFIG } from "./config/EntityConfig.js";
import { PATH_CONFIG } from "./config/PathConfig.js";
import { GAME_CONFIG } from "./config/GameConfig.js";
import { ROUND_CONFIG } from "./config/RoundConfig.js";
import { TOWER_UPGRADE_CONFIG } from "./config/UpgradeConfig.js";
import { GRAPHICS_CONFIG } from "./config/GraphicsConfig.js";
import { UI_GRAPHICS_CONFIG } from "./ui/UIGraphicsConfig.js";
import { PATH_GRAPHICS_CONFIG } from "./config/GraphicsConfig.js"
import { ENTITY_GRAPHICS_CONFIG } from "./config/GraphicsConfig.js";
import { TOWER_GRAPHICS_CONFIG } from "./config/TowerGraphicsConfig.js";
import { PROJECTILE_GRAPHICS_CONFIG } from "./config/GraphicsConfig.js";


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
    pathGraphicsConfig: PATH_GRAPHICS_CONFIG
});


const entityFactory = new EntityFactory({
    entityConfig : ENTITY_CONFIG,
    entityGraphicsConfig: ENTITY_GRAPHICS_CONFIG
});

const towerFactory = new TowerFactory({
    towerUpgradeConfig: TOWER_UPGRADE_CONFIG,
    towerGraphicsConfig: TOWER_GRAPHICS_CONFIG
})

const roundSystemFactory = new RoundSystemFactory({
    roundConfig: ROUND_CONFIG,
    entityConfig : ENTITY_CONFIG
});

const collisionSystemFactory = new CollisionSystemFactory({
    config: GAME_CONFIG,
    towerGraphicsConfig: TOWER_GRAPHICS_CONFIG
});

const worldFactory = new WorldFactory({
    entityFactory,
    towerFactory,
    roundSystemFactory,
    gameConfig: GAME_CONFIG,
    bezierPathBuilder
});

const pathRenderer = new PathRenderer({
    pathGraphicsConfig: PATH_GRAPHICS_CONFIG,
    graphicsConfig: GRAPHICS_CONFIG
});

const entityRenderer = new EntityRenderer({
    config: ENTITY_GRAPHICS_CONFIG
});

const towerRenderer = new TowerRenderer({
    towerGraphicsConfig: TOWER_GRAPHICS_CONFIG,
    towerUpgradeConfig: TOWER_UPGRADE_CONFIG
});

const projectileRenderer = new ProjectileRenderer({
    config: PROJECTILE_GRAPHICS_CONFIG
});

const renderer = new CanvasRenderer({
    ctx,
    width: GAME_CONFIG.WIDTH,
    height: GAME_CONFIG.HEIGHT,
    graphicsConfig: GRAPHICS_CONFIG,
    pathRenderer,
    entityRenderer,
    towerRenderer,
    projectileRenderer
});

const ui = new UIManager({
    root: document.querySelector("#game-ui"),
    towerUpgradeConfig: TOWER_UPGRADE_CONFIG,
    UIGraphicsConfig: UI_GRAPHICS_CONFIG
});


const input = new InputController({
    root: document,
    canvas
});


const clock = new Clock();


const game = new Game({
    worldFactory,
    collisionSystemFactory,
    renderer,
    ui,
    input,
    clock,
    gameConfig: GAME_CONFIG
});


game.initialize();
game.syncUI();
