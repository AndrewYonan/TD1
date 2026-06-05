
const W = 1400;
const H = 800;

const canvas = document.getElementById("canvas");
const pause_button = document.getElementById("pause-game");
const speed_button = document.getElementById("game-speed");
const lives_text = document.getElementById("lives");
const money_text = document.getElementById("money");
const restart_button = document.getElementById("restart-game");
const fps_text = document.getElementById("fps");
const game_over_screen = document.getElementById("game-over-screen");

const ctx = build_canvas(canvas, W, H, true);
const UI_manager = new UI_Manager({
                                "lives" : lives_text, 
                                "money" : money_text, 
                                "fps" : fps_text,
                                "game_over_screen" : game_over_screen,
                                "pause_bttn" : pause_button,
                                "speed_bttn" : speed_button,
                                "restart_bttn" : restart_button,
                                "window" : window});


const game = new Game(ctx, W, H, UI_manager, 
{
    spawn_interval: 0.5,
    path_width: 80,
    path_res: 10,
    control_path_bake_res: 50,
    lives: 1,
    money: 650,
    path_preset: "path0"
});


game.draw();
