
import Vector2 from "../math/Vector2.js";
import BezierCurve from "./BezierCurve.js";
import GamePath from "./GamePath.js";
import { dist } from "../math/Utils.js";


export default class BezierPathBuilder {
    
    constructor({pathConfigs, gameConfig, graphicsConfig}) {

        this.pathConfigs = pathConfigs;
        this.gameConfig = gameConfig;
        this.graphicsConfig = graphicsConfig;
        this.removeDuplicateCPThreshold = 5; //px

    }

    buildFromPreset(preset) {

        const controlPoints = this.pathConfigs[preset];

        const movementPoints = this.buildPoints({
            controlPoints,
            resolution: this.gameConfig.PATH_MOVEMENT_RES,
            removeDuplicates: true
        });

        const renderPoints = this.buildPoints({
            controlPoints,
            resolution: this.graphicsConfig.PATH_RENDER_RES,
            removeDuplicates: true
        });

        return new GamePath({
            movementPoints,
            renderPoints
        })

    }

    buildPoints({controlPoints, resolution, removeDuplicates}) {

        const width = this.gameConfig.WIDTH;
        const height = this.gameConfig.HEIGHT;
        const bzPath = this.packBezierPathControlPoints(controlPoints, width, height);
        const bakedPoints = this.bakeBezierCurves(bzPath, resolution);

        if (removeDuplicates) return this.removeDuplicates(bakedPoints);
        else return bakedPoints;

    }

    packBezierPathControlPoints(piecewiseControlPointList, worldWidth, worldHeight) {

        let bzPath = [];

        for (const curve of piecewiseControlPointList) {    
            const cps = curve.map(cp => (new Vector2(cp[0] * worldWidth, cp[1] * worldHeight)))
            let bz = new BezierCurve(cps);
            bzPath.push(bz);
        }

        return bzPath;
    }

    bakeBezierCurves(curves, res) {

        let pts = [];

        for (const curve of curves) {
            
            const cps = curve.getControlPoints();
            
            if (cps.length <= 2) {
                for (const cp of curve.cps) {pts.push(cp);}
            }
            else {
                for (const pt of curve.bake(res)) {pts.push(pt);}
            }
        }
        return pts;
    }

    removeDuplicates(locs) {

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
}




