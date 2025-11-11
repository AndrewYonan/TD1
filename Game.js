class Game {
    
    constructor() {
        this.round = 0;
        this.paused = true;
        this.spawn_idx = 0;
        this.entities = [];
        this.path = null;
        this.round_config = null;
        this.spawn_times = null;
        this.finished_spawning = false;
        this.round_manager = new RoundManager();
        this.path_generator = new PathGenerator();
    }

    set_path(path_config) {

        let path_locs;

        if (path_config == "zig-zag") {
            path_locs = this.path_generator.square_zig_zag(50, H/2, 80);
        }
        else if (path_config == "default-1") {
            path_locs = this.path_generator.default_path_1();
        }

        this.path = new Path(path_locs);
    }

    set_round(i) {
        this.round = i;
        this.round_config = this.get_round_config(i);
        this.spawn_times = this.get_spawn_times();
        console.log("set round config to ", this.round_config);
        console.log("set spawn_time_map to ", this.spawn_times);
    }

    get_spawn_times() {
        let map = [];
        let t = 0
        for (let i = 0; i < this.round_config.length; ++i) {
            let spawn = this.round_config[i];
            let spacing = spawn[0] * 100;
            let speed = spawn[1];
            let spawn_interval = Math.floor(spacing / speed);
            map.push(t);
            t += spawn_interval;
        }
        return map;
    }

    get_round_config(round) {
        return this.round_manager.get_round(round);
    }

    start() {
        this.paused = false;
    }

    spawn_entity(speed) {

        let entity = new Entity(speed);
        entity.join(this.path);
        this.entities.push(entity);
        this.spawn_idx++;

        if (this.spawn_idx >= this.round_config.length) {
            this.finished_spawning = true;
        }
    }


    draw() {
        this.path.draw();
        this.draw_entities();
        
    }

    draw_entities() {
        for (const entity of this.entities) {
            entity.draw();
        }
    }
    
    move_entities() {
        for (const entity of this.entities) {
            entity.move();
        }
    }

    update() {

        if (this.spawn_times == null) {
            console.log("SPAWN TIME UNDEFINED HERE");
            return;
        }

        if (!this.finished_spawning && FRAME_COUNT == this.spawn_times[this.spawn_idx]) {
            let speed = this.round_config[this.spawn_idx][1];
            this.spawn_entity(speed);
        }

        if (!this.paused) {
            this.move_entities();
        }       
    }


}