class Path {
    constructor() {
        this.points = [];
    }
    show_points() {
        for (const point of this.points) {
            graphics.draw_path_point(point);
        }
    }
}