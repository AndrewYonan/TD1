export default class Vector2 {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
    add(vec) {
        return new Vector2(this.x + vec.x, this.y + vec.y);
    }
    sub(vec) {
        return new Vector2(this.x - vec.x, this.y - vec.y);
    }
    mult(a) {
        return new Vector2(this.x * a, this.y * a);
    }
    div(a) {
        return new Vector2(this.x / a, this.y / a);
    }
    normal() {
        return new Vector2(-this.y, this.x).normalized();
    }
    cross(vec) {
        return this.x * vec.y - vec.x * this.y;
    }
    dot(vec) {
        return this.x * vec.x + this.y * vec.y;
    }
    normalized() {
        const m = this.mag();
        if (m === 0) return new Vector2(0,0);
        return this.div(m);
    }
    mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    manhattanMag() {
        return Math.abs(this.x) + Math.abs(this.y);
    }
}