import CollisionSystem from "../systems/CollisionSystem.js";

export default class CollisionSystemFactory {
    constructor({config, towerGraphicsConfig}) {
        this.config = config;
        this.towerGraphicsConfig = towerGraphicsConfig;
    }

    create() {
        return new CollisionSystem(
            this.config.WIDTH, 
            this.config.HEIGHT,
            this.towerGraphicsConfig,
        );
    }
}