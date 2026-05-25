class Path {

    constructor(locs) {
        this.remove_duplicate_threshold = 5;
        this.locs = this.remove_duplicates(locs);
        this.path_nodes = this.generate_path_nodes(this.locs);
        this.set_path_node_adjacencies();
    }

    generate_path_nodes(locs) {
        let path_nodes = []
        for (const loc of locs) {
            path_nodes.push(new PathNode(loc));
        }
        return path_nodes;
    }
    get_length() {
        return this.locs.length;
    }

    first_node() {
        return this.path_nodes[0];
    }

    set_path_node_adjacencies() {
        for (let i = 0; i < this.path_nodes.length - 1; ++i) {
            this.path_nodes[i].set_next(this.path_nodes[i + 1]);
        }
    }

    remove_duplicates(locs) {

        if (locs.length == 0) {return [];}
        let new_locs = [locs[0]];

        let i = 1;
        while (i < locs.length) {

            const last_kept = new_locs[new_locs.length - 1];
            const d = dist(locs[i], last_kept);

            if (d > this.remove_duplicate_threshold) {
                new_locs.push(locs[i]);
            }

            i++;
        }

        console.log("Duplicate nodes removed: ", locs.length - new_locs.length);
        return new_locs;
    }
}