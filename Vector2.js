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
    dot(vec) {
        return this.x * vec.x + this.y * vec.y;
    }
    mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}