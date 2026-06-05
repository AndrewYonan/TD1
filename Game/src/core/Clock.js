export default class Clock {
    constructor() {
        this.seconds = 0;
        this.deltaSeconds = 1;
    }
    reset() {
        console.log("resetting clock...");
    }
    getDeltaSeconds() {
        return this.deltaSeconds;
    }
}