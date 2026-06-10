import Vector2 from "../math/Vector2.js";

export default class UnitBullet {
    constructor(loc, angle, speed, pierce) {
        this.loc = loc;
        this.angle = angle;
        this.speed = speed;
        this.pierce = pierce;
        this.velocity = new Vector2(speed * Math.cos(angle), speed * Math.sin(angle));

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