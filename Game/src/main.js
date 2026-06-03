const canvas = document.getElementById("canvas");
const W = 1400;
const H = 800;
const ctx = build_canvas(canvas, W, H, true);
const game = new Game(ctx, W, H);


game.init_path("path4");
game.start();