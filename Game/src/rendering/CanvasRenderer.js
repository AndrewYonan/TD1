
export default class CanvasRenderer {

    constructor({ctx, width, height, graphicsConfig, entityRenderer, towerRenderer}) {

        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.graphicsConfig = graphicsConfig;
        this.entityRenderer = entityRenderer;
        this.towerRenderer = towerRenderer;
        
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
        this.renderTowers(snapshot.towerData);
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
            this.entityRenderer.renderEntity(
                this.ctx,
                entry.position, 
                entry.rank
            );
        }
    }


    renderTowers(towerData) {
        for (const entry of towerData) {
            this.towerRenderer.renderTower(
                this.ctx,
                entry.position,
                entry.angle,
                entry.type
            )
        }
    }
}