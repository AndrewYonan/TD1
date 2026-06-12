

export default class Game {

    constructor({worldFactory, collisionSystemFactory, renderer, ui, input, clock, gameConfig}) {
        
        this.worldFactory = worldFactory;
        this.collisionSystem = collisionSystemFactory.create();
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
        this.animationFrameId = null;
        this.speedMultiplier =  this.config.initialSpeedMultiplier;
        this.loop = this.loop.bind(this);
        this.bindInput();
        
        this.currentSelectedTowerType = null;
    }

    bindInput() {
        this.input.bindMouse({
            onMouseClick: () => this.mouseClick(),
        });
        this.input.bindActions({
            onToggleRoundPlay: () => this.toggleRoundPlay(),
            onRestart: () => this.restart(),
            onUnitTowerSelect: () => this.selectUnitTower(),
        });
    }

    mouseClick() {

        const mouseLoc = this.input.getMouseLoc();

        if (this.currentSelectedTowerType)  {
            if (this.towerPlacementAllowed()) {
                this.world.addTower(this.currentSelectedTowerType, mouseLoc);
                this.currentSelectedTowerType = null;
            }
        }
        else {
            const selectedTowerID = this.collisionSystem.getSelectedTower(mouseLoc);
            if (selectedTowerID) {
                this.world.unhighlightAllTowers();
                this.world.setHighlight(selectedTowerID, true);
            } 
            else {
                this.world.unhighlightAllTowers();
            }
        }
    }

    selectUnitTower() {
        this.world.unhighlightAllTowers();
        this.currentSelectedTowerType = "unit";
    }

    towerPlacementAllowed() {
        if (!this.currentSelectedTowerType) return true;
        return this.collisionSystem.validTowerPlacement(
            this.input.mouseLoc, 
            this.currentSelectedTowerType
        );
    }

    initialize() {

        this.world = this.worldFactory.makeDefaultWorld({
            round: this.config.STARTING_ROUND,
            pathPreset: this.config.PATH_PRESET,
            collisionSystem: this.collisionSystem
        });

        this.resetUIParams();
        this.clock.reset();
        this.animationFrameId = requestAnimationFrame(this.loop);
    }

    resetUIParams() {
        this.currentSelectedTowerType = null;
    }

    startRound() {
        if (this.world.isRoundActive()) return;
        this.world.startNextRound();
    }

    stop() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
        this.syncUI();
    }

    toggleRoundPlay() {
        if (this.world.isRoundActive()) this.toggleSpeed();
        else this.startRound();
    }

    toggleSpeed() {

        const normal = this.config.initialSpeedMultiplier;
        const fast = this.config.fastSpeedMultiplier;

        this.speedMultiplier = (this.speedMultiplier == normal) ? fast : normal;
        this.syncUI();
    }

    restart() {
        this.stop();
        this.collisionSystem.clear();
        this.initialize();
    }

    loop() {
        
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
        this.frame++;
    }

    render() {
        if (!this.world) return;
        this.renderer.render(this.world, this.getGameUIState());
    }

    getGameUIState() {
        return {
            mouseLoc : this.input.getMouseLoc(),
            currentSelectedTowerType: this.currentSelectedTowerType,
            towerPlacementAllowed: this.towerPlacementAllowed()
        }
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
            roundRunning: this.world.isRoundActive()
        })
    }

    handleGameOver() {
        console.log("Game Over...");
    }
}