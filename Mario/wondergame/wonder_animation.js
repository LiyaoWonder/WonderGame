class WonderAnimation {
    constructor(game) {
        this.game = game
        // 为了省事，在这里 hard code 一套动画
        this.frames = []
        for (var i = 1; i < 4; i++) {
            log('loop')
            var name = `walk${i}`
            var t = game.textureByName(name)
            this.frames.push(t)
        }
        this.texture = this.frames[0]
        this.frameIndex = 0
        this.frameCount = 10
    }

    update() {
        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = 10
            this.frameIndex = (this.frameIndex + 1) % this.frames.length
            this.texture = this.frames[this.frameIndex]
        }
    }

    draw() {
        log('draw')
        this.game.drawImage(this)
    }

}
