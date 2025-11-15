


function init_bezier_interact_handlers(canvas, curve) {

    canvas.addEventListener("click", (evt) => {

        if (CONTROL_POINT_SELECTED) {
            curve.release_all_control_points();
            CONTROL_POINT_SELECTED = false;
            MOUSE_ON_CONTROL_POINT = false;
            return;
        }

        if (MOUSE_ON_CONTROL_POINT) {
            let selected = curve.control_points[control_point_hover_idx];
            selected.bind_to_mouse();
            CONTROL_POINT_SELECTED = true;
        }
        else {
            curve.add_control_point(CURSOR_LOC);
        }
        
    });

    canvas.addEventListener("mousemove", (evt) => {
        mouse_loc = get_canvas_loc(evt);
        update_cursor_loc(mouse_loc, curve);
    });
}


function get_canvas_loc(evt) {
    const rect = canvas.getBoundingClientRect();
    return new Vector2(evt.clientX - rect.left, evt.clientY - rect.top);
}