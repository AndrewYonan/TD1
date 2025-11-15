const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
const BG_MAIN_COLOR = "#fff"
const frame_rate = 60;
const graphics = new Graphics(ctx);
const iterator = setInterval(frame, 1000 / frame_rate);
const CURSOR_RAD = 30;
const GRID_SCALE = 50;
let FRAME_COUNT = 0 

let CURSOR_LOC = new Vector2(0,0);
let MOUSE_ON_CONTROL_POINT = false;
let control_point_hover_idx = -1;
let CONTROL_POINT_SELECTED = false;
let C = new BezierCurve();



init_canvas_params();
init_bezier_interact_handlers(canvas, C);


function frame() {
    graphics.clear_canvas();
    graphics.grid(GRID_SCALE);
    graphics.draw_mouse_loc(CURSOR_LOC);
    C.update_mouse_bound_control_points(CURSOR_LOC);
    C.draw();
    FRAME_COUNT++;
    
}


function nearest_grid_vertex(grid_size, loc) {
    let x = Math.round(loc.x / grid_size) * grid_size;
    let y = Math.round(loc.y / grid_size) * grid_size;
    return new Vector2(x, y);
}


function update_cursor_loc(true_mouse_loc, curve) {
    CURSOR_LOC = nearest_grid_vertex(GRID_SCALE, true_mouse_loc);
    MOUSE_ON_CONTROL_POINT = on_control_point(CURSOR_LOC, curve);
}


function on_control_point(mouse_loc, curve) {
    let points = curve.control_points;
    for (let i = 0; i < points.length; ++i) {
        if ((dist(points[i].loc, mouse_loc) <= CURSOR_RAD)) {
            control_point_hover_idx = i;
            return true;
        }
    }
    return false;
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