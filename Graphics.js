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

    draw_entity(loc, scale) {
        const color = "#f22";
        this.draw_rect(loc,scale,color,2);
    }

    draw_path_node(loc) {
        const size = 15;
        const color = "#333";
        this.draw_rect(loc.x,loc.y,size,size,color,1);
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

    draw_line(loc1,loc2,color,line_width) {
        const {ctx} = this;
        ctx.strokeStyle = color;
        ctx.lineWidth = line_width;
        ctx.beginPath();
        ctx.moveTo(loc1.x, loc1.y);
        ctx.lineTo(loc2.x, loc2.y);
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

    draw_rect(loc, scale, color, line_width) {
        const {ctx} = this;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = line_width;
        ctx.fillRect(loc.x - scale.x/2, loc.y - scale.y/2, scale.x, scale.y);
    }  
    
    draw_path(path_locs, thickness) {

        const color = "#222";
        const line_width = 2;
        const T = thickness;

        for (let i = 0; i < path_locs.length - 1; ++i) {

            const p1 = path_locs[i];
            const p2 = path_locs[i+1];
            const dir = p2.sub(p1);
            const perp = dir.normal();
            const len = dir.mag();

            const p1_right = p1.add(perp.mult(T/2)).add(dir.mult((T/2)/len));
            const p2_right = p1_right.add(dir.mult((len - T)/len));
            const p1_left = p1.sub(perp.mult(T/2)).add(dir.mult((T/2)/len));
            const p2_left = p1_left.add(dir.mult((len - T)/len));
            
            this.draw_line(p1_right, p2_right, color, line_width);
            this.draw_line(p1_left, p2_left, color, line_width);

            if (i > path_locs.length - 3) {continue;}

            // Draw path corners

            const p3 = path_locs[i+2];
            const v1 = p2.sub(p1);
            const v2 = p3.sub(p2);
            const turn_dir = v1.cross(v2);
            let c1;
            let c2;
            let c3;

            if (turn_dir < 0) { // clockwise
                c1 = p2_right;
                c2 = p2_right.add(dir.mult(T * 1/len));
                c3 = p2_left.add(dir.mult(T * 1/len));
            }
            else {  //counter-clockwise
                c1 = p2_left;
                c2 = p2_left.add(dir.mult(T * 1/len));
                c3 = p2_right.add(dir.mult(T * 1/len));
            }

            this.draw_line(c1, c2, color, line_width);
            this.draw_line(c2, c3, color, line_width);
        }
    }

    // draw_path_corner(p1, p2, p3, thickness, color, line_width) {

        
    //     let c1, c2, c3;

    //     if (turn_dir < 0) { // clockwise
    //         c1 = 
    //     }
    //     else {  //counter-clockwise

    //     }

    //     this.draw_line(c1, c2, color, line_width);
    //     this.draw_line(c2, c3, color, line_width);
    // }

    grid(size) {
        const {ctx} = this;
        ctx.strokeStyle = "#ccc"
        ctx.lineWidth = 0.7;
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