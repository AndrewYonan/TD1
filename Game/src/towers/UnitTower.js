import { dist } from "../math/Utils.js";

export default class UnitTower {

    constructor(loc, upgradeLevel, fireRate, bulletSpeed, pierce, damage, range, projectileSet, projectileFactory, uniqueID) {

        this.loc = loc;
        this.type = "unit";
        this.upgradeLevel = upgradeLevel,
        this.projectileSet = projectileSet;
        this.projectileFactory = projectileFactory;
        
        this.fireRate = fireRate;
        this.bulletSpeed = bulletSpeed;
        this.pierce = pierce;
        this.damage = damage;
        this.range = range;

        this.target = null;
        this.fireCooldownTimer = 0;
        this.gunAngle = 0;
        this.showRadius = false;
        this.uniqueID = uniqueID;
    }

    highlight(value) {
        this.showRadius = value;
    }

    getUniqueID() {
        return this.uniqueID; 
    }

    getType() {
        return this.type;
    }

    inRangeOf(entity) {
        if (!entity) return false;
        return dist(this.loc, entity.loc) <= this.range;
    }

    locateTarget() {
        if (!this.target) return false;
        const dir = this.target.loc.sub(this.loc);
        this.gunAngle = this.getGunAngle(dir);
        return true;
    }

    targetOutOfRange() {
        if (!this.target) return true;
        return dist(this.loc, this.target.loc) > this.range;
    }

    getGunAngle(dir) {
        if (dir.x == 0) {
            if (dir.y > 0) {
                return Math.PI/2;
            }
            else {
                return -Math.PI/2;
            }
        }
        if (dir.x < 0) {
            return Math.PI + Math.atan(dir.y / dir.x);
        }
        return Math.atan(dir.y / dir.x);
    }

    closest(entities) {
        if (entities.length == 0) return;
        let entity = entities[0];
        let min = dist(entity.loc, this.loc);
        for (let i = 1; i < entities.length; ++i) {
            const d = dist(entities[i].loc, this.loc);
            if (d < min) {
                min = d;
                entity = entities[i];
            }
        }
        return entity;
    }

    update(dt, entities) {

        this.updateCooldownTimer(dt);

        if (this.target && this.fireCooldownTimer == 0) {
            if (this.locateTarget()) this.fire();
        } 

        if (this.targetIsHit() || this.targetOutOfRange()) {
            this.target = null;
            this.findTarget(entities)
        } 
    }

    targetIsHit() {
        return this.target && this.target.isHit;
    }

    updateCooldownTimer(dt) {
        if (this.fireCooldownTimer > 0) {
            this.fireCooldownTimer = Math.max(0, this.fireCooldownTimer - dt);
        }
    }

    findTarget(entities) {
        for (let i = 0; i < entities.length; ++i) {
            if (this.inRangeOf(entities[i])) {
                this.target = entities[i];
                return true;
            }
        }
        return false;
    }

    fire() {
        const bullet = this.projectileFactory.create(
            "unit", 
            this.loc, 
            this.gunAngle, 
            this.bulletSpeed, 
            this.pierce, 
            this.damage);
        this.projectileSet.push(bullet);
        this.fireCooldownTimer = 1 / this.fireRate;
        this.target = null;
    }

    getRenderSnapshot() {
        return {
            upgradeLevel: this.upgradeLevel,
            position: this.loc,
            angle: this.gunAngle,
            showRadius: this.showRadius,
            type: this.type
        }
    }
}