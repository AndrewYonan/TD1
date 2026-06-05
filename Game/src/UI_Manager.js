class UI_Manager {

    constructor(UI_endpoints) {
        this.UI_endpoints = UI_endpoints;
    }

    update(UI_id, val) {
        this.UI_endpoints[UI_id].innerHTML = val;
    }

    reset() {
        this.cancel_game_over_screen();
        this.restore_controls();
        this.UI_endpoints["pause_bttn"].innerHTML = "Play";
        this.UI_endpoints["speed_bttn"].innerHTML = "Fast >>";
    }

    update_fps(fps) {
        this.update("fps", "FPS | " + fps.toString());
    }

    update_money(money) {
        this.update("money", "$" + money.toString());
    }

    update_lives(lives) {
        this.update("lives", "Lives | " + lives.toString());
    }

    show_game_over_screen() {
        this.UI_endpoints["game_over_screen"].style.display = "flex";
    }

    cancel_game_over_screen() {
        this.UI_endpoints["game_over_screen"].style.display = "none";
    }

    pause() {
        this.UI_endpoints["pause_bttn"].innerHTML = "Play";
    }

    init_UI_buttn_handlers(game) {

        const pause_bttn = this.UI_endpoints["pause_bttn"];
        const speed_bttn = this.UI_endpoints["speed_bttn"];
        const restart_bttn = this.UI_endpoints["restart_bttn"];
        const game_window = this.UI_endpoints["window"];

        this.toggle_pause = () => {

            if (!game.running) {
                game.start();
                pause_bttn.innerHTML = "Pause";
            }
            else {
                game.stop();
                pause_bttn.innerHTML = "Play";
            }
        };
    
        this.toggle_speed = () => {

            if (game.high_speed_toggled) {
                game.set_normal_speed();
                speed_bttn.innerHTML = "Fast >>";
            }
            else {
                game.set_high_speed();
                speed_bttn.innerHTML = "Normal";
            }
        };

        this.restart_handler = () => {
            game.restart();
        }

        this.key_up = (evt) => {
            if (evt.code === "Space") {
                this.toggle_pause();
                evt.preventDefault();
            }
        }
    
        pause_bttn.addEventListener("click", this.toggle_pause);
        speed_bttn.addEventListener("click", this.toggle_speed);
        restart_bttn.addEventListener("click", this.restart_handler);
        game_window.addEventListener("keyup", this.key_up);
    }

    cancel_controls() {
        this.UI_endpoints["pause_bttn"].disabled = true;
        this.UI_endpoints["speed_bttn"].disabled = true;
        this.UI_endpoints["window"].removeEventListener("keyup", this.key_up);
    }

    restore_controls() {
        this.UI_endpoints["pause_bttn"].disabled = false;
        this.UI_endpoints["speed_bttn"].disabled = false;
        this.UI_endpoints["window"].addEventListener("keyup", this.key_up);
    }
}