import Entity from "../entities/Entity.js";

export default class EntityFactory {

    constructor({entityConfig}) {
        this.entityConfig = entityConfig;
    }

    create(rank, pathPoints) {
        
        const config = this.entityConfig[rank];

        if (!config) {
            throw new Error(`Unknown entity rank ${rank}`);
        }

        return new Entity({
            rank, 
            speed: config.speed,    
            health: config.health, 
            pathPoints
        });
    }
}