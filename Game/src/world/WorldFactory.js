

import World from "./World.js";

export default class WorldFactory {

    constructor({entityConfigs, gameConfig, bezierPathBuilder}) {

        this.entityConfigs = entityConfigs;
        this.gameConfig = gameConfig;
        this.bezierPathBuilder = bezierPathBuilder;

    }

    makeDefaultWorld(pathPreset) {

        const gamePath = this.bezierPathBuilder.buildFromPreset(pathPreset);

        return new World({
            gamePath,
            startingLives: this.gameConfig.STARTING_LIVES,
            startingMoney: this.gameConfig.STARTING_MONEY,
            entityConfigs: this.entityConfigs,
        });
    }
}