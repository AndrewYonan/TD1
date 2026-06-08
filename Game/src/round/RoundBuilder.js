
import Round from "../round/Round.js";
import Wave from "../round/Wave.js";

export default class RoundBuilder {

    constructor(roundConfig) {
        this.roundConfig = roundConfig;
    }

    buildRounds() {

        let rounds = [];

        for (const round in this.roundConfig) {

            let waves = [];

            for (const wave of this.roundConfig[round].waves) {
                waves.push(new Wave(wave.rank, wave.count, wave.spacing));
            }

            rounds.push(new Round(waves));
        }

        return rounds;
    }
}