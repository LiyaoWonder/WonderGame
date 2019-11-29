class WonderImg {
    constructor(game, name) {
        this.game = game
        this.texture = game.textureByName(name)
        this.x = 0
        this.y = 0
        this.w = this.texture.width
        this.h = this.texture.height
        this.flipY = false
        this.rotation = 0
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
