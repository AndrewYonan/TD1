
import Round from "../entities/Round.js";
import Wave from "../entities/Wave.js";

export default class RoundBuilder {

    constructor(roundConfig) {
        this.roundConfig = roundConfig;
    }

    buildRounds() {

        let rounds = [];

        for (const round in this.roundConfig) {

            let waves = [];
            const simultaneous = this.roundConfig[round].simultaneous;

            for (const wave of this.roundConfig[round].waves) {
                waves.push(new Wave(wave.rank, wave.count, wave.spacing));
            }

            rounds.push(new Round(waves, simultaneous));
        }
        
        return rounds;
    }
}