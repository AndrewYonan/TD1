class Path {

    constructor(path_locs) {
        this.remove_duplicate_threshold = 5;
        this.path_locs = this.remove_duplicates(path_locs);
        this.path_nodes = this.generate_path_nodes(this.path_locs);
        this.set_path_node_adjacencies();
        this.path_thickness = 50;
    }

    generate_path_nodes(locs) {
        let path_nodes = []
        for (const loc of locs) {
            path_nodes.push(new PathNode(loc));
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

    remove_duplicates(path_locs) {

        if (path_locs.length == 0) {return [];}
        let new_path_locs = [path_locs[0]];

        let i = 1;
        while (i < path_locs.length) {

            const last_kept = new_path_locs[new_path_locs.length - 1];
            const d = dist(path_locs[i], last_kept);

            if (d > this.remove_duplicate_threshold) {
                new_path_locs.push(path_locs[i]);
            }

            i++;
        }

        console.log("Duplicate nodes removed: ", path_locs.length - new_path_locs.length);
        return new_path_locs;
    }

    draw() {
        graphics.draw_path(this.path_locs, this.path_thickness);
    }
}