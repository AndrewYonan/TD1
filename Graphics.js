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

            let p1 = path_locs[i];
            let p2 = path_locs[i+1];

            this.draw_line(p1, p2, color, line_width);
            
        }
    }

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