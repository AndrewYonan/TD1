import { dist } from "../math/Utils.js";

export default class EntityViewer {

    constructor(entities) {
        this.entities = entities;
    }

    chooseEntity(firingLocation, firingRange, targetingPolicy) {

        if (this.entities.length === 0) return null;

        if (targetingPolicy === "close") {
            return this.chooseClosest(firingLocation, firingRange);
        }
        else if (targetingPolicy === "far") {
            return this.chooseFarthest(firingLocation, firingRange);
        }
        else if (targetingPolicy === "weak") {
            return this.chooseWeakest(firingLocation, firingRange);
        }
        else if (targetingPolicy === "strong") {
            return this.chooseStrongest(firingLocation, firingRange);
        }

        return this.chooseAny(firingLocation, firingRange);
    }

    chooseClosest(firingLocation, firingRange) {

        let entity = null;
        let min = 100000;

        for (let i = 0; i < this.entities.length; ++i) {

            const d = dist(this.entities[i].loc, firingLocation);

            if (d > firingRange) continue;
            if (d < min) {
                min = d;
                entity = this.entities[i];
            }
        }
        return entity;
        
    }

    chooseFarthest(firingLocation, firingRange) {

        let entity = null;
        let max = 0;

        for (let i = 0; i < this.entities.length; ++i) {

            const d = dist(this.entities[i].loc, firingLocation);

            if (d > firingRange) continue;
            if (d > max) {
                max = d;
                entity = this.entities[i];
            }
        }
        return entity;
    }

    chooseWeakest(firingLocation, firingRange) {

        let entity = null;
        let min = 100000;

        for (let i = 0; i < this.entities.length; ++i) {

            const d = dist(this.entities[i].loc, firingLocation);
            const rank = this.entities[i].rank;

            if (d > firingRange) continue;
            if (rank < min) {
                min = rank;
                entity = this.entities[i];
            }
        }
        return entity;
        
    }


    chooseStrongest(firingLocation, firingRange) {

        let entity = null;
        let max = 0;

        for (let i = 0; i < this.entities.length; ++i) {

            const d = dist(this.entities[i].loc, firingLocation);
            const rank = this.entities[i].rank;

            if (d > firingRange) continue;
            if (rank > max) {
                max = rank;
                entity = this.entities[i];
            }
        }
        return entity;
        
    }

    

    chooseAny(firingLocation, firingRange) {
        for (const entity of this.entities) {
            if (dist(entity.loc, firingLocation) <= firingRange) {
                return entity;
            }
        }
        return null;
    }
}