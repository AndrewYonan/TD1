const canvas = document.getElementById("canvas");
const pause_button = document.getElementById("pause-game");
const speed_button = document.getElementById("game-speed");
const fps_text = document.getElementById("fps");
const W = 1400;
const H = 800;
const ctx = build_canvas(canvas, W, H, true);


const game = new Game(ctx, W, H, {fps_log : fps_text}, {
    spawnInterval: 0.25,
    pathWidth: 100,
    pathRes: 10,
    controlPathBakeRes: 50
});


init_UI_buttn_handlers(game, {
    pause_bttn : pause_button,
    speed_bttn : speed_button
});


game.init_path("path1");
game.start();