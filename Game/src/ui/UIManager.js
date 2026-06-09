

export default class UIManager {
    constructor({root}) {
        this.root = root;

        this.fpsElement = root.querySelector("#fps");
        this.livesElement = root.querySelector("#lives");
        this.moneyElement = root.querySelector("#money");
        this.gameOverScreen = root.querySelector("#game-over-screen");
        this.speedButton = root.querySelector("#game-speed");
        this.pauseButton = root.querySelector("#pause-game");
    }

    render({lives, money, isGameOver, isFastPlay, isRunning}) {
        this.livesElement.textContent = `Lives : ${lives}`;
        this.moneyElement.textContent = `Money: ${money}`;
        this.gameOverScreen.style.display = isGameOver ? "flex" : "none";
        this.speedButton.textContent = isFastPlay ? "Normal" : "Fast >>";
        this.pauseButton.textContent = isRunning ? "Pause" : "Play";
    }

    setFPS(fps) {
        this.fpsElement.textContent = `FPS : ${Math.round(fps)}`;
    }


}