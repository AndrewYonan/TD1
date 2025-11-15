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

    draw_bezier_control_point(loc, bound_to_mouse) {
        let line_width = (bound_to_mouse) ? 4 : 1;
        let color = (bound_to_mouse) ? "#000" : "#333";
        const r = CURSOR_RAD;
        this.draw_arc(loc, r, color, line_width);
    }

    draw_bezier_curve_point(loc) {
        const color = "#f55";
        const line_width = 3;
        const r = 5;
        this.draw_arc(loc, r, color, line_width);
    }

    draw_bezier_curve_segment(p1, p2) {
        this.draw_line(p1, p2, "#f33", 4);
    }

    draw_bezier_skeleton_line(p1, p2) {

        const color = "#aaa";
        const line_width = 2;
        const dash_l = 4;
        
        let dir = p2.sub(p1)
        const len = dir.mag();
        dir = dir.div(len);

        for (let i = 0; i < Math.floor(len / dash_l); ++i) {
            if (i % 2 == 0) {
                const c1 = p1.add(dir.mult(i * dash_l));
                const c2 = p1.add(dir.mult((i + 1) * dash_l));
                this.draw_line(c1, c2, color, line_width);
            }
        }

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
        ctx.strokeStyle = "#ddd"
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