
import RoundBuilder from "../round/RoundBuilder.js";

export default class RoundSystem {

    constructor(roundConfig, entityConfig) {

        this.entityConfig = entityConfig;
        this.roundBuilder = new RoundBuilder(roundConfig);
        this.rounds = this.roundBuilder.buildRounds();

        this.currentRoundIdx = -1;
        this.timeToNextSpawn = 0;
        this.clock = 0; 

    }

    setRound(round) {
        this.currentRoundIdx = Math.max(round - 2, -1);
    }

    getCurrentRound() {
        return this.currentRoundIdx + 1
    }

    nextRound() {
        if (++this.currentRoundIdx >= this.rounds.length) return
        this.currentRound = this.rounds[this.currentRoundIdx];
    }

    hasNextRound() {
        return this.currentRoundIdx + 1 < this.rounds.length;
    }

    update(dt) {

        this.clock += dt;

        if (this.clock > this.timeToNextSpawn) {
            return this.consumeSpawn();
        }

        return {type : "none"};

    }

    consumeSpawn() {

        const spawn = this.currentRound.pop();

        if (!spawn) return {type: "spawning-done"};
        
        let defaultSpeed = this.entityConfig[1].speed;
        let speed = (spawn.rank == 0) ?  defaultSpeed : this.entityConfig[spawn.rank].speed
        
        this.timeToNextSpawn = spawn.spacing / speed;
        this.clock = 0;

        return {
            type: "spawn",
            rank: spawn.rank
        };
    }
}