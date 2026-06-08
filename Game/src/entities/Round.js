
export default class Round {

    constructor(waves, parallelWaves) {
        this.waves = waves;
        this.waveIdx = 0;
        this.entityIdx = 0;
        this.currWave = null;
        this.parallelWaves = parallelWaves;
    }

    pop() {

        if (this.currWave == null) this.currWave = this.waves[0];
        
        if (this.entityIdx >= this.currWave.count) {

            if (++this.waveIdx >= this.waves.length) return null;

            this.currWave = this.waves[this.waveIdx];
            this.entityIdx = 0;
        }

        else {

            this.entityIdx++;
            
        }

        return {
            rank: this.currWave.rank,
            spacing: this.currWave.spacing
        };
    }
}