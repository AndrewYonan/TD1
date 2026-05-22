
function init_event_handlers(game) {
    document.addEventListener("keydown", (evt) => {
        if (evt.key == " ") {
            game.toggle_pause();
        }
    });
}

