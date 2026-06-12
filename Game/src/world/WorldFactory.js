import World from "./World.js";
import ProjectileFactory from "../towers/ProjectileFactory.js";

export default class WorldFactory {

    constructor({entityFactory, towerFactory, roundSystemFactory, gameConfig, bezierPathBuilder}) {


        this.entityFactory = entityFactory;
        this.towerFactory = towerFactory;
        this.roundSystemFactory = roundSystemFactory;
        this.gameConfig = gameConfig;
        this.bezierPathBuilder = bezierPathBuilder;

    }

    makeDefaultWorld({round, pathPreset, collisionSystem}) {

        const gamePath = this.bezierPathBuilder.buildFromPreset(pathPreset);

        return new World({
            gamePath,
            collisionSystem,
            entityFactory: this.entityFactory,
            towerFactory: this.towerFactory,
            projectileFactory: new ProjectileFactory(),
            roundSystem: this.roundSystemFactory.create(),
            startingLives: this.gameConfig.STARTING_LIVES,
            startingMoney: this.gameConfig.STARTING_MONEY,
            startingRound: round
        });
    }
}