import World from "./World.js";

export default class WorldFactory {

    constructor({entityFactory, roundSystemFactory, collisionSystemFactory, gameConfig, bezierPathBuilder}) {

        this.entityFactory = entityFactory;
        this.roundSystemFactory = roundSystemFactory;
        this.collisionSystemFactory = collisionSystemFactory;
        this.gameConfig = gameConfig;
        this.bezierPathBuilder = bezierPathBuilder;

    }

    makeDefaultWorld({round, pathPreset}) {

        const gamePath = this.bezierPathBuilder.buildFromPreset(pathPreset);

        return new World({
            gamePath,
            entityFactory: this.entityFactory,
            roundSystem: this.roundSystemFactory.create(),
            collisionSystem: this.collisionSystemFactory.create(),
            startingLives: this.gameConfig.STARTING_LIVES,
            startingMoney: this.gameConfig.STARTING_MONEY,
            startingRound: round
        });
    }
}