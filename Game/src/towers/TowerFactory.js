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


    upgrade(tower, level) {

        const maxLevel = Object.keys(this.towerUpgradeConfig[tower.type]).length;
        if (level < 1 || level > maxLevel) return;

        const upgradedStats = this.accumulateStatsUpTo(level, tower.type);
        this.updateTowerWithStats(tower, upgradedStats);
        tower.upgradeLevel = level;

    }

    updateTowerWithStats(tower, stats) {
        for (const key of Object.keys(stats)) {
            tower[key] = stats[key];
        }
    }

    copy(configMap) {
        const newConfigMap = {};
        for (const key of Object.keys(configMap)) {
            newConfigMap[key] = configMap[key];
        }
        return newConfigMap;
    }


    accumulateStatsUpTo(level, type) {

        let baseStats = this.copy(this.towerUpgradeConfig[type]["tier-0"].stats);

        for (let i = 1; i <= level; ++i) {
            const newStats = this.towerUpgradeConfig[type][`tier-${i}`].newStats;
            baseStats = this.accumulateStats(baseStats, newStats)
        }

        return baseStats;
    }

    accumulateStats(baseStats, newStats) {
        for (const key of Object.keys(newStats)) {
            baseStats[key] = newStats[key];
        }
        return baseStats
    }


}



// export const TOWER_UPGRADE_CONFIG = {
//     "unit" : {
//         "tier-0": {
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