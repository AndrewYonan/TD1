const BG_MAIN_COLOR = "rgb(185, 255, 132)";
const PATH_COLOR = "rgb(51, 51, 51)";




function build_canvas(canv, width, height, adaptive_res) {

    const dpr = window.devicePixelRatio || 1; 

    if (adaptive_res) {
        canv.width = width * dpr;
        canv.height = height * dpr;
    }
    else {
        canv.width = width;
        canv.height = height;
    }
    
    canv.style.width = width + "px";
    canv.style.height = height + "px";
    
    canv.style.position = "absolute";
    canv.style.left = "50%";
    canv.style.transform = "translateX(-50%)"
    canv.style.backgroundColor = BG_MAIN_COLOR;;

    const ctx = canv.getContext('2d');
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    if (adaptive_res) {
        ctx.scale(dpr, dpr);
    }

    return ctx;
}




class Graphics {
    
    constructor(ctx, width, height) {
        this.ctx = ctx;
        this.W = width;
        this.H = height;
        this.pixel_ratio = 1;
    }

    clear_canvas() {
        this.ctx.clearRect(0, 0, this.W, this.H);
    }

    draw_frame_rate(val) {
        ctx.font = '40px "Times New Roman"';
        ctx.fillStyle = "#000";
        ctx.fillText("FPS : " + val.toString(), 400, 50);
    }


    draw_control_path(control_path) {
        this.ctx.strokeStyle = "#f00";
        this.ctx.lineWidth = 2;
        for (const vec of control_path.locs) {
            this.ctx.beginPath();
            this.ctx.arc(vec.x, vec.y, 10, 0, Math.PI * 2);
            this.ctx.stroke();
        }
    }

    draw_map_path(piecewise_bezier_list, render_res, path_width) {

        this.ctx.lineCap = "round";
        this.ctx.lineWidth = path_width/2;
        this.ctx.strokeStyle = PATH_COLOR;

        this.ctx.beginPath();
        
        for (let i = 0; i < piecewise_bezier_list.length; ++i) {
            const bz_curve = piecewise_bezier_list[i];
            this.draw_bezier_map_path_seg(bz_curve, render_res);
        }

        this.ctx.stroke();
    }

    draw_bezier_map_path_seg(bz_curve, ds) {

        if (bz_curve.control_points.length === 0) return;
        if (ds <= 0) return;
    
        const cp_vecs = bz_curve.get_control_point_vecs();
        const dt = bz_curve.resolution;

        let prev = bz_curve.control_points[0].loc;
        let dist_since_last_drawn = 0;
        let t = dt;

        this.ctx.moveTo(prev.x, prev.y);
    
        while (t <= 1) {

            const curr = bz_curve.bezier_interp(t, cp_vecs);
    
            let segment_vec = curr.sub(prev);
            let segment_len = segment_vec.mag();
    
            
            while (dist_since_last_drawn + segment_len >= ds) {

                const remaining = ds - dist_since_last_drawn;
                const alpha = remaining / segment_len;
    
                const draw_point = prev.add(segment_vec.mult(alpha));
                
                this.ctx.lineTo(draw_point.x, draw_point.y);
                
                prev = draw_point;
                segment_vec = curr.sub(prev);
                segment_len = segment_vec.mag();
    
                dist_since_last_drawn = 0;
            }
    
            dist_since_last_drawn += segment_len;
            prev = curr;
            t += dt;
        }

        const last = cp_vecs[cp_vecs.length - 1];
        this.ctx.lineTo(last.x, last.y);
    }

    draw_entities(entities) {
        for (let i = 0; i < entities.length; ++i) {
            this.draw_entity(entities[i])
        }
    }

    draw_entity(entity) {

        const loc = entity.loc;
        const rank = entity.rank;
        const color = ENTITY_RANK_DATA[rank - 1]["color"];
        const scale = ENTITY_RANK_DATA[rank - 1]["size"];

        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.arc(loc.x, loc.y, scale, 0, 2*Math.PI);
        this.ctx.fill();
    }   

    grid(size) {
        const {ctx} = this;
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 1;
        for (let i = 0; i < W/size; ++i) {
            ctx.beginPath();
            ctx.moveTo(0, size*i);
            ctx.lineTo(W, size*i);
            ctx.stroke();
        }
        for (let i = 0; i < W/size; ++i) {
            ctx.beginPath();
            ctx.moveTo(size*i, 0);
            ctx.lineTo(size*i, H);
            ctx.stroke();
        }
    }
}