import Entity from "../entities/Entity.js";

export default class World {

    constructor({gamePath, startingLives, startingMoney, entityConfigs}) {

        this.entities = [];
        this.gamePath = gamePath;
        this.lives = startingLives;
        this.money = startingMoney;
        this.entityConfigs = entityConfigs;

        this.spawned = false;

    }

    getMovementPoints() {
        return this.gamePath.getMovementPoints();
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

    update(dt) {
        if (!this.spawned) {
            this.spawnEntity(1, this.gamePath.getMovementPoints());
            this.spawned = true;
        }

        this.updateEntities(dt);
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

    spawnEntity(rank, path) {
        const speed = this.entityConfigs[rank].speed;
        const health = this.entityConfigs[rank].health;
        this.entities.push(new Entity(rank, speed, health, path));
    }

    isGameOver() {
        return this.lives <= 0;
    }
}