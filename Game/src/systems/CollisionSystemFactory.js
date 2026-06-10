import CollisionSystem from "../systems/CollisionSystem.js";

export default class CollisionSystemFactory {
    constructor({config}) {
        this.config = config;
    }

    create() {
        return new CollisionSystem(this.config.WIDTH, this.config.HEIGHT);
    }
}