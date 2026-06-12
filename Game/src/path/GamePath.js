

export default class GamePath {

    constructor({movementPoints, renderPoints, collisionPoints, pathWidth}) {
        this.movementPoints = movementPoints;
        this.renderPoints = renderPoints;
        this.collisionPoints = collisionPoints;
        this.pathWidth = pathWidth;
    }

    getMovementPoints() {
        return this.movementPoints;
    }

    getRenderPoints() {
        return this.renderPoints;
    }

    getCollisionPoints() {
        return this.collisionPoints
    }

    getWidth() {
        return this.pathWidth
    }

}