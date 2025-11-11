class Graphics {
    
    constructor(ctx) {
        this.ctx = ctx;
        this.pixel_ratio = 1;
        this.camera = {x : 0, y: 0};
    }

    clear_canvas() {
        const {ctx} = this;
        ctx.clearRect(0,0,W,H);
    }

    draw_entity(x,y) {
        const size = 20;
        const color = "#f22";
        this.draw_rect(x,y,size,size,color,1);
    }

    draw_path_node(x,y) {
        const size = 15;
        const color = "#333";
        this.draw_rect(x,y,size,size,color,1);
    }

    draw_mark(x,y) {
        const radius = 20
        this.draw_arc(x,y,radius);
    }

    draw_line(x1,y1,x2,y2) {
        const {ctx} = this;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }


    draw_arc(x, y, radius) {
        const {ctx} = this;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.stroke();
    }

    draw_rect(x, y, x_size, y_size, color, line_width) {
        const {ctx} = this;
        ctx.strokeStyle = color;
        ctx.lineWidth = line_width;
        ctx.strokeRect(x - x_size/2, y - y_size/2, x_size, y_size);
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







