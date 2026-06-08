
import RoundBuilder from "../entities/RoundBuilder.js";

export default class RoundSystem {

    constructor(roundConfig, entityConfig) {

        this.entityConfig = entityConfig;
        this.roundConfig = roundConfig;
        this.roundBuilder = new RoundBuilder(roundConfig);
        this.rounds = this.roundBuilder.buildRounds();

        this.currentRoundIdx = 0;
        this.currentRound = this.rounds[0];
        this.timeToNextSpawn = 0;
        this.clock = 0;

    }

    nextRound() {
        if (++this.currentRoundIdx >= this.rounds.length) return
        this.currentRound = this.rounds[this.currentRoundIdx];
    }

    spawn(dt) {
        
        this.clock += dt;
        
        if (this.clock > this.timeToNextSpawn) return this.consumeSpawn();
        
        return -1;
    }


    consumeSpawn() {

        const spawn = this.currentRound.pop();

        if (!spawn) {
            this.nextRound();
            return;
        } 

        const rank = spawn.rank;
        const spacing = spawn.spacing;
        const speed = this.entityConfig[rank].speed;

        this.clock = 0;
        this.timeToNextSpawn = spacing / speed;

        return rank;
    }
}