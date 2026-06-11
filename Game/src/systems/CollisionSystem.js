import { dist } from "../math/Utils.js";

export default class CollisionSystem {

    constructor(width, height) {
        this.buffer = [];
        this.width = width;
        this.height = height;
        this.collisionThreshold = 20;
        this.offScreenMargin = 10;
    }

    add(obj) {
        this.buffer.push(obj)
    }

    offScreen(obj) {
        return (obj.loc.x < -this.offScreenMargin || obj.loc.x > this.width + this.offScreenMargin)
            || (obj.loc.y < -this.offScreenMargin || obj.loc.y > this.height + this.offScreenMargin);
    }

    getSingleCollision(obj1, objs) {
        for (let i = 0; i < objs.length; ++i) {
            if ((dist(obj1.loc, objs[i].loc)) <= this.collisionThreshold) {
                return i;
            }
        }
        return -1;
    }
}