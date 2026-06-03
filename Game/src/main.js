const canvas = document.getElementById("canvas");
const W = 1400;
const H = 800;
const ctx = build_canvas(canvas, W, H, true);


const game = new Game(ctx, {
    width: W,
    height: H,
    frame_rate: 60
});


game.init_path("path4");
game.start();






// const W = 1400;
// const H = 800;
// const frame_rate = 60;
// const ctx = build_canvas(canvas, true);
// const graphics = new Graphics(ctx);
// const CURSOR_RAD = 20;
// const PATH_BAKE_RES = 5;
// const PATH_WIDTH = 30;
// const ENTITY_SPAWN_INTERVAL = 20;

// let FRAME_COUNT = 0; 
// let piecewise_list = PATH_CONFIGS["path0"];
// let piecewise_bz_path = make_bezier_path(piecewise_list, W, H);
// let baked_points = bake_path(piecewise_bz_path, PATH_BAKE_RES);
// let path_control = new Path(baked_points);
// let entities = [];


// function frame() {

//     graphics.clear_canvas();

//     for (let i = 0; i < piecewise_bz_path.length; ++i) {
//         piecewise_bz_path[i].draw();
//     }

//     draw_entities();
//     update_entities();
//     entity_spawning(FRAME_COUNT, ENTITY_SPAWN_INTERVAL);
//     FRAME_COUNT++;
    
// }

