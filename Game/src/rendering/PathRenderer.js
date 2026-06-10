
export default class PathRenderer {
    constructor({config}) {
        this.config = config
    }

    renderPath(ctx, points) {

        if (!points || points.length === 0) return;

        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = this.config.PATH_WIDTH/2;
        ctx.strokeStyle = this.config.PATH_COLOR;

        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        
        for (let i = 1; i < points.length; ++i) {ctx.lineTo(points[i].x, points[i].y)}

        ctx.stroke();
    }

    renderMovementPoints(ctx, points, radius) {

        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 5;

        for (const pt of points) {
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, radius, 0, 2 * Math.PI);
            ctx.stroke();
        }
        
    }
}