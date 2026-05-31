const canvas = document.getElementById("canvas")
const bake_curve_bttn = document.getElementById("bake-curve");
const run_game_bttn = document.getElementById("run-game");
const show_widget_bttn = document.getElementById("show-widgets");
const export_curve_bttn = document.getElementById("export-curve");
const coordinate_window = document.getElementById("coordinate-window");

const ctx = build_canvas(canvas, adaptive_res=true);
const frame_rate = 60;
const graphics = new Graphics(ctx);
const iterator = setInterval(frame, 1000 / frame_rate);
const CURSOR_RAD = 30;
const GRID_SCALE = 39;
const PATH_BAKE_RES = 3;
let FRAME_COUNT = 0;

let GRID_LOCK = true;
let CURSOR_LOC = new Vector2(0,0);
let MOUSE_ON_CONTROL_POINT = false;
let control_point_hover_idx = -1;
let CONTROL_POINT_SELECTED = false;
let CREATING_NEW_CURVE = true;
let SHOW_WIDGETS = true;
let active_curve = null;
let hovered_curve = null;
let bezier_curves = [];
let baked_path_points = [];

let RUNNING_GAME = false;
let MAIN_PATH = null;
let ENTITY_SPAWN_INTERVAL = 10;
let entities = [];

init_bezier_interact_handlers(canvas);
init_UI_button_handlers();


function frame() {

    graphics.clear_canvas();
    graphics.grid(GRID_SCALE);
    draw_entities();
    update_entities();

    if (!MOUSE_ON_CONTROL_POINT) {
        graphics.draw_mouse_loc(CURSOR_LOC);
    }

    if (baked_path_points.length > 0 && SHOW_WIDGETS) {
        graphics.draw_baked_points(baked_path_points);
    }

    if (RUNNING_GAME) {
        entity_spawning(FRAME_COUNT, ENTITY_SPAWN_INTERVAL);
    }

    for (let i = 0; i < bezier_curves.length; ++i) {
        bezier_curves[i].draw();
        bezier_curves[i].update_mouse_bound_control_points(CURSOR_LOC);
    }

    FRAME_COUNT++;
    
}


function draw_entities() {
    for (let i = 0; i < entities.length; ++i) {
        entities[i].draw();
    }
}

function update_entities() {
    let i = 0;
    while (i < entities.length) {
        if (entities[i].path_completed) {
            entities.splice(i, 1);
        }
        else {
            entities[i].update();
            i++;
        }
    }
}


function entity_spawning(frame) {
    if (frame % ENTITY_SPAWN_INTERVAL == 0) {
        entities.push(new Entity(randint(1,5), MAIN_PATH));
    }
}


function bake_path(bz_curves) {
    let pts = [];
    for (const curve of bz_curves) {
        if (curve.control_points.length <= 2) {
            for (const cp of curve.control_points) {pts.push(cp.loc);}
        }
        else {
            for (const pt of curve.bake(PATH_BAKE_RES)) {pts.push(pt);}
        }
    }
    return pts;
}



function export_path(bz_curves) {

    let dec = "[";
    const r = 5;

    for (let i = 0; i < bz_curves.length; ++i) {

        let cps = bz_curves[i].control_points;
        dec += "[";

        for (let j = 0; j < cps.length; j++) {

            rel_x = Math.trunc(cps[j].loc.x / W * Math.pow(10, r)) / Math.pow(10, r);
            rel_y = Math.trunc(cps[j].loc.y / H * Math.pow(10, r)) / Math.pow(10, r);

            dec += `[${rel_x.toString()}, ${rel_y.toString()}]`;
            if (j < cps.length - 1) {dec += ",";}

        }

        dec += "]"
        if (i < bz_curves.length - 1) {dec += ",";}
    }

    dec += "]";
    coordinate_window.style.display = "block";
    coordinate_window.innerHTML = dec;

}



function create_new_bezier_curve(loc) {
    let curve = new BezierCurve();
    curve.add_control_point(loc);
    bezier_curves.push(curve);
    return curve;
}


function nearest_grid_vertex(grid_size, loc) {
    let x = Math.round(loc.x / grid_size) * grid_size;
    let y = Math.round(loc.y / grid_size) * grid_size;
    return new Vector2(x, y);
}