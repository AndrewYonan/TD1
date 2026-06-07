
export default class Entity {

    constructor(rank, speed, health, pathPoints) {

        this.rank = rank;
        this.speed = speed;
        this.health = health;
        this.targetIdx = 1;


        this.pathPoints = pathPoints;
        this.prev = this.pathPoints[0];
        this.loc = this.pathPoints[0];
        this.targetPoint = this.pathPoints[1];
        this.segmentVec = this.getSegmentVec();
        this.segmentDist = this.getSegmentDist();
        this.pathCompleted = false;
        this.t = 0;

    } 

    pathLength() {
        return this.pathPoints.length;
    }

    getSpeed() {
        return this.speed
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