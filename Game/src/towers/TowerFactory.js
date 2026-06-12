import UnitTower from "../towers/UnitTower.js";
import Vector2 from "../math/Vector2.js";

export default class TowerFactory {
    constructor({config}) {
        this.config = config;
        this.IDCount = 0;
    }

    createUnitTower({loc, projectileSet, projectileFactory, upgradeLevel}) {
        const unitConfig = this.config["unit"][upgradeLevel];
        this.IDCount++;
        return new UnitTower(
            loc,
            upgradeLevel,
            unitConfig.fireRate, 
            unitConfig.bulletSpeed, 
            unitConfig.pierce, 
            unitConfig.damage, 
            unitConfig.range,
            projectileSet, 
            projectileFactory,
            this.IDCount)
    }
}