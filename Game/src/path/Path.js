class Path {

    constructor(locs) {
        this.remove_duplicate_threshold = 5;
        this.locs = this.remove_duplicates(locs);
    }

    get_length() {
        return this.locs.length;
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
        return new_locs;
    }
}