class SceneEditor extends WonderScene {
    constructor(game) {
        super(game)
        // bg
        // var bg = new WonderImg(game, 'bg')
        // this.addElement(bg)
        // tile map
        let map = new GuaTileMap(game)
        this.addElement(map)
        // 循环滚动的地面
        // bg w=288 base w=24 at least 12 所以选个 20张
        // 找一个变量储存一下 图片
        // this.grounds = []
        // for (var i = 0; i < 20; i++) {
        //     var g = new WonderImg(game, 'ground')
        //     g.x = i * 24
        //     g.y = 400
        //     this.addElement(g)
        //     this.grounds.push(g)
        // }
        // this.skipCount = 4

        // mario
        let mario = new WonderNesSprite(game, map)
        this.addElement(mario)
        this.mario = mario
        mario.x = 100
        mario.y = 336
        this.setupInputs()

    }
    debug() {
        this.birdSpeed = config.bird_speed.value
    }
    update() {
        super.update()
        // 地面移动
        // this.skipCount--
        // var offset = -5
        // if (this.skipCount == 0) {
        //     this.skipCount = 4
        //     offset = 15
        // }
        // for (var i = 0; i < 20; i++) {
        //     var g = this.grounds[i]
        //     g.x += offset
        // }
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
        var mario = this.mario
        // registerAction 是鼠标按下去的状态
        self.game.registerAction('a', function(keyStatus){
            self.mario.move(-self.birdSpeed, keyStatus)
        })
        self.game.registerAction('d', function(keyStatus){
            self.mario.move(self.birdSpeed, keyStatus)
        })
        // space 编码为 空
        self.game.registerAction(' ', function(keyStatus){
            mario.jump()
        })
    }
}
