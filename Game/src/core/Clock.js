

export default class Clock {

    constructor() {
        this.lastTime = null;
    }

    reset() {
        this.lastTime = performance.now();
    }
    
    getDeltaSeconds() {

        const now = performance.now();

        if (this.lastTime == null) {
            this.lastTime = now;
            return 0;
        }

        const dt = (now - this.lastTime) / 1000;
        this.lastTime = now;

        return Math.min(dt, 0.05);
    }
}