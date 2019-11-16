class WonderAnimation {
    constructor(game) {
        // 为了 draw 所以有 game
        this.game = game
        // 为了省事，在这里 hard code 一套动画
        this.animations = {
            idle: [],
            walk: [],
        }
        for (var i = 1; i < 4; i++) {
            var name = `idle${i}`
            var t = game.textureByName(name)
            this.animations['idle'].push(t)
        }
        for (var i = 1; i < 4; i++) {
            var name = `walk${i}`
            var t = game.textureByName(name)
            this.animations['walk'].push(t)
        }
        this.animationName = 'idle'
        this.texture = this.frames()[0]
        this.width = this.texture.width
        this.height = this.texture.height
        this.frameIndex = 0
        this.frameCount = 10
        // 先用一个标记看看是否是翻转
        this.flipX = false
    }
    frames() {
        return this.animations[this.animationName]
    }
    update() {
        this.frameCount--
        if (this.frameCount == 1) {
            this.frameCount = 10
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }
    }

    draw() {
        var context = this.game.context
        if (this.flipX) {
            context.save()
            var x = this.x + this.width / 2
            context.translate(x, 0)
            context.scale(-1, 1)
            context.translate(-x, 0)
            context.drawImage(this.texture, this.x, this.y)
            context.restore()
        } else {
            context.drawImage(this.texture, this.x, this.y)
        }
    }

    move(x, keyStatus) {
        // if (x < 0) {
        //     this.flipX = true
        // } else {
        //     this.flipX = false
        // }
        this.flipX = (x < 0)
        this.x += x
        log('keyStatus', keyStatus)
        // if (keyStatus == 'down') {
        //     this.changeAnimation('walk')
        // } else if (keyStatus == 'up') {
        //     this.changeAnimation('idle')
        // }
        // 一定有比 if else 更好的写法
        var animationNames = {
            down: 'walk',
            up: 'idle',
        }
        var name = animationNames[keyStatus]
        this.changeAnimation(name)

    }

    changeAnimation(name) {
        this.animationName = name
    }
}
