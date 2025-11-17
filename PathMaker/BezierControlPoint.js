class BezierControlPoint {
    constructor(loc, is_sub_point=false) {
        this.loc = loc;
        this.is_sub_control_point = is_sub_point;
        this.bound_to_mouse = false;
        this.hovered = false;
    }
    bind_to_mouse() { 
        this.bound_to_mouse = true;
    }
    release() {
        this.bound_to_mouse = false;
    }
    draw() {
        if (this.hovered) {
            graphics.draw_bezier_control_point_hovered(this.loc);
        }
        else if (this.bound_to_mouse) {
            graphics.draw_bezier_control_point_selected(this.loc);
        }
        else {
            graphics.draw_bezier_control_point(this.loc);
        }
    }
}