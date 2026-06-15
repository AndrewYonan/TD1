
export default class World {

    constructor({gamePath, collisionSystem, entityFactory, towerFactory, projectileFactory, roundSystem, startingLives, startingMoney, startingRound}) {

        this.entities = [];
        this.towers = [];
        this.projectiles = [];
        this.gamePath = gamePath;
        this.entityFactory = entityFactory;
        this.towerFactory = towerFactory;
        this.projectileFactory = projectileFactory;
        this.lives = startingLives;
        this.money = startingMoney;

        this.roundActive = false;
        this.spawningDone = false;
        this.roundSystem = roundSystem;
        this.roundSystem.setRound(startingRound);

        this.collisionSystem = collisionSystem;
        this.collisionSystem.addPathToBuffer(
            gamePath.getCollisionPoints(), 
            gamePath.getWidth());
    }

    getMoney() {
        return this.money;
    }

    getTargetingPolicies() {
        return this.towerFactory.getTargetingPolicies();
    }

    rotateTargetingPolicy(towerID, val) {
        let tower = this.getTower(towerID);
        this.towerFactory.rotateTargetingPolicy(tower, val);
    }

    upgrade(towerID, level) {
        let tower = this.getTower(towerID);
        this.towerFactory.upgrade(tower, level);
    }

    getTower(ID) {
        for (const tower of this.towers) {
            if (tower.getUniqueID() === ID) {
                return tower;
            }
        }
    }

    setHighlight(towerID, value) {
        for (const tower of this.towers) {
            if (tower.getUniqueID() === towerID) {
                tower.highlight(value);
            }
        }
    }

    unhighlightAllTowers() {
        for (const tower of this.towers) {
            tower.highlight(false);
        }
    }

    startNextRound() {
        if (!this.roundSystem.hasNextRound()) return;
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

    addTower(type, loc) {
        if (type === "unit") {
            const tower = this.towerFactory.createUnitTower({
                loc, 
                projectileSet: this.projectiles, 
                projectileFactory: this.projectileFactory,
                upgradeLevel: 0
            });
            this.towers.push(tower);
            this.collisionSystem.addTowerToBuffer(tower.loc, tower.type, tower.uniqueID);
        }
        
    }

    spawnEntity(rank) {
        const entity = this.entityFactory.create(rank, this.gamePath.getMovementPoints());
        if (entity) this.entities.push(entity);
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

    getRenderSnapshot() {
        return {
            path: {
                renderPoints: this.gamePath.getRenderPoints(),
                movementPoints: this.gamePath.getMovementPoints()
            },
            entityData: this.entities.map(entity => entity.getRenderSnapshot()),
            towerData: this.towers.map(tower => tower.getRenderSnapshot()),
            projectileData: this.projectiles.map(projectile => projectile.getRenderSnapshot()),
            collisionBufferData: this.collisionSystem.getBuffer()
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

    getTowerUISnapshot(towerID) {
        for (const tower of this.towers) {
            if (tower.getUniqueID() === towerID) {
                return tower.getUISnapshot();
            }
        }
        return null;
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

    updateProjectiles(dt) {

        let i = 0;

        while (i < this.projectiles.length) {

            if (this.collisionSystem.offScreen(this.projectiles[i])) {
                this.projectiles.splice(i, 1);
                continue;
            }

            const proj = this.projectiles[i];
            const entityCollideIdx = this.collisionSystem.getProjEntityCollision(proj, this.entities);
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