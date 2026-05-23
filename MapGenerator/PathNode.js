class PathNode {
    constructor(loc) {
        this.loc = loc;
        this.next_node = null;
    }

    next() {
        return this.next_node;
    }

    set_next(node) {
        this.next_node = node;
    }

    draw() {
        graphics.draw_path_node(this.loc);
    }
}