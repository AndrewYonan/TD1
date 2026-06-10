
export default class ProjectileRenderer {
    constructor({config}) {
        this.config = config;
    }

    renderProjectile(ctx, position, angle, type) {
        if (type === "unit") {
            this.renderUnitBullet(ctx, position, angle);
        }
    }

    renderUnitBullet(ctx, position, angle) {

        const length = this.config["unit"].length;
        const thickness = this.config["unit"].thickness;
        const color = this.config["unit"].main;

        ctx.fillStyle = color;
        ctx.lineWidth = 1;
        
        ctx.save();
        ctx.translate(position.x, position.y);
        ctx.rotate(angle);

        //====================

        ctx.beginPath();   
        ctx.rect(-length/2, -thickness/2, length, thickness);
        ctx.fill();

        //====================

        ctx.restore();
    }
}