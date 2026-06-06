

export default class GamePath {

    constructor(controlPoints) {
        
        this.controlPoints = controlPoints;
        this.controlPathRes = 100;
        this.renderPathRes = 50;
    }

    getMovementPoints() {
        return this.bezierBuilder.bake(this.controlPathRes);
    }

    getRenderPoints() {
        
    }
}