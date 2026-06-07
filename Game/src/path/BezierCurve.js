
export default class BezierCurve {

    constructor(controlPoints) {
        this.controlPoints = controlPoints;
        this.resolution = this.calculateCurveRes();
    }

    getControlPoints() {
        return this.controlPoints;
    }

    lerp(v1, v2, t) {
        return (v1.mult(1 - t)).add(v2.mult(t));
    }

    bezierInterp(t, points = this.controlPoints) {

        if (points.length === 1) {
            return cps[0];
        }
        else if (points.length === 2) {
            return this.lerp(points[0], points[1], t);
        }

        let intermediatePoints = [];

        for (let i = 0; i < points.length - 1; ++i) {
            intermediatePoints.push(this.lerp(points[i], points[i + 1], t));
        }

        return this.bezierInterp(t, intermediatePoints);
    }


    calculateCurveRes() {
        const len = this.approximateLength();
        return len > 0 ? 1 / (3 * Math.sqrt(len)) : 1
    }

    approximateLength() {
        let total = 0;
        for (let i = 0; i < this.controlPoints.length - 1; ++i) {
            total += (this.controlPoints[i + 1].sub(this.controlPoints[i])).mag();
        }
        return total;
    }

    bake(ds) {
        
        let points = [];
        
        if (this.controlPoints.length === 0) return [];
        if (ds <= 0) return [];
    
        const cpVecs = this.controlPoints;
        const dt = this.resolution;
        let prev = cpVecs[0];
        let distSinceLastDrawn = 0;
        let t = dt;

        points.push(prev);
    
        while (t <= 1) {

            const curr = this.bezierInterp(t, cpVecs);
    
            let segmentVec = curr.sub(prev);
            let segmentLen = segmentVec.mag();
    
            while (distSinceLastDrawn + segmentLen >= ds) {

                const remaining = ds - distSinceLastDrawn;
                const alpha = remaining / segmentLen;
    
                const bakePoint = prev.add(segmentVec.mult(alpha));
                points.push(bakePoint);
                
                prev = bakePoint;
                segmentVec = curr.sub(prev);
                segmentLen = segmentVec.mag();
    
                distSinceLastDrawn = 0;
            }
    
            distSinceLastDrawn += segmentLen;
            prev = curr;
            t += dt;
        }

        return points;

    }
}