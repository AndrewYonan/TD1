

export default class UIManager {
    constructor({root, towerUpgradeConfig, UIGraphicsConfig}) {

        this.root = root;
        this.towerUpgradeConfig = towerUpgradeConfig;
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

    renderTowerUpgradeMenu({currentMoney, selectedTowerID, type, hitCount, targetPolicy, upgradeLevel}) {
        this.towerUpgradeMenu.style.display = selectedTowerID ? "block" : "none";
        if (!selectedTowerID) return;
        this.renderTowerStats(hitCount, type, targetPolicy, upgradeLevel);
        this.renderUpgradeOptions(currentMoney, type, upgradeLevel);
        this.renderUpgradeCosts(type);

    }

    renderUpgradeCosts(type) {
        const maxUpgradeLevel = Object.keys(this.towerUpgradeConfig[type]).length;
        for (let i = 1; i < maxUpgradeLevel; ++i) {
            const cost = this.towerUpgradeConfig[type][`tier-${i}`].cost;
            this.towerUpgradeMenu.querySelector(`#upgrade-${i}`).textContent = `$${cost}`;
        }
    }

    renderTowerStats(hitCount, type, targetPolicy, upgradeLevel) {
        this.towerUpgradeMenu.querySelector("#tower-level").textContent = upgradeLevel.toString();
        this.towerUpgradeMenu.querySelector("#tower-type-text").textContent = this.capitalize(type);
        this.towerUpgradeMenu.querySelector("#targeting-picker-value").textContent = targetPolicy;
        this.towerUpgradeMenu.querySelector("#hit-count").textContent = `Hits: ${hitCount.toString()}`;
    }

    renderUpgradeOptions(currentMoney, type, upgradeLevel) {

        const maxUpgradeLevel = Object.keys(this.towerUpgradeConfig[type]).length;
        const nextUpgradeLevel = Math.min(upgradeLevel + 1, maxUpgradeLevel);

        if (nextUpgradeLevel < maxUpgradeLevel) {

            const nextPossibleUpgrade = this.towerUpgradeConfig[type][`tier-${nextUpgradeLevel}`];
            const nextUpgradeCost = nextPossibleUpgrade.cost;   

            if (currentMoney >= nextUpgradeCost) {
                this.renderUnlocked(nextUpgradeLevel);
                this.lockUpgradesAbove(nextUpgradeLevel, maxUpgradeLevel);
            } 
            else {
                this.lockUpgradesAbove(upgradeLevel, maxUpgradeLevel);
            }

        }

        this.renderBoughtUpgrades(upgradeLevel);
    }

    renderBoughtUpgrades(upgradeLevel) {
        for (let i = 1; i <= upgradeLevel; ++i) {
            const upgradeBttn = this.towerUpgradeMenu.querySelector(`#upgrade-${i}`);
            this.showBought(upgradeBttn);
        }
    }   

    lockUpgradesAbove(level, maxLevel) {
        let i = level + 1;
        while (i < maxLevel) {
            this.renderLocked(i);
            i++;
        }
    }

    renderLocked(upgradeLevel) {
        const upgradeBttn = this.towerUpgradeMenu.querySelector(`#upgrade-${upgradeLevel}`);
        this.deactivateButton(upgradeBttn);
    }

    renderUnlocked(upgradeLevel) {
        const upgradeBttn = this.towerUpgradeMenu.querySelector(`#upgrade-${upgradeLevel}`);
        this.activateButton(upgradeBttn);
    }

    showBought(button) {
        button.disabled = true; 
        button.style.setProperty('--btn-bg', this.UIGraphicsConfig.UPGRADE_BOUGHT_COLOR);
        button.style.setProperty('--btn-color', this.UIGraphicsConfig.UPGRADE_BOUGHT_TEXT_COLOR);
    }

    deactivateButton(button) {
        button.disabled = true;    
        button.style.setProperty('--btn-bg', this.UIGraphicsConfig.DEACTIVATED_COLOR);
        button.style.setProperty('--btn-color', this.UIGraphicsConfig.DEACTIVATED_TEXT_COLOR);
    }

    activateButton(button) {
        button.disabled = false;
        button.style.setProperty('--btn-bg', this.UIGraphicsConfig.ACTIVATED_COLOR);
        button.style.setProperty('--btn-color', this.UIGraphicsConfig.ACTIVATED_TEXT_COLOR);
    }

    capitalize(s) {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }

    setFPS(fps) {
        this.fpsElement.textContent = `FPS : ${Math.round(fps)}`;
    }


}