import Vector2 from "../math/Vector2.js";
import { dist } from "../math/Utils.js";

export default class UnitTower {

    constructor(x, y) {
        this.loc = new Vector2(x, y);
        this.type = "unit";
        this.fireRate = 1;
        this.range = 100;

        this.fireCooldownTimer = 0;
        this.gunArmAngle = 0;
    }

    inRangeOf(entity) {
        return dist(this.loc, entity.loc) < this.range;
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

    first() {
        //TODO
    }

    last() {
        //TODO
    }

    strong() {
        //TODO
    }

    update(dt, entities) {
        for (let i = 0; i < entities.length; ++i) {
            if (this.inRangeOf(entities[i])) {
                this.fire();
            }
        }  
    }

    fire() {
        console.log("Fire");
        this.fireCooldownTimer = 1 / this.fireRate
    }

    getRenderSnapshot() {
        return {
            position: this.loc,
            angle: this.gunArmAngle,
            type: this.type
        }
    }
}