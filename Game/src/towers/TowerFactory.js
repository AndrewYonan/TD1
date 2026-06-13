import UnitTower from "../towers/UnitTower.js";

export default class TowerFactory {
    constructor({towerUpgradeConfig, towerGraphicsConfig}) {
        this.towerUpgradeConfig = towerUpgradeConfig;
        this.towerGraphicsConfig = towerGraphicsConfig
        this.IDCount = 0;
    }

    createUnitTower({loc, projectileSet, projectileFactory, upgradeLevel}) {

        const baseUnitConfig = this.towerUpgradeConfig["unit"]["tier-0"].stats;
        const size = this.towerGraphicsConfig["unit"].size;

        this.IDCount++;

        return new UnitTower(
            loc,
            size,
            upgradeLevel,
            baseUnitConfig.fireRate, 
            baseUnitConfig.bulletSpeed, 
            baseUnitConfig.pierce, 
            baseUnitConfig.damage, 
            baseUnitConfig.range,
            baseUnitConfig.smartAim,
            projectileSet, 
            projectileFactory,
            this.IDCount)
    }
}



// export const TOWER_UPGRADE_CONFIG = {
//     "unit" : {
//         "base": {
//             cost: 600,
//             stats: {
//                 range: 200,
//                 fireRate: 0.75,
//                 bulletSpeed: 500,
//                 pierce: 1,
//                 damage: 1,
//                 smartAim: false
//             }
//         },