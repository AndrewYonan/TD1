import { dist } from "../math/Utils.js";

export default class CollisionSystem {

    constructor(width, height, towerGraphicsConfig) {
        this.buffer = []; 
        this.width = width;
        this.height = height;
        this.collisionThreshold = 20;
        this.offScreenMargin = 10;
        this.towerGraphicsConfig = towerGraphicsConfig;
    }

    addTowerToBuffer(towerLoc, towerType, towerID) { 
        this.buffer.push({
            loc: towerLoc,
            radius: this.towerGraphicsConfig[towerType].size,
            towerID: towerID,
            id: "tower"
        })
    }

    addPathToBuffer(pathPoints, pathWidth) {
        for (const point of pathPoints) {
            this.buffer.push({
                loc: point,
                radius: pathWidth/2,
                id: "path"
            })
        }
    }

    getSelectedTower(loc) {
        for (const obj of this.buffer) {
            if (obj.id === "tower" && (dist(loc, obj.loc) <= obj.radius)) {
                return obj.towerID;
            }
        }
        return null;
    }

    clear() {
        this.buffer = [];
    }

    getBuffer() {
        return this.buffer
    }

    circlesIntersect(center1, radius1, center2, radius2) {
        return dist(center1, center2) <= radius1 + radius2;
    }

    validTowerPlacement(loc, type) {
        const radius = this.towerGraphicsConfig[type].size;
        for (const obj of this.buffer) {
            if (this.circlesIntersect(loc, radius, obj.loc, obj.radius)) {
                return false;
            }
        }
        return true;
    }

    offScreen(obj) {
        return (obj.loc.x < -this.offScreenMargin || obj.loc.x > this.width + this.offScreenMargin)
            || (obj.loc.y < -this.offScreenMargin || obj.loc.y > this.height + this.offScreenMargin);
    }

    getProjEntityCollision(proj, entities) {
        for (let i = 0; i < entities.length; ++i) {
            if ((dist(proj.loc, entities[i].loc)) <= this.collisionThreshold) {
                return i;
            }
        }
        return -1;
    }


}