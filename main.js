const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
const BG_MAIN_COLOR = "#fff"
const frame_rate = 60;
const iterator = setInterval(frame, 1000 / frame_rate);
const graphics = new Graphics(ctx);
const path_generator = new PathGenerator();
const game = new Game();
var FRAME_COUNT = 0 

init_canvas_params();

game.set_path("zig-zag");
game.set_round(1);
game.start();


function frame() {

    graphics.clear_canvas();
    graphics.grid(100);

    game.draw();
    game.update();
    FRAME_COUNT++;
    
}


function init_canvas_params() {
    canvas.width = W;
    canvas.height = H;
    canvas.style.backgroundColor = BG_MAIN_COLOR;
    canvas.style.position = "absolute";
    canvas.style.left = "50%";
    canvas.style.marginLeft = "-" + (W/2).toString() + "px";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
}