class Vector {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    distance(vector) {
        let v = vector
        let dx = v.x - this.x
        let dy = v.y - this.y
        return Math.sqrt(dx * dx + dy * dy)
    }
    sub(vector) {
        let v = vector
        let dx = this.x - v.x
        let dy = this.y - v.y
        return new Vector(dx, dy)
    }
    // distance 求两点之间的距离 需要求自身的距离 length
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }
    // 需要单位向量 需要normal
    normal() {
        let f = this.length(this) / 1
        let v = new Vector(this.x / f, this.y / f)
        return v
    }
}