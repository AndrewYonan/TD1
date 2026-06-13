

export default class UIManager {
    constructor({root, UIGraphicsConfig}) {

        this.root = root;
        this.UIGraphicsConfig = UIGraphicsConfig;

        this.fpsElement = root.querySelector("#fps");
        this.livesElement = root.querySelector("#lives");
        this.moneyElement = root.querySelector("#money");
        this.roundElement = root.querySelector("#round");
        this.gameOverScreen = root.querySelector("#game-over-screen");
        this.roundButton = root.querySelector("#run-game");
        this.autoStartButton = root.querySelector("#auto-start");
        this.towerUpgradeMenu = root.querySelector("#tower-upgrade-menu");

    }

    render({lives, money, round, isGameOver, isFastPlay, isAutoStart, roundRunning}) {
    
        this.livesElement.textContent = `Lives | ${lives}`;
        this.moneyElement.textContent = `$${money}`;
        this.roundElement.textContent = `Round | ${round}`;
        this.gameOverScreen.style.display = isGameOver ? "flex" : "none";
        this.autoStartButton.textContent = isAutoStart ? "<< Auto Start >>" : "Auto Start";
        this.renderSpeedButton(isFastPlay, roundRunning);
    }       


    renderSpeedButton(isFastPlay, roundRunning) {
        if (roundRunning) {
            if (isFastPlay) {
                this.roundButton.textContent = "<< Slow";
            } 
            else {
                this.roundButton.textContent = "Fast >>";
            } 
        }
        else {
            this.roundButton.textContent = "Start";
        }
    }

    renderTowerUpgradeMenu({selectedTowerID, type, hitCount, targetPolicy, upgradeLevel}) {

        this.towerUpgradeMenu.style.display = selectedTowerID ? "block" : "none";

        if (!selectedTowerID) return;

        this.towerUpgradeMenu.querySelector("#tower-title").textContent = this.capitalize(type);

        const stats = this.towerUpgradeMenu.querySelector("#tower-stats");

        stats.querySelector("#hit-count").textContent = `Hits: ${hitCount.toString()}`;
        stats.querySelector("#upgrade-level").textContent = `Level: ${(upgradeLevel + 1).toString()}`;

        this.deactivateUpgrade(2);
        this.deactivateUpgrade(3);
        this.deactivateUpgrade(4);

    }

    deactivateUpgrade(upgradeLevel) {
        const upgradeBttn = this.towerUpgradeMenu.querySelector(`#upgrade-${upgradeLevel}`);
        this.deactivateButton(upgradeBttn);
    }

    deactivateButton(button) {
        button.disabled = true;
        button.style.backgroundColor = this.UIGraphicsConfig.DEACTIVATED_COLOR;
    }

    activateButton(button) {
        button.disabled = true;
        button.style.backgroundColor = this.UIGraphicsConfig.ACTIVATED_COLOR;
    }

    capitalize(s) {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }

    setFPS(fps) {
        this.fpsElement.textContent = `FPS : ${Math.round(fps)}`;
    }


}