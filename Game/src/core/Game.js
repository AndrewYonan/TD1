import UnitTower from "../towers/UnitTower.js";

export default class Game {

    constructor({worldFactory, renderer, ui, input, clock, gameConfig}) {

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

        this.frame = 0;
        this.isRunning = false;
        this.animationFrameId = null;
        this.speedMultiplier =  this.config.initialSpeedMultiplier;
        this.loop = this.loop.bind(this);
        this.bindInput();
    }

    bindInput() {
        this.input.bindActions({
            onToggleRoundPlay: () => this.toggleRoundPlay(),
            onRestart: () => this.restart(),
            onTowerSelect: () => this.selectTower()
        });
    }

    selectTower() {
        console.log("Tower selected");
    }

    initialize() {

        this.world = this.worldFactory.makeDefaultWorld({
            round: this.config.STARTING_ROUND,
            pathPreset: this.config.PATH_PRESET});
        
        const testTower = new UnitTower(300, 260);
        this.world.addTower(testTower);

        this.render();
        this.syncUI();
    }

    start() {

        if (this.isRunning) return;

        this.isRunning = true;
        this.clock.reset();
        this.syncUI();

        if (!this.world.isRoundActive()) this.world.startNextRound();
        
        this.animationFrameId = requestAnimationFrame(this.loop);

    }

    stop() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
        this.isRunning = false;
        this.syncUI();
    }

    toggleRoundPlay() {
        if (this.isRunning) this.toggleSpeed();
        else this.togglePause();
    }

    togglePause() {
        if (this.isRunning) this.stop();
        else this.start();
    }

    toggleSpeed() {

        const normal = this.config.initialSpeedMultiplier;
        const fast = this.config.fastSpeedMultiplier;

        this.speedMultiplier = (this.speedMultiplier == normal) ? fast : normal;
        this.syncUI();
    }

    restart() {
        this.stop();
        this.initialize();
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

        if (this.world.isGameOver()) this.handleGameOver();
        if (!this.world.isRoundActive()) this.stop(); 
        
        this.frame++;
    }

    render() {
        if (!this.world) return;
        this.renderer.render(this.world);
    }

    updateFPS(rawDt) {

        const fps = (rawDt < 0.01) ? 0 : 1 / rawDt;

        if (this.frame % this.config.fpsUpdateIntervalFrames == 0) {
            this.ui.setFPS(fps);
        }
    }

    syncUI() {

        if (!this.world) return;

        this.ui.render({
            ...this.world.getUIState(),
            isFastPlay: this.speedMultiplier > 1,
            isRunning: this.isRunning
        })
    }

    handleGameOver() {
        console.log("Game Over...");
    }
}