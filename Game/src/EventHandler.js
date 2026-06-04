function init_UI_buttn_handlers(game, buttons) {

    const {pause_bttn, speed_bttn} = buttons;

    pause_bttn.addEventListener("click", (evt) => {

        if (!game.running) {
            game.start();
            pause_bttn.innerHTML = "Pause";
        }
        else {
            game.stop();
            pause_bttn.innerHTML = "Play";
        }
        
    });

    speed_bttn.addEventListener("click", (evt) => {
        if (game.high_speed_toggled) {
            game.set_normal_speed();
            speed_bttn.innerHTML = "Fast >>";
        }
        else {
            game.set_high_speed();
            speed_bttn.innerHTML = "Normal";
        }
    });

}