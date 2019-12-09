class WonderImg {
    constructor(game, name) {
        this.game = game
        this.name = name
        this.texture = game.textureByName(name)
        this.x = 0
        this.y = 0
        this.w = this.texture.width
        this.h = this.texture.height
        this.flipY = false
        this.rotation = 0
    }
    clone() {
        let c = new WonderImg(this.game, this.name)
        c.x = this.x
        c.y = this.y
        return c
    }
    pointInFrame(x, y) {
        let xIn = (x >= this.x) && (x <= this.x + this.w)
        let yIn = (y >= this.y) && (y <= this.y + this.h)
        return xIn && yIn
    }
    draw() {
        this.game.drawImage(this)
    }
    update() {

    }
}
// 逻辑上不应该继承 WonderImg 但暂时先这么做
class player extends WonderImg {
    constructor(game, name) {
        super(game, name)

    }
}
