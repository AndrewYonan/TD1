
export default class TowerRenderer {
    constructor({towerGraphicsConfig, towerConfig}) {
        this.towerGraphicsConfig = towerGraphicsConfig
        this.towerConfig = towerConfig;
    }

    renderTower(ctx, position, angle, showRadius, type, upgradeLevel) {
        if (type === "unit") {
            this.renderUnitTower(ctx, position, angle, upgradeLevel, showRadius);
        } 
    }

    renderGhostTower(ctx, position, type) {
        if (type === "unit") {
            this.renderUnitTower(ctx, position, 0, 0, true);
        }
    }

    renderUnitTower(ctx, position, angle, upgradeLevel, showRadius) {

        const M = 10;
        const graphicsConfig = this.towerGraphicsConfig["unit"];
        const main = graphicsConfig.main;
        const accent = graphicsConfig.accent;
        const field = graphicsConfig.rangeField;
        const size = graphicsConfig.size;
        const barrelRadius = graphicsConfig.barrelRadius;
        const barrelLength = graphicsConfig.barrelLength;
        const radius = this.towerConfig["unit"][upgradeLevel].range;

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