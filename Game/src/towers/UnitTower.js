import UnitBullet from "./UnitBullet.js";
import Vector2 from "../math/Vector2.js";
import { dist } from "../math/Utils.js";

export default class UnitTower {

    constructor(x, y, projectileSet) {
        this.type = "unit";
        this.loc = new Vector2(x, y);
        this.projectileSet = projectileSet;
        
        this.fireRate = 1;
        this.bulletSpeed = 500;
        this.pierce = 2;
        this.range = 200;
        this.target = null;
        this.fireCooldownTimer = 0;
        this.gunAngle = 0;
    }

    inRangeOf(entity) {
        if (!entity) return false;
        return dist(this.loc, entity.loc) <= this.range;
    }

    watchTarget() {
        if (!this.target) return;
        const dir = this.target.loc.sub(this.loc);
        this.gunAngle = this.getGunAngle(dir);
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

        if (this.fireCooldownTimer > 0) {
            this.fireCooldownTimer = Math.max(0, this.fireCooldownTimer - dt);
        }

        this.watchTarget();

        if (this.target && this.fireCooldownTimer == 0) this.fire();

        if (this.targetOutOfRange()) {
            this.target = null;
            this.findTarget(entities)
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

        const bullet = new UnitBullet(
            this.loc, 
            this.gunAngle, 
            this.bulletSpeed, 
            this.pierce
        );
        
        this.projectileSet.push(bullet);
        this.fireCooldownTimer = 1 / this.fireRate;
        this.target = null;
    }

    getRenderSnapshot() {
        return {
            position: this.loc,
            angle: this.gunAngle,
            type: this.type
        }
    }
}