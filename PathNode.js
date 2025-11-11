class PathNode {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.next_node = null;
    }

    next() {
        return this.next_node;
    }

    set_next(node) {
        this.next_node = node;
    }

    draw() {
        graphics.draw_path_node(this.x, this.y, 15, 15, "#222", 2);
    }
}