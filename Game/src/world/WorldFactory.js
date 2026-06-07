
import GamePath from "../path/GamePath.js";
import World from "./World.js";

export default class WorldFactory {

    constructor({entityConfigs, pathConfigs, gameConfig}) {

        this.entityConfigs = entityConfigs;
        this.pathConfigs = pathConfigs;
        this.gameConfig = gameConfig;

    }

    makeDefaultWorld(pathPreset) {

        const controlPoints = this.pathConfigs[pathPreset];
        const canvasW = this.gameConfig.width;
        const canvasH = this.gameConfig.height;
        const gamePath = new GamePath(controlPoints, canvasW, canvasH, this.gameConfig);

        return new World({
            gamePath,
            startingLives: 100,
            startingMoney: 100
        });
    }
}