const canvas = document.getElementById("canvas");
const W = 1400;
const H = 800;
const frame_rate = 60;
const ctx = build_canvas(canvas, adaptive_res=true);
const graphics = new Graphics(ctx);
const CURSOR_RAD = 20;
const PATH_BAKE_RES = 5;
const ENTITY_SPAWN_INTERVAL = 20;
let FRAME_COUNT = 0; 

let piecewise_list = PATH_CONFIGS["path2"];
let piecewise_bz_path = make_bezier_path(piecewise_list);
let baked_points = bake_path(piecewise_bz_path, PATH_BAKE_RES);
let path = new Path(baked_points);
let entities = [];



setInterval(frame, 1000 / frame_rate);



function frame() {

    graphics.clear_canvas();
    graphics.grid(80);

    for (let i = 0; i < piecewise_bz_path.length; ++i) {
        piecewise_bz_path[i].draw();
    }

    draw_entities();
    update_entities();
    entity_spawning(FRAME_COUNT, ENTITY_SPAWN_INTERVAL);
    FRAME_COUNT++;
    
}