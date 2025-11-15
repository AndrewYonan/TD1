class BezierControlPoint {
    constructor(loc) {
        this.loc = loc;
        this.bound_to_mouse = false;
    }
    bind_to_mouse() {
        this.bound_to_mouse = true;
    }
    release() {
        this.bound_to_mouse = false;
    }
    draw() {
        graphics.draw_bezier_control_point(this.loc, this.bound_to_mouse);
    }
}