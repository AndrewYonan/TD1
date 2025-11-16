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
let CREATING_NEW_CURVE = true;
let active_curve = null;
let hovered_curve = null;

let bezier_curves = [];


init_canvas_params();
init_bezier_interact_handlers(canvas);



function frame() {

    graphics.clear_canvas();
    graphics.grid(GRID_SCALE);
    graphics.draw_mouse_loc(CURSOR_LOC);


    for (let i = 0; i < bezier_curves.length; ++i) {
        bezier_curves[i].draw();
        bezier_curves[i].update_mouse_bound_control_points(CURSOR_LOC);
    }

    FRAME_COUNT++;
    
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


function update_cursor_loc(true_mouse_loc) {

    CURSOR_LOC = nearest_grid_vertex(GRID_SCALE, true_mouse_loc);

    for (const curve of bezier_curves) {
        control_point_hover_idx = on_control_point(CURSOR_LOC, curve);
        if (control_point_hover_idx >= 0 && !CONTROL_POINT_SELECTED) {
            MOUSE_ON_CONTROL_POINT = true;
            hovered_curve = curve;
            return;
        }
    }

    MOUSE_ON_CONTROL_POINT = false;
    
}


function on_control_point(mouse_loc, curve) {
    let points = curve.control_points;
    for (let i = 0; i < points.length; ++i) {
        if ((dist(points[i].loc, mouse_loc) <= CURSOR_RAD)) {
            return i;
        }
    }
    return -1;
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