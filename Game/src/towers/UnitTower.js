import Vector2 from "../math/Vector2.js";
import { dist } from "../math/Utils.js";

export default class UnitTower {

    constructor(x, y) {
        this.loc = new Vector2(x, y);
        this.type = "unit";
        this.fireRate = 1;
        this.range = 100;

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
        let min = 10000;
        let entity = null;
        for (let i = 0; i < entities.length; ++i) {
            const d = dist(entities[i].loc, this.loc);
            if (d < min) {
                min = d;
                entity = entities[i];
            }
        }
        return entity;
    }

    update(dt, entities) {
        if (this.targetOutOfRange()) this.target == null;
        if (!this.findTarget(entities)) return;
        this.watchTarget();
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
        console.log("Fire");
        this.fireCooldownTimer = 1 / this.fireRate;
    }

    getRenderSnapshot() {
        return {
            position: this.loc,
            angle: this.gunAngle,
            type: this.type
        }
    }
}