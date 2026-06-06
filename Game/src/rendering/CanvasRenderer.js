
export default class CanvasRenderer {

    constructor({ctx, width, height}) {

        this.ctx = ctx;
        this.width = width;
        this.height = height;
        
    }

    render(world) {

        const snapshot = world.getRenderSnapshot();

        this.clear();
        this.renderPath(snapshot.gamePathPoints);
        this.renderEntities(snapshot.entities);
    }   

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    renderPath(locs) {

        this.ctx.lineCap = "round";
        this.ctx.lineJoin = "round";
        this.ctx.lineWidth = this.PATH_WIDTH/2;
        this.ctx.strokeStyle = this.PATH_COLOR;

        this.ctx.beginPath();
        this.ctx.moveTo(locs[0].x, locs[0].y);
        
        for (let i = 1; i < locs.length; ++i) {this.ctx.lineTo(locs[i].x, locs[i].y)}

        this.ctx.stroke();
    }

    renderEntities(entities) {
        for (const entity of entities) {
            this.renderEntity(entity);
        }
    }

    renderEntity(entity) {
    
    }
}