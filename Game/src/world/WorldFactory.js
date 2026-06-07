
import RoundSystem from "../systems/RoundSystem.js";
import World from "./World.js";

export default class WorldFactory {

    constructor({entityConfig, gameConfig, roundConfig, bezierPathBuilder}) {

        this.entityConfig = entityConfig;
        this.gameConfig = gameConfig;
        this.roundConfig = roundConfig
        this.bezierPathBuilder = bezierPathBuilder;

    }

    makeDefaultWorld(pathPreset) {

        const gamePath = this.bezierPathBuilder.buildFromPreset(pathPreset);

        return new World({
            gamePath,
            entityConfig: this.entityConfig,
            roundSystem: new RoundSystem(this.roundConfig, this.entityConfig)
        });
    }
}