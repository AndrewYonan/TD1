
export default class InputController {
    constructor({root}) {
        this.root = root;
    }

    bindActions({onTogglePause, onToggleSpeed, onRestart}) {
        this.root.querySelector("#pause-game").addEventListener("click", onTogglePause);
        this.root.querySelector("#game-speed").addEventListener("click", onToggleSpeed);
        this.root.querySelector("#restart-game").addEventListener("click", onRestart);
    }
}