import RoundSystem from "../round/RoundSystem.js";

export default class RoundSystemFactory {

    constructor({roundConfig, entityConfig}) {
        this.roundConfig = roundConfig;
        this.entityConfig = entityConfig;
    }   

    create() {
        return new RoundSystem(this.roundConfig, this.entityConfig)
    }
}