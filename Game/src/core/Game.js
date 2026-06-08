export default class Game {

    constructor({worldFactory, renderer, ui, input, clock, gameConfig = {}}) {

        this.worldFactory = worldFactory;
        this.renderer = renderer;
        this.ui = ui;
        this.input = input;
        this.clock = clock;
        
        this.config = {
            initialSpeedMultiplier: 1,
            fastSpeedMultiplier: 2,
            fpsUpdateIntervalFrames: 20,
            ...gameConfig
        };

        this.isRunning = false;
        this.animationFrameId = null;
        this.speedMultiplier =  this.config.initialSpeedMultiplier;
        this.loop = this.loop.bind(this);
    }

    initialize() {
        this.world = this.worldFactory.makeDefaultWorld(this.config.PATH_PRESET);
    }

    start() {

        if (this.isRunning) return;

        this.isRunning = true;
        this.clock.reset();
        this.syncUI();

        this.world.startRound();
        this.animationFrameId = requestAnimationFrame(this.loop);

    }

    loop() {

        if (!this.isRunning) return;
        
        const rawDt = this.clock.getDeltaSeconds();
        const scaledDt = rawDt * this.speedMultiplier;

        this.update(scaledDt, rawDt);
        this.render();
        
        this.animationFrameId = requestAnimationFrame(this.loop);

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
        // console.log(rawDt);
    }

    syncUI() {
        // console.log("Syncing UI...");
    }

    handleGameOver() {
        // console.log("Game Over...");
    }
}