class Game {

    constructor(ctx, width, height, UI_manager, config = {}) {
        
        this.width = width;
        this.height = height;
        this.UI_manager = UI_manager;
        this.graphics = new Graphics(ctx, width, height);
        this.loop = this.loop.bind(this);
        this.config = config;
        this.UI_manager.init_UI_buttn_handlers(this);
        this.animation_frame_id = null;

        this.initialize_game_params();
        
    }

    initialize_game_params() {

        this.game_run_speed = this.config.game_run_speed ?? 1;
        this.fps_update_interval = this.config.fps_update_interval ?? 20;
        this.control_path_bake_res = this.config.control_path_bake_res ?? 50;
        this.spawn_interval = this.config.spawn_interval ?? 0.25;
        this.path_res = this.config.path_res ?? 10;
        this.path_width = this.config.path_width ?? 100;
        this.lives = this.config.lives ?? 250;
        this.money = this.config.money ?? 250;
        this.path_preset = this.config.path_preset ?? "path0";

        this.game_is_over = false;
        this.high_speed_toggled = false;
        this.running = false;
        this.last_time = null;
        this.fps_update_timer = 0;
        this.spawn_timer = 0;
        this.entities = [];

        this.control_path = null;
        this.piecewise_bezier_list = null;
        this.init_path(this.path_preset);

        this.UI_manager.reset();    
        this.update_money();
        this.update_lives();
    }

    start() {

        if (this.running) return;
        this.running = true;
        this.last_time = performance.now();
        this.animation_frame_id = requestAnimationFrame(this.loop);
    }


    stop() {
        if (this.animation_frame_id != null) {
            cancelAnimationFrame(this.animation_frame_id);
            this.animation_frame_id = null;
        }
        this.running = false;
    }

    restart() {
        this.stop();
        this.initialize_game_params();
        this.update_lives();
        this.update_money();
        this.draw();
        this.UI_manager.pause();
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
        this.animation_frame_id = requestAnimationFrame(this.loop);
    }

    update_fps(dt) {

        if (this.fps_update_timer > this.fps_update_interval) {
            this.fps_update_timer = 0;
            const fps = Math.trunc(100 / dt) / 100;
            this.UI_manager.update_fps(fps);
        }
        this.fps_update_timer++;
    }

    update_lives() {
        this.UI_manager.update_lives(this.lives);
    }

    update_money() {
        this.UI_manager.update_money(this.money);
    }

    update(dt) {
        this.update_entities(dt);
        this.entity_spawning(dt, this.spawn_interval);
        this.update_lives();
        this.update_money();
    }

    draw() {
        this.graphics.clear_canvas();
        this.graphics.draw_map_path(this.piecewise_bezier_list, this.path_res, this.path_width);
        this.graphics.draw_entities(this.entities);
    }

    init_path(path_preset) {

        this.path_preset = path_preset;

        const piecewise_bz_list = PATH_CONFIGS[path_preset];
        this.piecewise_bezier_list = make_bezier_path(piecewise_bz_list, this.width, this.height);

        const baked_points = bake_path(this.piecewise_bezier_list, this.control_path_bake_res);
        this.control_path = new Path(baked_points);
    
    }

    spawn_entity(type, path) {
        this.entities.push(new Entity(type, path));
    }

    entity_spawning(dt, spawn_interval) {
        if (this.spawn_timer >= spawn_interval) {
            this.spawn_entity(randint(1,5), this.control_path);
            this.spawn_timer = 0;
        }
        this.spawn_timer += dt;
    }

    entity_passed(entity) {
        this.lives = Math.max(0, this.lives - entity.get_leak_damage());
        if (this.lives == 0) {
            this.game_over();
        }
    }

    game_over() {

        if (this.game_is_over) return;

        this.game_is_over = true;
        this.set_normal_speed();
        this.UI_manager.show_game_over_screen();
        this.UI_manager.cancel_controls();
    }

    update_entities(dt) {
        let i = 0;
        while (i < this.entities.length) {
            if (this.entities[i].path_completed) {
                this.entity_passed(this.entities[i]);
                this.entities.splice(i, 1);
            }
            else {
                this.entities[i].update(dt);
                i++;
            }
        }
    }
}