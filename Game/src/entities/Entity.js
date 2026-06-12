
export default class Entity {

    constructor({rank, size, pathPoints, entityConfig, uniqueID}) {

        this.rank = rank;
        this.size = size;
        this.entityConfig = entityConfig;
        this.speed = entityConfig[rank].speed;
        this.health = entityConfig[rank].health;
        this.isHit = false;
        this.dead = false;
        this.targetIdx = 1;
        this.uniqueID = uniqueID;

        this.pathPoints = pathPoints;
        
        if (!this.pathPoints || this.pathPoints.length < 2) {
            throw new Error("Insufficient path length");
        }

        this.prev = this.pathPoints[0];
        this.loc = this.pathPoints[0];
        this.targetPoint = this.pathPoints[1];
        this.segmentVec = this.getSegmentVec();
        this.segmentDist = this.getSegmentDist();
        this.pathCompleted = false;
        this.t = 0;

    } 

    getUniqueID() {
        return this.uniqueID;
    }

    kill() {
        this.dead = true;
    }

    hit(damage) {
        
        this.isHit = true;
        const initialDamage = damage;

        while (damage >= this.health && this.rank > 1) {
            damage -= this.health;
            this.rankDecrease();
        }

        if (damage >= this.health) {
            damage -= this.health;
            this.rankDecrease();
        }
        else {
            this.health -= damage;
            damage = 0;
        }
        
        return initialDamage - damage;

    }

    rankDecrease() {
        if (this.rank > 1) {
            this.rank--;
            this.updateSpeed();
            this.updateHealth();
        }
        else {
            this.dead = true;    
        }
    }

    updateSpeed() {
        this.speed = this.entityConfig[this.rank].speed;
    }

    updateHealth() {
        this.health = this.entityConfig[this.rank].health;
    }

    isDead() {
        return this.dead;
    }

    pathLength() {
        return this.pathPoints.length;
    }

    getSpeed() {
        return this.speed
    }

    getVelocity() {
        return this.getSegmentVec().normalized().mult(this.speed);
    }

    getHealth() {
        return this.health;
    }

    getSegmentDist() {
        return this.targetPoint.sub(this.prev).mag();
    }

    getSegmentVec() {
        return this.targetPoint.sub(this.prev);
    }

    toTargetVec() {
        return this.targetPoint.sub(this.loc);
    }

    achieved_target() {
        return this.t >= 1 || (this.segmentVec).dot(this.toTargetVec()) < 0;
    }

    advanceTarget() {

        if (this.targetIdx >= this.pathLength() - 1) {
            this.pathCompleted = true;
            return;
        }

        this.prev = this.targetPoint;
        this.targetPoint = this.pathPoints[++this.targetIdx];
        this.segmentVec = this.getSegmentVec();
        this.segmentDist = this.getSegmentDist();
        this.t = 0;
    }

    update(dt) {

        if (this.pathCompleted == true) return;

        let remaining = this.speed * dt;

        while (remaining > 0 && !this.pathCompleted) {
            
            const dist = this.segmentDist;

            if (dist === 0) {
                this.advanceTarget();
                continue;
            }

            const distLeft = (1 - this.t) * dist;

            if (remaining < distLeft) {
                this.t += remaining / dist;
                remaining = 0;
            }
            else {
                remaining -= distLeft;
                this.advanceTarget();
            }

        }

        if (!this.pathCompleted) {
            const progress = this.segmentVec.mult(this.t);
            this.loc = this.prev.add(progress);
        }
        
    }

    getRenderSnapshot() {
        return {
            position: this.loc,
            rank: this.rank
        }
    }
  
}