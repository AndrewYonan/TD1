class Game {

    constructor(ctx, width, height, UI_data) {
        
        this.UI_data = UI_data;
        this.graphics = new Graphics(ctx, width, height);

        this.last_time = null;
        this.running = false;
        this.loop = this.loop.bind(this);
        this.high_speed_toggled = false;
        this.game_run_speed = 1;
        
        this.path_res = 10;
        this.path_width = 100;
        this.control_path_bake_res = 50;
        this.spawn_interval = 0.25;
        this.fps = 0;
        this.fps_update_interval = 20;
        this.fps_update_timer = 0;
        this.spawn_timer = 0;

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

    set_high_speed() {
        this.game_run_speed = 2;
        this.high_speed_toggled = true;
    }

    set_normal_speed() {
        this.game_run_speed = 1;
        this.high_speed_toggled = false;
    }

    loop(now) {

        if (!this.running) return;

        const dt = (now - this.last_time) / 1000;
        this.last_time = now;
        this.update(dt * this.game_run_speed);
        this.update_fps(dt);
        this.draw();

        requestAnimationFrame(this.loop);
    }

    update_fps(dt) {

        if (this.fps_update_timer > this.fps_update_interval) {
            this.fps_update_timer = 0;
            this.fps = Math.trunc(100 / dt) / 100;
            this.UI_data.fps_log.innerHTML = "FPS | " + this.fps.toString();
        }

        this.fps_update_timer++;
    }

    update(dt) {
        this.update_entities(dt);
        this.entity_spawning(dt, this.spawn_interval);
    }

    draw() {
        this.graphics.clear_canvas();
        this.graphics.draw_map_path(this.piecewise_bezier_list, this.path_res, this.path_width);
        this.graphics.draw_entities(this.entities);
    }

    init_path(path_preset) {

        const piecewise_bz_list = PATH_CONFIGS[path_preset];
        this.piecewise_bezier_list = make_bezier_path(piecewise_bz_list, W, H);

        const baked_points = bake_path(this.piecewise_bezier_list, this.control_path_bake_res);
        this.control_path = new Path(baked_points);
    
    }

    entity_spawning(dt, spawn_interval) {
        if (this.spawn_timer >= spawn_interval) {
            this.entities.push(new Entity(randint(5,5), this.control_path));
            this.spawn_timer = 0;
        }
        this.spawn_timer += dt;
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