
export default class CanvasRenderer {

    constructor({ctx, width, height, graphicsConfig}) {

        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.graphicsConfig = graphicsConfig;
        
    }

    render(world) {

        const snapshot = world.getRenderSnapshot();
        const pathRenderPoints = snapshot.path.renderPoints;
        const movementPoints = snapshot.path.movementPoints;

        this.clear();
        this.renderPath(pathRenderPoints);

        if (this.graphicsConfig.SHOW_MOVEMENT_POINTS) {
            this.renderMovementPoints(movementPoints);
        }
        
        this.renderEntities(snapshot.entityData);
    }   

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    renderPath(points) {

        if (!points || points.length === 0) return;

        this.ctx.lineCap = "round";
        this.ctx.lineJoin = "round";
        this.ctx.lineWidth = this.graphicsConfig.PATH_WIDTH/2;
        this.ctx.strokeStyle = this.graphicsConfig.PATH_COLOR;

        this.ctx.beginPath();
        this.ctx.moveTo(points[0].x, points[0].y);
        
        for (let i = 1; i < points.length; ++i) {this.ctx.lineTo(points[i].x, points[i].y)}

        this.ctx.stroke();
    }

    renderMovementPoints(pts) {

        this.ctx.strokeStyle = "#fff";
        this.ctx.lineWidth = 5;

        const r = this.graphicsConfig.MOVEMENT_POINT_RADIUS;

        for (const pt of pts) {
            this.ctx.beginPath();
            this.ctx.arc(pt.x, pt.y, r, 0, 2 * Math.PI);
            this.ctx.stroke();
        }
        
    }

    renderEntities(entityData) {
        for (const entry of entityData) {
            this.renderEntity(
                entry.position, 
                entry.rank);
        }
    }

    renderEntity(position, rank) {

        const color = this.graphicsConfig.ENTITY_RANK_APPEARENCE[rank].color;
        const size = this.graphicsConfig.ENTITY_RANK_APPEARENCE[rank].size;

        this.ctx.lineWidth = 1;
        this.ctx.fillStyle = color;
        this.ctx.strokeStyle = "#fff";
        this.ctx.beginPath();
        this.ctx.arc(position.x, position.y, size, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.stroke();
    }
}