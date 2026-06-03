const canvas = document.getElementById("canvas");
const pause_bttn = document.getElementById("pause-game");
const game_speed_bttn = document.getElementById("game-speed");
const fps_text = document.getElementById("fps");
const W = 1400;
const H = 800;
const ctx = build_canvas(canvas, W, H, true);

const game = new Game(ctx, W, H, {
    fps_log : fps_text
});


init_UI_buttn_handlers(game);
game.init_path("path1");
game.start();