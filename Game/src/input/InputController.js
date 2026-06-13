import Vector2 from "../math/Vector2.js";

export default class InputController {
    constructor({root, canvas}) {
        this.root = root;
        this.canvas = canvas;
        this.mouseLoc = new Vector2(0,0);
    }

    bindActions({onToggleRoundPlay, onRestart, onUnitTowerSelect, onAutoStart}) {

        this.root.querySelector("#run-game").addEventListener("click", onToggleRoundPlay);
        this.root.querySelector("#restart-game").addEventListener("click", onRestart);
        this.root.querySelector("#auto-start").addEventListener("click", onAutoStart);

        const unitTowerAdd = this.root.querySelector("#unit-tower");
        if (unitTowerAdd) unitTowerAdd.addEventListener("click", onUnitTowerSelect);
        
    }

    bindMouse({onMouseClick}) {
        this.canvas.addEventListener("click", onMouseClick);
        this.canvas.addEventListener("mousemove", (evt) => {
            this.mouseLoc = this.getCanvasLoc(evt);
        });
    }

    bindKeys({onEscape}) {
        this.root.addEventListener("keyup", (evt) => {
            if (evt.key === "Escape") {
                onEscape();
            }
        });
    }

    getMouseLoc() {
        return this.mouseLoc;
    }

    getCanvasLoc(evt) {
        const rect = this.canvas.getBoundingClientRect();
        return new Vector2(evt.clientX - rect.left, evt.clientY - rect.top);
    }
}