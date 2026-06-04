class UI_Manager {

    constructor(UI_endpoints) {
        this.UI_endpoints = UI_endpoints;
    }

    update(UI_id, val) {
        this.UI_endpoints[UI_id].innerHTML = val;
    }

    restart() {
        this.init_UI_buttn_handlers();
        this.cancel_game_over_screen();
    }

    show_game_over_screen() {
        this.UI_endpoints["game_over_screen"].style.display = "flex";
    }

    cancel_game_over_screen() {
        this.UI_endpoints["game_over_screen"].style.display = "none";
    }


    init_UI_buttn_handlers() {

        const pause_bttn = this.UI_endpoints["pause_bttn"];
        const speed_bttn = this.UI_endpoints["speed_bttn"];
        const restart_bttn = this.UI_endpoints["restart_bttn"];

        this.pause_handler = () => {

            if (!game.running) {
                game.start();
                pause_bttn.innerHTML = "Pause";
            }
            else {
                game.stop();
                pause_bttn.innerHTML = "Play";
            }
        };
    
        this.speed_handler = () => {

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
            // game.restart();
        }
    
        pause_bttn.addEventListener("click", this.pause_handler);
        speed_bttn.addEventListener("click", this.speed_handler);
        restart_bttn.addEventListener("click", this.restart_handler)
    
    }

    cancel_controls() {

        const pause_bttn = this.UI_endpoints["pause_bttn"];
        const speed_bttn = this.UI_endpoints["speed_bttn"];

        pause_bttn.removeEventListener("click", this.pause_handler);
        speed_bttn.removeEventListener("click", this.speed_handler);
    }
}