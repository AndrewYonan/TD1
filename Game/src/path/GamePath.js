import Vector2 from "../math/Vector2.js";
import BezierCurve from "./BezierCurve.js";
import { dist } from "../math/Utils.js";

export default class GamePath {

    constructor(piecwiseCurveCPList, worldWidth, worldHeight, gameConfig) {

        this.controlPathRes = gameConfig.pathMovementRes;
        this.piecewiseBZPath = this.piecewiseBezierPath(piecwiseCurveCPList, worldWidth, worldHeight);
        this.removeDuplicateCPThreshold = 5;
    }

    getMovementPoints() {
        const pts = this.bakeBezierCurves(this.controlPathRes);
        return this.remove_duplicates(pts);
    }

    getRenderPoints(res) {
        return this.bakeBezierCurves(res);
    }

    remove_duplicates(locs) {

        if (locs.length == 0) {return [];}
        let newLocs = [locs[0]];

        let i = 1;
        while (i < locs.length) {

            const lastKept = newLocs[newLocs.length - 1];

            if (dist(locs[i], lastKept) > this.removeDuplicateCPThreshold) {
                newLocs.push(locs[i]);
            }

            i++;
        }
        return newLocs;
    }


    bakeBezierCurves(res) {

        let pts = [];

        for (const curve of this.piecewiseBZPath) {

            if (curve.control_points.length <= 2) {
                for (const cp of curve.control_points) {pts.push(cp);}
            }
            else {
                for (const pt of curve.bake(res)) {pts.push(pt);}
            }
        }
        return pts;
    }

    piecewiseBezierPath(piecwiseCurveCPList, worldWidth, worldHeight) {

        let bz_path = [];

        for (const curve of piecwiseCurveCPList) {
            
            const cps = curve.map(cp => (new Vector2(cp[0] * worldWidth, cp[1] * worldHeight)))
            let bz = new BezierCurve(cps);

            bz_path.push(bz);
        }
        return bz_path;
    }

}