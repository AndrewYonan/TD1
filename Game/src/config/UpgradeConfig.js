export const TOWER_UPGRADE_CONFIG = {
    "unit" : {
        "tier-0": {
            cost: 600,
            stats: {
                range: 200,
                fireRate: 0.75,
                bulletSpeed: 500,
                pierce: 1,
                damage: 1,
                smartAim: false
            }
        },
        "tier-1": {
            cost: 850,
            newStats: {
                fireRate: 2,
                smartAim: true
            }
        },
        "tier-2": {
            cost: 1500,
            newStats: {
                fireRate: 3,
            }
        },
        "tier-3": {
            cost: 3000,
            newStats: {
                fireRate: 4,
                pierce: 2
            }
        },
        "tier-4": {
            cost: 8750,
            newStats: {
                fireRate: 10,
                damage: 2
            }
        },
    }
}