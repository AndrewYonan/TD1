

export default class UIManager {
    constructor({root}) {

        this.root = root;

        this.fpsElement = root.querySelector("#fps");
        this.livesElement = root.querySelector("#lives");
        this.moneyElement = root.querySelector("#money");
        this.roundElement = root.querySelector("#round");
        this.gameOverScreen = root.querySelector("#game-over-screen");
        this.roundButton = root.querySelector("#run-game");

    }

    render({lives, money, round, isGameOver, isFastPlay, roundRunning}) {
    
        this.livesElement.textContent = `Lives | ${lives}`;
        this.moneyElement.textContent = `$${money}`;
        this.roundElement.textContent = `Round | ${round}`
        this.gameOverScreen.style.display = isGameOver ? "flex" : "none";
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

    setFPS(fps) {
        this.fpsElement.textContent = `FPS : ${Math.round(fps)}`;
    }


}