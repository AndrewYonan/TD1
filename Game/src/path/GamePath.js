

export default class GamePath {

    constructor({movementPoints, renderPoints}) {
        this.movementPoints = movementPoints;
        this.renderPoints = renderPoints;
    }

    getMovementPoints() {
        return this.movementPoints;
    }

    getRenderPoints() {
        return this.renderPoints;
    }

}