
export default class World {

    constructor({gamePath, startingLives, startingMoney}) {

        this.entities = [];
        this.gamePath = gamePath;
        this.lives = startingLives;
        this.money = startingMoney;

    }

    getMovementPoints() {
        return this.gamePath.getMovementPoints();
    }

    getRenderSnapshot() {
        return {
            path: {
                renderPoints: this.gamePath.getRenderPoints(),
                movementPoints: this.gamePath.getMovementPoints()
            },
            entities: this.entities.map(entity => entity.getRenderSnapshot())
        };
    }

    update(dt) {
        // console.log("updating world...");
    }

    isGameOver() {
        return this.lives <= 0;
    }
}