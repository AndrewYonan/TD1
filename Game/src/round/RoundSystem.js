
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

    getCurrentRound() {
        return this.currentRoundIdx + 1
    }

    nextRound() {
        if (++this.currentRoundIdx >= this.rounds.length) return
        this.currentRound = this.rounds[this.currentRoundIdx];
    }

    update(dt) {

        this.clock += dt;

        if (this.clock <= this.timeToNextSpawn) {
            return {type : "none"};
        } 

        const spawn = this.currentRound.pop();

        if (!spawn) return {type: "spawning-done"};
        
        const speed = this.entityConfig[spawn.rank].speed

        this.clock = 0;
        this.timeToNextSpawn = spawn.spacing / speed;

        return {
            type: "spawn",
            rank: spawn.rank
        };
    }
}