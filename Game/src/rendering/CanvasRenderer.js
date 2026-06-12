
export default class CanvasRenderer {

    constructor({ctx, width, height, graphicsConfig, pathRenderer, entityRenderer, towerRenderer, projectileRenderer}) {

        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.graphicsConfig = graphicsConfig;
        this.pathRenderer = pathRenderer;
        this.entityRenderer = entityRenderer;
        this.towerRenderer = towerRenderer;
        this.projectileRenderer = projectileRenderer;
        
    }

    render(world, gameUIState) {

        const snapshot = world.getRenderSnapshot();
        const pathRenderPoints = snapshot.path.renderPoints;
        const movementPoints = snapshot.path.movementPoints;

        this.clear();
        this.renderPath(pathRenderPoints, movementPoints);
        this.renderEntities(snapshot.entityData);
        this.renderProjectiles(snapshot.projectileData)
        this.renderTowers(snapshot.towerData);
        this.renderCurrentGrabbedTower(gameUIState);

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
                entry.showRadius,
                entry.type,
                entry.upgradeLevel
            )
        }
    }

    renderProjectiles(projectileData) {
        for (const entry of projectileData) {
            this.projectileRenderer.renderProjectile(
                this.ctx,
                entry.position,
                entry.angle,
                entry.type
            )
        }
    }

    renderCurrentGrabbedTower(gameUIState) {
        this.towerRenderer.renderGhostTower(
            this.ctx,
            gameUIState.mouseLoc,
            gameUIState.currentSelectedTowerType,
            gameUIState.towerPlacementAllowed
        )
    }
}