
import World from "./World.js";

export default class WorldFactory {

    constructor({entityConfigs, pathConfigs, gameConfig}) {

        this.entityConfigs = entityConfigs;
        this.pathConfigs = pathConfigs;
        this.gameConfig = gameConfig;

    }

    makeDefaultWorld(pathPreset) {

        const path = this.pathConfigs[pathPreset];

        return new World({
            path,
            startingLives: 100,
            startingMoney: 100
        });
    }
}