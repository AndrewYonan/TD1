
export default class Round {

    constructor(waves) {
        this.waves = waves;
        this.waveIdx = 0;
        this.entityIdx = 0;
        this.currWave = null;
    }
    
    pop() {

        if (this.waves.length == 0) return;
        if (this.waveIdx >= this.waves.length) return;
        if (this.currWave == null) this.currWave = this.waves[0];
         
        
        if (this.entityIdx >= this.currWave.count) {
            this.waveIdx++
            this.entityIdx = 0;
        }

        return this.waves[this.waveIdx++];
    }
}