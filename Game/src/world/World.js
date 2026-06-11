import UnitTower from "../towers/UnitTower.js";

export default class World {

    constructor({gamePath, entityFactory, projectileFactory, roundSystem, collisionSystem, startingLives, startingMoney, startingRound}) {

        this.entities = [];
        this.towers = [];
        this.projectiles = [];
        this.gamePath = gamePath;
        this.entityFactory = entityFactory;
        this.projectileFactory = projectileFactory
        this.lives = startingLives;
        this.money = startingMoney;

        this.roundActive = false;
        this.spawningDone = false;
        this.roundSystem = roundSystem;
        this.roundSystem.setRound(startingRound);

        this.collisionSystem = collisionSystem;

        const testTower1 = new UnitTower(300, 100, this.projectiles, this.projectileFactory);
        this.addTower(testTower1);

        // const testTower2 = new UnitTower(300, 210, this.projectiles, this.projectileFactory);
        // this.addTower(testTower2);

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
        return (this.spawningDone 
                && (this.entities.length == 0)
                && (this.projectiles.length == 0)) || this.isGameOver();
    }

    addTower(tower) {
        this.towers.push(tower);
    }

    spawnEntity(rank) {

        const entity = this.entityFactory.create(rank, this.gamePath.getMovementPoints());

        if (entity) {
            this.entities.push(entity);
            this.collisionSystem.add(entity);
        }
        
    }

    update(dt) {

        if (this.roundComplete()) this.roundActive = false;

        this.updateEntities(dt);
        this.updateTowers(dt);
        this.updateProjectiles(dt);

        if (!this.roundActive) return;

        const result = this.roundSystem.update(dt);

        if (result.type === "spawn") this.spawnEntity(result.rank);
        if (result.type === "spawning-done") this.spawningDone = true;
        
    }

    getProjectileEntityCollisions() {

    }

    getRenderSnapshot() {
        return {
            path: {
                renderPoints: this.gamePath.getRenderPoints(),
                movementPoints: this.gamePath.getMovementPoints()
            },
            entityData: this.entities.map(entity => entity.getRenderSnapshot()),
            towerData: this.towers.map(tower => tower.getRenderSnapshot()),
            projectileData: this.projectiles.map(projectile => projectile.getRenderSnapshot())
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

    killEntity(entityID) {
        for (let i = 0; i < this.entities.length; ++i) {
            if (this.entities[i].getUniqueID() == entityID) {
                this.entities[i].kill();
                this.entities.splice(i, 1);
            }
        }
    }

    killProjectile(projID) {
        for (let i = 0; i < this.projectiles.length; ++i) {
            if (this.projectiles[i].getUniqueID() == projID) {
                this.projectiles[i].kill();
                this.projectiles.splice(i, 1);
            }
        }
    }

    updateProjectiles(dt) {

        let i = 0;

        while (i < this.projectiles.length) {

            if (this.collisionSystem.offScreen(this.projectiles[i])) {
                this.projectiles.splice(i, 1);
                continue;
            }

            const proj = this.projectiles[i];
            const entityCollideIdx = this.collisionSystem.getSingleCollision(proj, this.entities);
            const entity = this.entities[entityCollideIdx];
            let projectileKilled = false;

            if (entityCollideIdx > -1) {
                if (this.isFreshCollision(proj,entity)) {
                    if (this.projectileHitRoutine(entityCollideIdx, i)) {
                        projectileKilled = true;
                    }
                }
            }

            if (!projectileKilled) {
                this.projectiles[i].update(dt);
                i++;
            }      
        }
    }

    isFreshCollision(proj, entity) {
        return proj.getMostRecentlyHitID() != entity.getUniqueID();
    }

    projectileHitRoutine(entityHitIdx, projIdx) {

        const entity = this.entities[entityHitIdx];
        const entityId = entity.getUniqueID();
        const proj = this.projectiles[projIdx];

        const damageDone = entity.hit(proj.getDamage());
        this.money += damageDone;

        proj.hit(entityId);

        if (entity.isDead()) this.entities.splice(entityHitIdx, 1);

        if (proj.isDead()) {
            this.projectiles.splice(projIdx, 1);
            return true;
        }

        return false;
    }


    updateTowers(dt) {
        for (let i = 0; i < this.towers.length; ++i) {
            this.towers[i].update(dt, this.entities);
        }
    }
}