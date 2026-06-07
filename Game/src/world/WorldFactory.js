

import World from "./World.js";

export default class WorldFactory {

    constructor({entityConfigs, pathConfigs, gameConfig, bezierPathBuilder}) {

        this.entityConfigs = entityConfigs;
        this.pathConfigs = pathConfigs;
        this.gameConfig = gameConfig;
        this.bezierPathBuilder = bezierPathBuilder;

    }

    makeDefaultWorld(pathPreset) {

        const gamePath = this.bezierPathBuilder.buildFromPreset(pathPreset);

        return new World({
            gamePath,
            startingLives: this.gameConfig.STARTING_LIVES,
            startingMoney: this.gameConfig.STARTING_MONEY
        });
    }
}