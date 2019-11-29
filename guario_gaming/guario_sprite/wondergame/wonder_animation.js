class WonderAnimation {
    constructor(game) {
        // 为了 draw 所以有 game
        this.game = game
        // 为了省事，在这里 hard code 一套动画
        this.animations = {
            fly:[],
        }
        for (var i = 1; i < 4; i++) {
            var name = `fly${i}`
            var t = game.textureByName(name)
            this.animations['fly'].push(t)
        }
        this.animationName = 'fly'
        this.texture = this.frames()[0]
        this.width = this.texture.width
        this.height = this.texture.height
        this.frameIndex = 0
        this.frameCount = 3
        // 先用一个标记看看是否是翻转
        this.flipX = false
        this.rotation = 0
        this.alpha = 1
        // 重力 与 加速度
        this.gy = 10
        this.vy = 0
    }
    frames() {
        return this.animations[this.animationName]
    }
    jump() {
        this.vy = -10
        this.rotation = -45
    }
    update() {
        // 跟新 alpha
        if (this.alpha > 0) {
            this.alpha -= 0.05
        }
        // 更新受力
        this.y += this.vy
        this.vy += this.gy * 0.2
        // base - bird height
        var h = 380
        if (this.y > h) {
            this.y = h
        }
        // 更新角度
        if (this.rotation < 45) {
            this.rotation += 5
        }
        this.frameCount--
        if (this.frameCount == 1) {
            this.frameCount = 3
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }
    }

    draw() {
        var context = this.game.context
        context.save()
        var wHalf = this.width / 2
        var hHalf = this.height / 2
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

    move(x, keyStatus) {
        // if (x < 0) {
        //     this.flipX = true
        // } else {
        //     this.flipX = false
        // }
        this.flipX = (x < 0)
        this.x += x
        // log('keyStatus', keyStatus)
        // if (keyStatus == 'down') {
        //     this.changeAnimation('walk')
        // } else if (keyStatus == 'up') {
        //     this.changeAnimation('idle')
        // }
        // 一定有比 if else 更好的写法
        // var animationNames = {
        //     down: 'walk',
        //     up: 'idle',
        // }
        // var name = animationNames[keyStatus]
        // this.changeAnimation(name)

    }

    changeAnimation(name) {
        this.animationName = name
    }
}
