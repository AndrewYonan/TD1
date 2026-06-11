import UnitTower from "../towers/UnitTower.js";
import Vector2 from "../math/Vector2.js";

export default class TowerFactory {
    constructor({config}) {
        this.config = config;
    }

    createUnitTower(x, y, projectileSet, projectileFactory, upgradeLevel) {

        const unitConfig = this.config["unit"][upgradeLevel];
        const loc = new Vector2(x, y);

        return new UnitTower(
            loc,
            upgradeLevel,
            unitConfig.fireRate, 
            unitConfig.bulletSpeed, 
            unitConfig.pierce, 
            unitConfig.damage, 
            unitConfig.range,
            projectileSet, 
            projectileFactory)
    }
}