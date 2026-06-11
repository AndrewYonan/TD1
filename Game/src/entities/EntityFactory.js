import Entity from "../entities/Entity.js";

export default class EntityFactory {

    constructor({entityConfig}) {
        this.entityConfig = entityConfig;
        this.IDCount = 0;
    }

    create(rank, pathPoints) {

        if (rank === 0) return null;
        
        const config = this.entityConfig[rank];

        if (!config) {
            throw new Error(`Unknown entity rank ${rank}`);
        }

        this.IDCount++;

        return new Entity({
            rank, 
            pathPoints,
            entityConfig: this.entityConfig,
            uniqueID: this.IDCount
        });
    }
}