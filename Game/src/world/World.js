

export default class World {

    constructor({gamePath, entityFactory, roundSystem, startingLives, startingMoney}) {

        this.entities = [];
        this.gamePath = gamePath;
        this.entityFactory = entityFactory;
        this.lives = startingLives;
        this.money = startingMoney;

        this.roundActive = false;
        this.roundSystem = roundSystem;

    }

    startRound() {
        this.roundActive = true;
    }

    isGameOver() {
        return this.lives <= 0;
    }

    spawnEntity(rank) {

        const entity = this.entityFactory.create(rank, this.gamePath.getMovementPoints());
        this.entities.push(entity);
    }
    

    update(dt) {

        this.updateEntities(dt);

        if (!this.roundActive) return;

        const result = this.roundSystem.update(dt);

        if (result.type === "round-complete") {
            this.roundActive = false;
        }

        if (result.type === "spawn") {
            this.spawnEntity(result.rank);
        }
        
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