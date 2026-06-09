

export default class World {

    constructor({gamePath, entityFactory, roundSystem, startingLives, startingMoney, startingRound}) {

        this.entities = [];
        this.gamePath = gamePath;
        this.entityFactory = entityFactory;
        this.lives = startingLives;
        this.money = startingMoney;

        this.roundActive = false;
        this.spawningDone = false;
        this.roundSystem = roundSystem;
        this.roundSystem.setRound(startingRound);

    }

    startNextRound() {
        this.roundSystem.nextRound();
        this.spawningDone = false;
        this.roundActive = true;
    }

    isGameOver() {
        return this.lives <= 0;
    }

    isRoundActive() {
        return this.roundActive;
    }

    roundComplete() {
        return (this.spawningDone && this.entities.length == 0) || this.isGameOver();
    }

    spawnEntity(rank) {

        const entity = this.entityFactory.create(rank, this.gamePath.getMovementPoints());
        if (entity) this.entities.push(entity);
        
    }

    update(dt) {

        if (this.roundComplete()) this.roundActive = false;

        this.updateEntities(dt);

        if (!this.roundActive) return;

        const result = this.roundSystem.update(dt);

        if (result.type === "spawn") this.spawnEntity(result.rank);
        if (result.type === "spawning-done") this.spawningDone = true;
        
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

    getUIState() {
        return {
            lives: this.lives,
            money: this.money,
            round: this.roundSystem.getCurrentRound(),
            isGameOver: this.isGameOver()
        }
    }

    leak(entity) {
        this.lives = Math.max(0, this.lives - entity.health);
    }

    updateEntities(dt) {
        let i = 0;
        while (i < this.entities.length) {
            if (this.entities[i].pathCompleted) {
                this.leak(this.entities[i]);
                this.entities.splice(i, 1);
            }
            else {
                this.entities[i].update(dt);
                i++;
            }
        }
    }
}