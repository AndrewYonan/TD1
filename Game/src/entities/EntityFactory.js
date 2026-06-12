import Entity from "../entities/Entity.js";

export default class EntityFactory {

    constructor({entityConfig, entityGraphicsConfig}) {
        this.entityConfig = entityConfig;
        this.entityGraphicsConfig = entityGraphicsConfig;
        this.IDCount = 0;
    }

    create(rank, pathPoints) {

        if (rank === 0) return null;
        
        const config = this.entityConfig[rank];
        const size = this.entityGraphicsConfig[rank].size;

        if (!config) {
            throw new Error(`Unknown entity rank ${rank}`);
        }

        this.IDCount++;

        return new Entity({
            rank, 
            size,
            pathPoints,
            entityConfig: this.entityConfig,
            uniqueID: this.IDCount
        });
    }
}