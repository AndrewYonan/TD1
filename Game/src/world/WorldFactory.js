

import World from "./World.js";

export default class WorldFactory {

    constructor({entityFactory, roundSystemFactory, gameConfig, bezierPathBuilder}) {

        this.entityFactory = entityFactory;
        this.roundSystemFactory = roundSystemFactory
        this.gameConfig = gameConfig;
        this.bezierPathBuilder = bezierPathBuilder;

    }

    makeDefaultWorld({round, pathPreset}) {

        const gamePath = this.bezierPathBuilder.buildFromPreset(pathPreset);

        return new World({
            gamePath,
            entityFactory: this.entityFactory,
            roundSystem: this.roundSystemFactory.create(),
            startingLives: this.gameConfig.STARTING_LIVES,
            startingMoney: this.gameConfig.STARTING_MONEY,
            startingRound: round
        });
    }
}