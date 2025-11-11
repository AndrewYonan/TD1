class Entity {
    constructor(speed) {
        this.x = null;
        this.y = null;
        this.speed = speed;
        this.velocity = {x: 0, y: 0};
        this.path_node_target = null;
        this.path_completed = false;

    }   

    join(path) {
        let first = path.first_node();
        this.x = first.x;
        this.y = first.y;
        this.path_node_target = first.next();
        this.update_velocity();
    }
    
    set_path_node_target(target_path_node) {
        this.path_node_target = target_path_node;   
    }

    move() {

        if (this.path_completed) {return;}

        if (this.passed_target()) {
            this.x = this.path_node_target.x;
            this.y = this.path_node_target.y;
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
        return {x : this.path_node_target.x - this.x, y : this.path_node_target.y - this.y};
    }

    update_velocity() {
        this.velocity = this.get_velocity();
    }

    passed_target() {
        return dot(this.to_target_vec(), this.velocity) < 0;
    }

    get_velocity() {

        let target = {x : this.path_node_target.x, y : this.path_node_target.y};
        let target_v = {x : (target.x - this.x), y : (target.y - this.y)};
        let mag = Math.sqrt(Math.pow(target_v.x, 2) + Math.pow(target_v.y, 2));

        if (mag == 0) {return;}

        return {x : (target_v.x / mag) * this.speed, y : (target_v.y / mag) * this.speed};
    }

    move_to_next_target_node() {
        
        let target = {x : this.path_node_target.x, y : this.path_node_target.y};

        graphics.draw_mark(target.x, target.y);
        graphics.draw_line(this.x, this.y, target.x, target.y)

        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }

    draw() {
        graphics.draw_entity(this.x, this.y);
    }
}