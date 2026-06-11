import Vector2 from "../math/Vector2.js";

export default class UnitBullet {
    constructor(loc, angle, speed, pierce, damage, uniqueID) {
        this.loc = loc;
        this.angle = angle;
        this.speed = speed;
        this.pierce = pierce;
        this.damage = damage;
        this.uniqueID = uniqueID;
        this.dead = false;
        this.mostRecentlyHitID = -1;
        this.velocity = new Vector2(speed * Math.cos(angle), speed * Math.sin(angle));

    }

    getDamage() {
        return this.damage;
    }

    getMostRecentlyHitID() {
        return this.mostRecentlyHitID;
    }

    getUniqueID() {
        return this.uniqueID;
    }

    hit(entityId) {
        this.pierce--;
        this.mostRecentlyHitID = entityId;
        if (this.pierce == 0) this.dead = true;
    }

    isDead() {
        return this.dead;
    }

    kill() {
        this.dead == true;
    }

    update(dt) {
        this.loc = this.loc.add(this.velocity.mult(dt));
    }

    getRenderSnapshot() {
        return {
            position: this.loc,
            angle: this.angle,
            type: "unit"
        }
    }
}