class Entity {
    constructor(speed) {
        this.speed = speed;
        this.loc = new Vector2(0,0);
        this.scale = new Vector2(10,10);
        this.velocity = new Vector2(0,0);
        this.path_node_target = null;
        this.path_completed = false;
    }   

    join(path) {
        let first = path.first_node();
        this.loc = first.loc;
        this.path_node_target = first.next();
        this.update_velocity();
    }

    move() {

        if (this.path_completed) {return;}

        if (this.passed_target()) {
            this.loc = this.path_node_target.loc;
            this.update_target();
        }
        else {
            this.move_to_next_target_node();
        }
    }

    update_target() {
        this.path_node_target = this.path_node_target.next();
        if (this.path_node_target == null) {
            this.path_completed = true;
        }
        else {
            this.update_velocity();
        }
    }

    to_target_vec() {
        return (this.path_node_target.loc).sub(this.loc);
    }

    update_velocity() {
        this.velocity = this.get_velocity();
    }

    passed_target() {
        return (this.to_target_vec()).dot(this.velocity) < 0;
    }

    get_velocity() {

        let target_v = this.to_target_vec();
        let mag = target_v.mag();

        if (mag == 0) {return;}
        return target_v.div(mag).mult(this.speed);
    }

    show_target_marks() {

        graphics.draw_mark_circle(this.path_node_target.loc, 20);
        graphics.draw_mark_line(this.loc, this.path_node_target.loc);
    }

    move_to_next_target_node() {
        this.loc = (this.loc).add(this.velocity);
    }

    draw() {
        graphics.draw_entity(this.loc, this.scale);
    }
}