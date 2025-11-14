class Game {
    
    constructor() {

        this.round = 0;
        this.lives = 100;
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
            path_locs = this.path_generator.square_zig_zag(-30, H/2, 80);
        }
        else if (path_config == "default-1") {
            path_locs = this.path_generator.default_path_1();
        }
        else if (path_config == "default-2") {
            path_locs = this.path_generator.default_path_2();
        }
        else {
            console.log("PATH PRESET NOT FOUND");
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
            let spacing = spawn[0] * 200;
            let rank = spawn[1];
            let speed = ENTITY_RANK_DATA[rank - 1]["speed"];
            let spawn_interval = Math.ceil(spacing / speed);
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

    display_lives() {
        graphics.draw_lives_count(this.lives);
    }

    display_game_data() {
        this.display_lives();
    }


    draw() {
        this.path.draw();
        this.draw_entities();
        this.display_game_data();
        
    }

    draw_entities() {
        for (const entity of this.entities) {
            entity.draw();
        }
    }

    leak(entity) {
        const damage = ENTITY_RANK_DATA[entity.rank - 1]["leak_damage"];
        this.lives = max(0, this.lives - damage);
    }
    
    update_entities() {

        let i = 0;

        while (i < this.entities.length) {

            if (this.entities[i].path_completed) {
                const leaked = this.entities[i];
                this.entities.splice(i, 1);
                this.leak(leaked);
            }
            else {
                this.entities[i].move();
                i++;
            }
            
        }
    }

    update() {

        if (this.spawn_times == null) {
            console.log("SPAWN TIME UNDEFINED HERE");
            return;
        }

        if (!this.finished_spawning && FRAME_COUNT == this.spawn_times[this.spawn_idx]) {
            let rank = this.round_config[this.spawn_idx][1];
            console.log("spawning rank", rank);
            this.spawn_entity(rank);
        }

        if (!this.paused) {
            this.update_entities();
        }       
    }


}