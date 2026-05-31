

function init_UI_button_handlers() {

    bake_curve_bttn.addEventListener("click", function() {
        baked_path_points = bake_path(bezier_curves);
        MAIN_PATH = new Path(baked_path_points);
    });

    run_game_bttn.addEventListener("click", function() {
        if (RUNNING_GAME) {run_game_bttn.innerHTML = "Run Game";}
        else {run_game_bttn.innerHTML = "Stop Game";}
        RUNNING_GAME = !RUNNING_GAME;
    });

    show_widget_bttn.addEventListener("click", function() {
        if (SHOW_WIDGETS) {show_widget_bttn.innerHTML = "Show Widgets";}
        else {show_widget_bttn.innerHTML = "Hide Widgets";}
        SHOW_WIDGETS = !SHOW_WIDGETS;
    })
    export_curve_bttn.addEventListener("click", function() {
        export_path(bezier_curves);
    });
}



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
            selected.hovered = false;
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
            if (active_curve) {active_curve.increase_subdivisions();}
            
        }
        if (evt.key === "l") {
            if (active_curve) {active_curve.decrease_subdivisions();}
            
        }
        if (evt.key === "o") {
            if (active_curve) {active_curve.increase_conformity();}
            
        }
        if (evt.key === "p") {
            if (active_curve) {active_curve.decrease_conformity();}
        }
        if (evt.key === "n") {
            CREATING_NEW_CURVE = true;
            
        }
        if (evt.key === " ") {
            GRID_LOCK = !GRID_LOCK;
        }
        if (evt.key === "Escape") {
            coordinate_window.style.display = "none";
        }

    })
}


function get_canvas_loc(evt) {
    const rect = canvas.getBoundingClientRect();
    return new Vector2(evt.clientX - rect.left, evt.clientY - rect.top);
}


function update_cursor_loc(true_mouse_loc) {

    CURSOR_LOC = GRID_LOCK ? nearest_grid_vertex(GRID_SCALE, true_mouse_loc) : true_mouse_loc;

    for (const curve of bezier_curves) {
        control_point_hover_idx = on_control_point(CURSOR_LOC, curve);
        if (control_point_hover_idx >= 0 && !CONTROL_POINT_SELECTED) {
            MOUSE_ON_CONTROL_POINT = true;
            hovered_curve = curve;
            curve.control_points[control_point_hover_idx].hovered = true;
            return;
        }
        curve.set_all_points_unhovered();
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
