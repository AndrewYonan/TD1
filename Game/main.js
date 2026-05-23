const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
const BG_MAIN_COLOR = "#fff"
const frame_rate = 60;
const iterator = setInterval(frame, 1000 / frame_rate);
const graphics = new Graphics(ctx);
const game = new Game();

init_canvas_params(canvas);
init_event_handlers(game);

game.set_path("zig-zag");
game.set_round(1);
game.start();


function frame() {

    graphics.clear_canvas();
    graphics.grid(100);

    game.draw();
    game.update();
        
}


function init_canvas_params(c) {
    c.width = W;
    c.height = H;
    c.style.backgroundColor = BG_MAIN_COLOR;
    c.style.position = "absolute";
    c.style.left = "50%";
    c.style.marginLeft = "-" + (W/2).toString() + "px";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
}