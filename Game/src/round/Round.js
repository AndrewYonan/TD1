
export default class Round {

    constructor(waves) {
        this.waves = waves;
        this.waveIdx = 0;
        this.entityIdx = 0;
        this.currWave = waves[0];
    }

    pop() {

        if (!this.currWave) return null;
        
        if (this.entityIdx >= this.currWave.count) {

            this.waveIdx++;

            if (this.waveIdx >= this.waves.length) return null;

            this.currWave = this.waves[this.waveIdx];
            this.entityIdx = 1;
        }

        else this.entityIdx++;
        

        return {
            rank: this.currWave.rank,
            spacing: this.currWave.spacing
        };
    }
}