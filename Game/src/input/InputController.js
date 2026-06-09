
export default class InputController {
    constructor({root}) {
        this.root = root;
    }

    bindActions({onToggleRoundPlay, onRestart}) {
        this.root.querySelector("#run-game").addEventListener("click", onToggleRoundPlay);
        this.root.querySelector("#restart-game").addEventListener("click", onRestart);
    }
}