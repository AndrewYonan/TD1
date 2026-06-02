class Entity {
    constructor(rank, path) {

        this.rank = rank;
        this.speed = this.get_speed(rank);
        this.target_idx = 1;

        this.path = path;
        this.prev_loc = this.path.locs[0];
        this.loc = this.path.locs[0];
        this.target_loc = this.path.locs[1];
        this.seg_vec = this.segment_vec();
        this.seg_dist = this.segment_dist();
        this.path_completed = false;

        this.t = 0;

    } 

    get_speed(rank) {
        return ENTITY_RANK_DATA[rank - 1]["speed"];
    }

    segment_dist() {
        return this.target_loc.sub(this.prev_loc).mag();
    }

    segment_vec() {
        return this.target_loc.sub(this.prev_loc);
    }

    to_target_vec() {
        return this.target_loc.sub(this.loc);
    }

    achieved_target() {
        return this.t >= 1 || (this.seg_vec).dot(this.to_target_vec()) < 0;
    }

    advance_target() {

        if (this.target_idx >= this.path.get_length() - 1) {
            this.path_completed = true;
            return;
        }

        this.prev_loc = this.target_loc;
        this.target_loc = this.path.locs[++this.target_idx];
        this.seg_vec = this.segment_vec();
        this.seg_dist = this.segment_dist();
        this.t = 0;
    }

    update() {

        if (this.path_completed == true) return;

        let remaining = this.speed;

        while (remaining > 0 && !this.path_completed) {
            
            const dist = this.seg_dist;
            const dist_left = (1 - this.t) * dist;

            if (remaining < dist_left) {
                this.t += remaining / dist;
                remaining = 0;
            }
            else {
                remaining -= dist_left;
                this.advance_target();
            }

        }

        if (!this.path_completed) {
            const progress = this.seg_vec.mult(this.t);
            this.loc = this.prev_loc.add(progress);
        }
        
    }

    draw() {
        graphics.draw_entity(this.loc, this.rank);
    }
  
}


function draw_entities() {
    for (let i = 0; i < entities.length; ++i) {
        entities[i].draw();
    }
}

function update_entities() {
    let i = 0;
    while (i < entities.length) {
        if (entities[i].path_completed) {
            entities.splice(i, 1);
        }
        else {
            entities[i].update();
            i++;
        }
    }
}