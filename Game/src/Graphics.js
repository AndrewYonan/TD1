const BG_MAIN_COLOR = "rgb(185, 255, 132)";
const PATH_COLOR = "rgb(62, 62, 62)";


function build_canvas(canvas, adaptive_res) {

    const dpr = window.devicePixelRatio || 1; 

    if (adaptive_res) {
        canvas.width = W * dpr;
        canvas.height = H * dpr;
    }
    else {
        canvas.width = W;
        canvas.height = H;
    }
    
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    
    canvas.style.position = "absolute";
    canvas.style.left = "50%";
    canvas.style.transform = "translateX(-50%)"
    canvas.style.backgroundColor = BG_MAIN_COLOR;;

    const ctx = canvas.getContext('2d');
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    if (adaptive_res) {
        ctx.scale(dpr, dpr);
    }

    return ctx;
}



class Graphics {
    
    constructor(ctx) {
        this.ctx = ctx;
        this.pixel_ratio = 1;
        this.camera = new Vector2(0,0);
    }

    clear_canvas() {
        const {ctx} = this;
        ctx.clearRect(0,0,W,H);
    }

    draw_mouse_loc(loc) {
        const color = "#888";
        const line_width = 3;
        const r = CURSOR_RAD
        this.draw_arc(loc, r, color, line_width);
    }

    draw_entity(loc, rank) {
        const color = ENTITY_RANK_DATA[rank - 1]["color"];
        const scale = ENTITY_RANK_DATA[rank - 1]["size"];
        this.draw_arc_filled(loc, scale, color);
    }

    draw_path_point(loc) {
        this.draw_arc(loc, 10, "#f33", 1);
    }

    draw_bezier_control_point(loc) {
        this.draw_arc(loc, CURSOR_RAD, "#888", 1);
    }

    draw_bezier_control_point_selected(loc) {
        this.draw_arc(loc, CURSOR_RAD, "#000", 6);
    }

    draw_bezier_control_point_hovered(loc) {
        this.draw_arc(loc, CURSOR_RAD, "#aaa", 6);
    }

    draw_bezier_curve_point(loc) {
        const color = "#f55";
        const line_width = 3;
        const r = 5;
        this.draw_arc(loc, r, color, line_width);
    }

    draw_bezier_sub_control_point(loc) {
        const color = "#111";
        const line_width = 1;
        const r = 10;
        this.draw_arc(loc, r, color, line_width);
    
    }

    draw_bezier_spined_segment(p1, p2) {

        const curve_color = "rgb(184, 67, 67)";
        const spine_color = curve_color;

        this.draw_line(p1, p2, curve_color, 5);

        let spine_len = 20;

        let dir = (p2.sub(p1)).normal();
        let spine_start = p1.add(dir.mult(spine_len / 2));
        let spine_end = p1.sub(dir.mult(spine_len / 2));
        this.draw_line(spine_start, spine_end, spine_color, 1);
    }

    draw_bezier_curve_segment(p1, p2) {

        const curve_color = PATH_COLOR;
        this.draw_line(p1, p2, curve_color, 10);
    }

    draw_path_segment(p1) {
        this.draw_arc_filled(p1, PATH_WIDTH/2, PATH_COLOR);
    }

    draw_bezier_skeleton_line(p1, p2) {

        const color = "#aaa";
        const line_width = 2;
        const dash_l = 4;
        const bisect_len = 20;
        
        let dir = p2.sub(p1);
        const len = dir.mag();
        dir = dir.div(len);

        const bisector = dir.normal();
        const mid = p1.add((p2.sub(p1)).div(2));

        this.draw_line(mid.add(bisector.mult(bisect_len/2)), mid.sub(bisector.mult(bisect_len/2)), "#000", 2);

        for (let i = 0; i < Math.floor(len / dash_l); ++i) {
            if (i % 2 == 0) {
                const c1 = p1.add(dir.mult(i * dash_l));
                const c2 = p1.add(dir.mult((i + 1) * dash_l));
                this.draw_line(c1, c2, color, line_width);
            }
        }
    }

    draw_baked_points(points) {
        for (const p of points) {
            ctx.strokeStyle = "#000";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 20, 0, Math.PI * 2);
            ctx.stroke();
        }
    }

    display_conformity(conformity) {
        ctx.font = '30px "Arial"';
        ctx.fillStyle = "#000";
        ctx.textAlign = "left";
        ctx.fillText("Conformity: " + conformity.toString(), 50, 50);
    }

    display_subdivisions(subdivisions) {
        ctx.font = '30px "Arial"';
        ctx.fillStyle = "#000";
        ctx.textAlign = "left";
        ctx.fillText("Subdivisions: " + subdivisions.toString(), 50, 90);
    }

    display_control_point_count(count) {
        ctx.font = '30px "Arial"';
        ctx.fillStyle = "#000";
        ctx.textAlign = "left";
        ctx.fillText("Effective control points: " + count.toString(), 50, 130);
    }

    draw_line(loc1,loc2,color,line_width) {
        const {ctx} = this;
        ctx.strokeStyle = color;
        ctx.lineWidth = line_width;
        ctx.beginPath();
        ctx.moveTo(loc1.x, loc1.y);
        ctx.lineTo(loc2.x, loc2.y);
        ctx.stroke();
    }

    draw_circle(loc, radius, color, line_width) {
        const {ctx} = this;
        ctx.strokeStyle = color;
        ctx.lineWidth = line_width;
        ctx.beginPath();
        ctx.arc(loc.x, loc.y, radius, 0, Math.PI * 2);
        ctx.stroke();
    }

    draw_arc(loc, radius, color, line_width) {
        const {ctx} = this;
        ctx.strokeStyle = color;
        ctx.lineWidth = line_width;
        ctx.beginPath();
        ctx.arc(loc.x, loc.y, radius, 0, Math.PI * 2);
        ctx.stroke();
    }

    draw_arc_filled(loc, radius, color) {
        const {ctx} = this;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(loc.x, loc.y, radius, 0, Math.PI * 2);
        ctx.fill();
    }

    draw_rect(loc, scale, color, line_width) {
        const {ctx} = this;
        ctx.strokeStyle = color;
        ctx.lineWidth = line_width;
        ctx.strokeRect(loc.x - scale.x/2, loc.y - scale.y/2, scale.x, scale.y);
    }  

    draw_rect_filled(loc, scale, color) {
        const {ctx} = this;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.fillRect(loc.x - scale.x/2, loc.y - scale.y/2, scale.x, scale.y);
    }

    draw_mark_circle(loc,r) {
        const color = "#f00";
        const line_width = 1;
        this.draw_arc(loc, r, color, line_width);
    }

    draw_mark_line(loc1, loc2) {
        const color = "#f00";
        const line_width = 1;
        this.draw_line(loc1, loc2, color, line_width);
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