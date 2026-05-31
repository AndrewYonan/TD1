class BezierControlPoint {
    constructor(loc) {
        this.loc = loc;
    }
    draw() {
        graphics.draw_bezier_control_point(this.loc);
    }
}