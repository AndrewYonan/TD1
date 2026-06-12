import UnitTower from "../towers/UnitTower.js";
import Vector2 from "../math/Vector2.js";

export default class TowerFactory {
    constructor({towerConfig, towerGraphicsConfig}) {
        this.towerConfig = towerConfig;
        this.towerGraphicsConfig = towerGraphicsConfig
        this.IDCount = 0;
    }

    createUnitTower({loc, projectileSet, projectileFactory, upgradeLevel}) {

        const unitConfig = this.towerConfig["unit"][upgradeLevel];
        const size = this.towerGraphicsConfig["unit"].size;

        this.IDCount++;

        return new UnitTower(
            loc,
            size,
            upgradeLevel,
            unitConfig.fireRate, 
            unitConfig.bulletSpeed, 
            unitConfig.pierce, 
            unitConfig.damage, 
            unitConfig.range,
            unitConfig.smartAim,
            projectileSet, 
            projectileFactory,
            this.IDCount)
    }
}