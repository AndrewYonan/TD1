class Game {

    constructor(ctx, width, height) {
        
        this.last_time = null;
        this.running = false;
        this.loop = this.loop.bind(this);
        this.graphics = new Graphics(ctx, width, height);
        
        this.frame = 0;
        this.path_res = 10;
        this.path_width = 100;
        this.control_path_bake_res = 50;
        this.spawn_interval = 30;
        this.fps = 0;
        this.fps_update_interval = 20;
        this.fps_update_timer = 0;

        this.entities = [];
        this.control_path = null;
        this.piecewise_bezier_list = null;

    }

    start() {

        if (this.running) return;
        this.running = true;
        this.last_time = performance.now();
        requestAnimationFrame(this.loop);

    }

    stop() {
        this.running = false;
    }

    loop(now) {

        if (!this.running) return;

        const dt = (now - this.last_time) / 1000;
        this.last_time = now;
        this.update(dt);
        this.update_fps(dt);
        this.draw();

        requestAnimationFrame(this.loop);
    }

    update_fps(dt) {

        if (this.fps_update_timer > this.fps_update_interval) {
            this.fps_update_timer = 0;
            this.fps = Math.trunc(100 / dt) / 100;
        }

        this.fps_update_timer++;
    }

    update(dt) {
        this.update_entities(dt);
        this.entity_spawning(this.frame, this.spawn_interval);
        this.frame++;
    }

    draw() {
        this.graphics.clear_canvas();
        this.graphics.draw_map_path(this.piecewise_bezier_list, this.path_res, this.path_width);
        this.graphics.draw_entities(this.entities);
        this.graphics.draw_frame_rate(this.fps);
    }

    init_path(path_preset) {

        const piecewise_bz_list = PATH_CONFIGS[path_preset];
        this.piecewise_bezier_list = make_bezier_path(piecewise_bz_list, W, H);

        const baked_points = bake_path(this.piecewise_bezier_list, this.control_path_bake_res);
        this.control_path = new Path(baked_points);
    
    }

    entity_spawning(frame, spawn_interval) {
        if (frame % spawn_interval == 0) {
            this.entities.push(new Entity(randint(5,5), this.control_path));
        }
    }

    update_entities(dt) {
        let i = 0;
        while (i < this.entities.length) {
            if (this.entities[i].path_completed) {
                this.entities.splice(i, 1);
            }
            else {
                this.entities[i].update(dt);
                i++;
            }
        }
    }
}