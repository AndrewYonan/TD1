class Vector2 {
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
        return this.div(this.mag());
    }
    mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    manhattan_mag() {
        return Math.abs(this.x) + Math.abs(this.y);
    }
}

function dist(v1, v2) {
    return (v1.sub(v2)).mag();
}