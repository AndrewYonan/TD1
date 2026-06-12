
import Vector2 from "../math/Vector2.js";
import BezierCurve from "./BezierCurve.js";
import GamePath from "./GamePath.js";
import { dist } from "../math/Utils.js";


export default class BezierPathBuilder {
    
    constructor({pathConfig, gameConfig, pathGraphicsConfig}) {

        this.pathConfig = pathConfig;
        this.gameConfig = gameConfig;
        this.pathGraphicsConfig = pathGraphicsConfig;
        this.removeDuplicateCPThreshold = 5; //px

    }

    buildFromPreset(preset) {

        const controlPoints = this.pathConfig[preset];

        const movementPoints = this.buildPoints({
            controlPoints,
            resolution: this.gameConfig.PATH_MOVEMENT_RES,
            skipLinearSegments: true,
            removeDuplicates: true
        });

        const renderPoints = this.buildPoints({
            controlPoints,
            resolution: this.pathGraphicsConfig.PATH_RENDER_RES,
            skipLinearSegments: true,
            removeDuplicates: false
        });

        const collisionPoints = this.buildPoints({
            controlPoints,
            resolution: this.gameConfig.PATH_COLLISION_RES,
            skipLinearSegments: false,
            removeDuplicates: false
        })

        return new GamePath({
            movementPoints,
            renderPoints,
            collisionPoints,
            pathWidth: this.pathGraphicsConfig.PATH_WIDTH
        })

    }

    buildPoints({controlPoints, resolution, skipLinearSegments, removeDuplicates}) {

        const width = this.gameConfig.WIDTH;
        const height = this.gameConfig.HEIGHT;
        const bezierPath = this.buildBezierCurves(controlPoints, width, height);
        const bakedPoints = this.bakeBezierCurves(bezierPath, resolution, skipLinearSegments);

        if (removeDuplicates) return this.removeDuplicates(bakedPoints);
        else return bakedPoints;

    }

    buildBezierCurves(piecewiseControlPointList, worldWidth, worldHeight) {

        let bezierPath = [];

        for (const curve of piecewiseControlPointList) {    
            const cps = curve.map(cp => (new Vector2(cp[0] * worldWidth, cp[1] * worldHeight)))
            let bz = new BezierCurve(cps);
            bezierPath.push(bz);
        }

        return bezierPath;
    }

    bakeBezierCurves(bezierCurves, pointSpacing, skipLinearSegments) {

        let pts = [];

        for (const curve of bezierCurves) {
            
            const controlPoints = curve.getControlPoints();

            if (skipLinearSegments && controlPoints.length <= 2) {
                for (const cp of controlPoints) {pts.push(cp);}
            }
            else {
                for (const pt of curve.bake(pointSpacing)) {pts.push(pt);}
            }
        }
        return pts;
    }

    removeDuplicates(points) {

        if (points.length == 0) {return [];}
        let newLocs = [points[0]];
    
        let i = 1;
        while (i < points.length) {
    
            const lastKept = newLocs[newLocs.length - 1];
    
            if (dist(points[i], lastKept) > this.removeDuplicateCPThreshold) {
                newLocs.push(points[i]);
            }
    
            i++;
        }
        return newLocs;
    }
}




