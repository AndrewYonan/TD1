export default class Game {

    constructor({worldFactory, renderer, ui, input, clock, config = {}}) {

        this.worldFactory = worldFactory;
        this.renderer = renderer;
        this.ui = ui;
        this.input = input;
        this.clock = clock;
        
        this.config = {
            initialSpeedMultiplier: 1,
            fastSpeedMultiplier: 2,
            fpsUpdateIntervalFrames: 20,
            ...config
        };

        this.world = null;
        this.isRunning = false;
        this.animationFrameId = null;
        this.speedMultiplier =  this.config.initialSpeedMultiplier;
        this.frameCount = 0;
        this.loop = this.loop.bind(this);
    }

    initialize() {
        console.log("initializing game...");
    }

    start() {

        if (this.isRunning) return;

        this.isRunning = true;
        this.clock.reset();
        this.animationFrameId = requestAnimationFrame(this.loop);
        this.syncUI();
    }

    loop() {

        if (!this.isRunning) return;
        
        const rawDt = this.clock.getDeltaSeconds();
        const scaledDt = rawDt * this.speedMultiplier;

        this.update(scaledDt, rawDt);
        this.render();
        this.animationFrameId = requestAnimationFrame(this.loop);
        this.frameCount++;
    }


    update(dt, rawDt) {

        if (!this.world) return;

        this.world.update(dt);
        this.updateFPS(rawDt);
        this.syncUI();

        if (this.world.isGameOver()) {
            this.handleGameOver();  
        }
    }

    render() {

        if (!this.world) return;
        
        this.renderer.render(this.world);
    }

    updateFPS(rawDt) {
        console.log(rawDt);
    }

    syncUI() {
        console.log("Syncing UI...");
    }

    handleGameOver() {
        console.log("Game Over...");
    }
}