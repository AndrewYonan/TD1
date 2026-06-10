
export default class TowerRenderer {
    constructor({config}) {
        this.config = config
    }

    renderTower(ctx, position, angle, type) {
        if (type === "unit") {
            this.renderUnitTower(ctx, position, angle);
        } 
    }

    renderUnitTower(ctx, position, angle) {

        const N = 3;
        const M = 10;
        const unitConfig = this.config["unit"];
        const main = unitConfig.main;
        const accent = unitConfig.accent;
        const size = unitConfig.size;
        const barrelRadius = unitConfig.barrelRadius;
        const barrelLength = unitConfig.barrelLength;

        ctx.fillStyle = main;
        ctx.strokeStyle = accent;
        ctx.lineWidth = 1;

        ctx.fillStyle = accent;
        ctx.beginPath();
        ctx.rect(position.x + size - M, position.y - barrelRadius/2, barrelLength, barrelRadius/4)
        ctx.stroke();
        ctx.fill();

        ctx.beginPath();
        ctx.rect(position.x + size - M, position.y + barrelRadius/4, barrelLength, barrelRadius/4)
        ctx.stroke();
        ctx.fill();

        ctx.fillStyle = main;
        ctx.beginPath();
        ctx.arc(position.x, position.y, size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();

        ctx.lineWidth = 7;
        ctx.lineCap = "square";

        ctx.beginPath();
        ctx.arc(position.x, position.y, size, Math.PI/6, 3 * Math.PI/4);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(position.x, position.y, size, 7 * Math.PI/6, 11 * Math.PI/6);
        ctx.stroke();

    }
}