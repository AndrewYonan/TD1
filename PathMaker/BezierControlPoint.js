class BezierControlPoint {
    constructor(loc, is_sub_point=false) {
        this.loc = loc;
        this.is_sub_control_point = is_sub_point;
        this.bound_to_mouse = false;
    }
    bind_to_mouse() { 
        this.bound_to_mouse = true;
    }
    release() {
        this.bound_to_mouse = false;
    }
    draw() {
        if (this.is_sub_control_point) {
            // graphics.draw_bezier_sub_control_point(this.loc);
        }
        else {
            graphics.draw_bezier_control_point(this.loc, this.bound_to_mouse);
        }
        
    }
}