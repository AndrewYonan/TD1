import Vector2 from "../math/Vector2.js";
import BezierCurve from "./BezierCurve.js";


export default class GamePath {

    constructor(piecwiseCurveCPList, worldWidth, worldHeight) {

        this.controlPathRes = 100;
        this.renderPathRes = 50;
        this.piecewiseBZPath = this.piecewiseBezierPath(piecwiseCurveCPList, worldWidth, worldHeight);
    }

    getMovementPoints() {
        return this.bakeBezierCurves(this.controlPathRes);
    }

    getRenderPoints() {
        return this.bakeBezierCurves(this.renderPathRes);
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

            let bz = new BezierCurve(curve.map(cp => 
                (new Vector2(cp[0] * worldWidth, cp[1] * worldHeight))));

            bz_path.push(bz);
        }
        return bz_path;
    }

}