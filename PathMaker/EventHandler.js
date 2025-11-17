

function init_bezier_interact_handlers(canvas) {

    canvas.addEventListener("click", (evt) => {

        if (CONTROL_POINT_SELECTED) {
            active_curve.release_all_control_points();
            CONTROL_POINT_SELECTED = false;
            MOUSE_ON_CONTROL_POINT = false;
        }
        else if (MOUSE_ON_CONTROL_POINT && !CREATING_NEW_CURVE) {
            active_curve = hovered_curve;
            let selected = active_curve.control_points[control_point_hover_idx];
            selected.bind_to_mouse();
            CONTROL_POINT_SELECTED = true;
        }
        else if (CREATING_NEW_CURVE) {
            CREATING_NEW_CURVE = false;
            active_curve = create_new_bezier_curve(CURSOR_LOC);
        }
        else {
            active_curve.add_control_point(CURSOR_LOC);
        }
        
    });

    canvas.addEventListener("mousemove", (evt) => {
        mouse_loc = get_canvas_loc(evt);
        update_cursor_loc(mouse_loc);
    });


    document.addEventListener("keydown", (evt) => {
        if (evt.key === "k") {
            active_curve.increase_subdivisions();
        }
        if (evt.key === "l") {
            active_curve.decrease_subdivisions();
        }
        if (evt.key === "o") {
            active_curve.increase_conformity();
        }
        if (evt.key === "p") {
            active_curve.decrease_conformity();
        }
        if (evt.key === "n") {
            CREATING_NEW_CURVE = true;
        }
        if (evt.key === " ") {
            GRID_LOCK = !GRID_LOCK;
        }

    })
}


function get_canvas_loc(evt) {
    const rect = canvas.getBoundingClientRect();
    return new Vector2(evt.clientX - rect.left, evt.clientY - rect.top);
}