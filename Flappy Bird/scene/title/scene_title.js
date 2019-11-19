class Pipes {
    constructor(game) {
        this.game = game
        this.pipes = []
        this.pipeVerticalSpace = 150
        this.pipeHorizontalSpace = 200
        this.columsOfPipes = 3
        for (var i = 0; i < this.columsOfPipes; i++) {
            // p1 是倒着的 pipe
            var p1 = new WonderImg(game, 'pipe')
            p1.flipY = true
            p1.x = 500 + i * this.pipeHorizontalSpace
            var p2 = new WonderImg(game, 'pipe')
            p2.x = p1.x
            this.resetPipesPostion(p1, p2)
            this.pipes.push(p1)
            this.pipes.push(p2)
        }
    }
    resetPipesPostion(p1, p2) {
        p1.y = randomBetween(-100, 0)
        p2.y = p1.y + p1.h + this.pipeVerticalSpace
    }
    debug() {
        this.pipeHorizontalSpace = config.horizontalSpaceOfPipe.value
        this.pipeVerticalSpace = config.pipe_space.value
        log('pipeHorizontalSpace, pipeVerticalSpace', config.horizontalSpaceOfPipe.value, this.pipeVerticalSpace)
    }
    update() {
        this.debug()
        for (var i = 0; i < (this.pipes.length); i += 2) {
            var p1 = this.pipes[i]
            var p2 = this.pipes[i+1]
            p1.x -= 5
            p2.x -= 5
            if (p1.x < -100) {
                p1.x += this.pipeHorizontalSpace * this.columsOfPipes
            }
            if (p2.x < -100) {
                log('!!!!!!!!!!!', this.pipeHorizontalSpace)
                p2.x += this.pipeHorizontalSpace * this.columsOfPipes
            }
        }
    }
    draw() {
        var context = this.game.context
        for (var p of this.pipes) {
            context.save()
            var wHalf = p.w / 2
            var hHalf = p.h / 2
            // 以物体中心进行转化, 坐标系的原点放在 物体中心
            context.translate(p.x + wHalf, p.y + hHalf)
            var scaleX = p.flipX ? -1 : 1
            var scaleY = p.flipY ? -1 : 1
            // scale 是在操作坐标系
            context.scale(scaleX, scaleY)
            context.rotate(p.rotation * Math.PI / 180)
            context.translate(-wHalf, -hHalf)
            context.drawImage(p.texture, 0,  0)
            // 画完之后恢复坐标系
            context.restore()
        }
    }
}


class SceneTitle extends WonderScene {
    constructor(game) {
        super(game)
        // var labelA = new WonderLabel(game, "Game Start", "40px serif", "green", 140, 200)
        // var labelB = new WonderLabel(game, "Press Enter", "20px serif", "green", 190, 300)
        //
        // this.addElement(labelA)
        // this.addElement(labelB)

        // game.registerAction('Enter', function() {
        //     var scene = new Scene(game)
        //     game.replaceScene(scene)
        // } )

        // var ps = new WonderParticleSystem(game)
        // this.addElement(ps)

        // bg
        var bg = new WonderImg(game, 'bg')
        this.addElement(bg)

        // 加入水管
        this.pipe = new Pipes(game)
        this.addElement(this.pipe)

        // 循环滚动的地面
        // bg w=288 base w=24 at least 12 所以选个 20张
        // 找一个变量储存一下 图片
        this.grounds = []
        for (var i = 0; i < 20; i++) {
            var g = new WonderImg(game, 'ground')
            g.x = i * 24
            g.y = 400
            this.addElement(g)
            this.grounds.push(g)
        }
        this.skipCount = 4

        this.birdSpeed = 5
        var bird = new WonderAnimation(game)
        bird.x = 100
        bird.y = 200
        this.bird = bird
        this.addElement(bird)
        this.setupInputs()

    }
    debug() {
        this.birdSpeed = config.bird_speed.value
    }
    update() {
        super.update()
        // 地面移动
        this.skipCount--
        var offset = -5
        if (this.skipCount == 0) {
            this.skipCount = 4
            offset = 15
        }
        for (var i = 0; i < 20; i++) {
            var g = this.grounds[i]
            g.x += offset
        }
    }
    draw() {
        // this.game.context.font = "40px serif"
        // this.game.context.fillStyle = "green"
        // this.game.context.fillText("Game Start", 140, 200)
        // this.game.context.font = "20px serif"
        // this.game.context.fillStyle = "green"
        // this.game.context.fillText("Press Enter", 190, 300)

        // 要不没有 draw 要不就是 super.draw() 否则就是覆盖
        super.draw()
    }
    setupInputs() {
        log('SceneTitle setupInputs')
        // 访问不到 this 回调中无法使用 this
        var self = this
        var bird = this.bird
        // registerAction 是鼠标按下去的状态
        self.game.registerAction('a', function(keyStatus){
            self.bird.move(-self.birdSpeed, keyStatus)
        })
        self.game.registerAction('d', function(keyStatus){
            self.bird.move(self.birdSpeed, keyStatus)
        })
        // space 编码为 空
        self.game.registerAction(' ', function(keyStatus){
            bird.jump()
        })
    }
}
