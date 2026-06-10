
export default class CanvasRenderer {

    constructor({ctx, width, height, graphicsConfig, pathRenderer, entityRenderer, towerRenderer}) {

        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.graphicsConfig = graphicsConfig;
        this.pathRenderer = pathRenderer;
        this.entityRenderer = entityRenderer;
        this.towerRenderer = towerRenderer;
        
    }

    render(world) {

        const snapshot = world.getRenderSnapshot();
        const pathRenderPoints = snapshot.path.renderPoints;
        const movementPoints = snapshot.path.movementPoints;

        this.clear();
        this.renderPath(pathRenderPoints, movementPoints);
        this.renderEntities(snapshot.entityData);
        this.renderTowers(snapshot.towerData);

    }   

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    renderPath(pathRenderPoints, movementPoints) {
        this.pathRenderer.renderPath(this.ctx, pathRenderPoints);
        if (this.graphicsConfig.SHOW_MOVEMENT_POINTS) {
            this.pathRenderer.renderMovementPoints(
                this.ctx, 
                movementPoints,
                this.graphicsConfig.MOVEMENT_POINT_RADIUS
            );
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