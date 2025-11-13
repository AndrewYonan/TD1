class Path {

    constructor(path_locs) {
        this.path_locs = path_locs;
        this.path_nodes = this.generate_path_nodes(path_locs);
        console.log(this.path_nodes);
        this.set_path_node_adjacencies();
        this.path_thickness = 5;
    }

    generate_path_nodes(locs) {
        let path_nodes = []
        for (const loc of locs) {
            path_nodes.push(new PathNode(loc[0], loc[1]));
        }
        return path_nodes;
    }

    first_node() {
        return this.path_nodes[0];
    }

    set_path_node_adjacencies() {
        for (let i = 0; i < this.path_nodes.length - 1; ++i) {
            this.path_nodes[i].set_next(this.path_nodes[i + 1]);
        }
    }

    draw() {
        graphics.draw_path(this.path_locs, this.path_thickness);
    }
}