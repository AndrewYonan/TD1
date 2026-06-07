
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
            gamePath: this.gamePath,
            entities: this.entities.map(entity => ({
                position: entity.getPosition(),
                radius: entity.getRadius(),
                color: entity.getColor(),
                rank: entity.getRank()
            }))
        };
    }

    update(dt) {
        // console.log("updating world...");
    }

    isGameOver() {
        return this.lives <= 0;
    }
}