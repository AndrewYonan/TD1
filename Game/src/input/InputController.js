
export default class InputController {
    constructor({root}) {
        this.root = root;
    }

    bindActions({onToggleRoundPlay, onRestart, onTowerSelect}) {

        this.root.querySelector("#run-game").addEventListener("click", onToggleRoundPlay);
        this.root.querySelector("#restart-game").addEventListener("click", onRestart);

        this.root.querySelector("#unit-tower").addEventListener("click", onTowerSelect);
        this.root.querySelector("#electric-tower").addEventListener("click", onTowerSelect);
        this.root.querySelector("#farm-tower").addEventListener("click", onTowerSelect);
        this.root.querySelector("#rocket-tower").addEventListener("click", onTowerSelect);
        
    }
}