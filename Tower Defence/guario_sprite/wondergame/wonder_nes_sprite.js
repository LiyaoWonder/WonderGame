class WonderNesSprite {
    constructor(game, map) {
        // constructor 中有太多的初始数据
        // 实际上应该将其拆为很多 initSetup 的小函数
        // 注意 data 是有偏移量的
        this.tileOffset = 32784
        this.data = window.bytes.slice(this.tileOffset)

        // 为了 draw 所以有 game
        this.game = game
        this.map = map
        // 为了省事，在这里 hard code 一套动画
        this.animations = {
            fly:[],
        }

        this.pixelWidth = 1
        this.rowsOfSprite = 4
        this.columnsOfSprite = 2
        this.width = this.pixelWidth * this.columnsOfSprite * 8
        this.height = this.pixelWidth * this.rowsOfSprite * 8

        this.frameIndex = 0
        this.frameCount = 3
        // 先用一个标记看看是否是翻转
        this.flipX = false
        this.rotation = 0
        this.alpha = 1
        // 重力 与 加速度
        this.gy = 10
        this.vy = 0
        // 加速 与 摩擦
        this.vx = 0
        this.mx = 0
        // 和地图相关的数据
        this.tileSize = map.tileSize
    }
    drawBlock(context, data, x, y, pixelWidth) {
        const colors = [
            'white',
            '#FF0000',
            '#FFAA4E',
            '#884400',
        ]
        let w = pixelWidth
        let h = pixelWidth
        for (let i = 0; i < 8; i++) {
            let p1 = data[i]
            let p2 = data[i + 8]
            for (let j = 0; j < 8; j++) {
                // 8 bits per line
                // 78: 0100 1110
                // 69: 0100 0101
                // 在 j 循环中 每一次 画一个像素点
                // c: color
                let c1 = (p1 >> (7 - j)) & 0b00000001
                let c2 = (p2 >> (7 - j)) & 0b00000001
                let pixel = (c2 << 1) + c1
                if (pixel == 0) {
                    continue
                }
                let color = colors[pixel]
                context.fillStyle = color
                let px = x + j * w
                let py = y + i * h
                context.fillRect(px, py, w, h)
            }
        }
    }
    drawSprite() {
        let bytesPerBlock = 16
        let dataOffset = this.frameIndex * bytesPerBlock * 8
        let data = this.data.slice(dataOffset)
        let context = this.game.context
        let pixelsPerBlock = 8
        let pixelWidth = this.pixelWidth
        let blockSize = pixelsPerBlock * pixelWidth
        let offset = 0
        for (let i = 0; i < this.rowsOfSprite; i++) {
            for (let j = 0; j < this.columnsOfSprite; j++) {
                let x = j * blockSize
                let y = i * blockSize
                let pixels = data.slice(offset)
                this.drawBlock(context, pixels, x, y, pixelWidth)
                offset += 16
            }
        }
    }
    frames() {
        return this.animations[this.animationName]
    }
    jump() {
        this.vy = -4
        // this.rotation = -45
    }
    updateGravity() {
        // 只要 Mario 在砖上就不受到重力的影响
        // 拿到角色在地图中的坐标 i j
        let i = Math.floor(this.x / this.tileSize)
        // 脚还需要加上身体的一格
        let j = Math.floor(this.y / this.tileSize) + 1
        let onTheGround = this.map.onTheGround(i, j)
        if (onTheGround && this.vy > 0) {
            this.vy = 0
        } else{
            // 更新受力
            this.y += this.vy
            this.vy += this.gy * 0.2
            // 如果陷入地面，拔出来/重置 y 位置
            let j = Math.floor(this.y / this.tileSize) + 1
            let onTheGround = this.map.onTheGround(i, j)
            if (onTheGround) {
                this.y = (j - 1) * this.tileSize
            }
            // mario 的 y
            // var h = 96
            // if (this.y > h) {
            //     this.y = h
            // }
        }
    }
    update() {
        // 更新 x 加速和摩擦
        this.vx += this.mx
        // 说明摩擦力已经把速度降至 0 以下， 停止摩擦
        if (this.vx * this.mx > 0) {
            this.vx = 0
            this.mx = 0
        } else {
            this.x += this.vx
        }
        this.updateGravity()
        this.frameCount--
        if (this.frameCount == 1) {
            this.frameCount = 4
            this.frameIndex ++
            this.frameIndex %= 3
            // this.frameIndex = (this.frameIndex + 1) % this.frames().length
            // this.texture = this.frames()[this.frameIndex]
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

        // draw mario
        this.drawSprite()
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
        // this.x += x
        // 记得乘上方向
        let speed = 0.3 * x
        if (keyStatus == 'down') {
            // if (this.vx > 8 || this.vx < -8) {
            if (Math.abs(this.vx) > 8) {
                this.vx += 0
            } else {
                this.vx += speed
            }
            // log('this.vx', this.vx)
            this.mx = -speed/2
        } else {

        }
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
