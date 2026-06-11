import UnitBullet from "./UnitBullet.js";

export default class ProjectileFactory {
    constructor() {
        this.IDCount = 0;
    }

    create(type, loc, angle, speed, pierce, damage) {
        this.IDCount++;
        if (type == "unit") {
            return this.createUnitBullet(loc, angle, speed, pierce, damage, this.IDCount);
        }
    }

    createUnitBullet(loc, angle, speed, pierce, damage, uniqueID) {
        return new UnitBullet(
            loc,
            angle,
            speed,
            pierce,
            damage,
            uniqueID
        )
    }
}