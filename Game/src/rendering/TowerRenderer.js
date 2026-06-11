
export default class TowerRenderer {
    constructor({config}) {
        this.config = config
    }

    renderTower(ctx, position, angle, radius, showRadius, type) {
        if (type === "unit") {
            this.renderUnitTower(ctx, position, angle, radius, showRadius);
        } 
    }

    renderUnitTower(ctx, position, angle, radius, showRadius) {

        const M = 10;
        const unitConfig = this.config["unit"];
        const main = unitConfig.main;
        const accent = unitConfig.accent;
        const field = unitConfig.rangeField;
        const size = unitConfig.size;
        const barrelRadius = unitConfig.barrelRadius;
        const barrelLength = unitConfig.barrelLength;

        ctx.fillStyle = accent;
        ctx.strokeStyle = accent;
        ctx.lineWidth = 1;

        if (showRadius) {
            ctx.fillStyle = field;
            ctx.beginPath();
            ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI);
            ctx.fill();
        }

        ctx.fillStyle = main;
        
        ctx.save();
        ctx.translate(position.x, position.y);
        ctx.rotate(angle);

        //==========================
        
        ctx.beginPath();
        ctx.rect(0 + size - M, 0 - barrelRadius/2, barrelLength, barrelRadius/4)
        ctx.stroke();
        ctx.fill();

        ctx.beginPath();
        ctx.rect(0 + size - M, 0 + barrelRadius/4, barrelLength, barrelRadius/4)
        ctx.stroke();
        ctx.fill();

        ctx.fillStyle = main;
        ctx.beginPath();
        ctx.arc(0, 0, size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();

        ctx.lineWidth = 7;
        ctx.lineCap = "square";

        ctx.beginPath();
        ctx.arc(0, 0, size, Math.PI/6, 3 * Math.PI/4);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, size, 7 * Math.PI/6, 11 * Math.PI/6);
        ctx.stroke();

        //==========================

        ctx.restore();

    }
}