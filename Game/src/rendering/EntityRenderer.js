
export default class EntityRenderer {
    constructor({config}) {
        this.config = config;
    }

    renderEntity(ctx, position, rank) {

        const color = this.config[rank].color;
        const size = this.config[rank].size;

        ctx.lineWidth = 1;
        ctx.fillStyle = color;
        ctx.strokeStyle = "#fff";
        ctx.beginPath();
        ctx.arc(position.x, position.y, size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();

    }
}