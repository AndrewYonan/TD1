
export default class CanvasRenderer {

    constructor({ctx, width, height, graphicsConfig}) {

        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.graphicsConfig = graphicsConfig;
        this.pathRes = graphicsConfig.PATH_RENDER_RES;
        this.PI = 3.1415;
        
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
        
        this.renderEntities(snapshot.entities);
    }   

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    renderPath(locs) {

        this.ctx.lineCap = "round";
        this.ctx.lineJoin = "round";
        this.ctx.lineWidth = this.graphicsConfig.PATH_WIDTH/2;
        this.ctx.strokeStyle = this.graphicsConfig.PATH_COLOR;

        this.ctx.beginPath();
        this.ctx.moveTo(locs[0].x, locs[0].y);
        
        for (let i = 1; i < locs.length; ++i) {this.ctx.lineTo(locs[i].x, locs[i].y)}

        this.ctx.stroke();
    }

    renderMovementPoints(pts) {

        this.ctx.strokeStyle = "#fff";
        this.ctx.lineWidth = 5;

        const r = this.graphicsConfig.MOVEMENT_POINT_RADIUS;

        for (const pt of pts) {
            this.ctx.beginPath();
            this.ctx.arc(pt.x, pt.y, r, 0, 2*this.PI);
            this.ctx.stroke();
        }
        
    }

    renderEntities(entities) {
        for (const entity of entities) {
            this.renderEntity(entity);
        }
    }

    renderEntity(entity) {
    
    }
}