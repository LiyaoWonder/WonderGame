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
        this.flipX = true
        this.rotation = 0
    }
    center() {
        let x = this.x + this.w / 2
        let y = this.y + this.h / 2
        return new Vector(x, y)
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
        // this.game.drawImage(this)

        let context = this.game.context
        context.save()
        let wHalf = this.w / 2
        let hHalf = this.h / 2
        // 以物体中心进行转化, 坐标系的原点放在 物体中心
        context.translate(this.x + wHalf, this.y + hHalf)
        if (this.flipX) {
            // scale 是在操作坐标系
            context.scale(-1, 1)
        }
        context.globalAlpha = this.alpha
        context.rotate(this.rotation * Math.PI / 180)
        context.translate(-wHalf, -hHalf)
        context.drawImage(this.texture, 0,  0)
        // 画完之后恢复坐标系
        context.restore()
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
