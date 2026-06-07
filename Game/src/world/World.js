import Entity from "../entities/Entity.js";

export default class World {

    constructor({gamePath, entityConfig, roundSystem}) {

        this.entities = [];
        this.gamePath = gamePath;
        this.entityConfig = entityConfig;
        this.lives = 1;

        this.roundActive = false;
        this.roundSystem = roundSystem;
        this.startRound();

    }

    incrementRound() {
        this.currentRound++;
    }

    startRound() {
        this.roundActive = true;
    }

    isGameOver() {
        return this.lives <= 0;
    }

    spawnEntity(rank, path) {
        const speed = this.entityConfig[rank].speed;
        const health = this.entityConfig[rank].health;
        this.entities.push(new Entity(rank, speed, health, path));
    }
    

    update(dt) {

        if (this.roundActive) {

            const rank = this.roundSystem.spawn(dt);

            if (rank == -2) {
                this.roundActive = false;
                return;
            } 

            if (rank > 0) {
                this.spawnEntity(rank, this.gamePath.getMovementPoints())
            }
        }
        this.updateEntities(dt);
    }

    getRenderSnapshot() {
        return {
            path: {
                renderPoints: this.gamePath.getRenderPoints(),
                movementPoints: this.gamePath.getMovementPoints()
            },
            entityData: this.entities.map(entity => entity.getRenderSnapshot())
        };
    }

    updateEntities(dt) {
        let i = 0;
        while (i < this.entities.length) {
            if (this.entities[i].pathCompleted) {
                this.entities.splice(i, 1);
            }
            else {
                this.entities[i].update(dt);
                i++;
            }
        }
    }
}