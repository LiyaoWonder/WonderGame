class SceneTitle extends WonderScene {
    constructor(game) {
        super(game)
        var labelA = new WonderLabel(game, "Game Start", "40px serif", "green", 140, 200)
        var labelB = new WonderLabel(game, "Press Enter", "20px serif", "green", 190, 300)

        this.addElement(labelA)
        this.addElement(labelB)

        game.registerAction('Enter', function() {
            var scene = new Scene(game)
            game.replaceScene(scene)
        } )

        var ps = new WonderParticleSystem(game)
        this.addElement(ps)

        var w = new WonderAnimation(game)
        w.x = 100
        w.y = 200
        this.w = w
        this.addElement(w)
        this.setupInputs()
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
        // registerAction 是鼠标按下去的状态
        self.game.registerAction('a', function(keyStatus){
            log('aaaaaaaa')
            self.w.move(-5, keyStatus)
        })
        self.game.registerAction('d', function(keyStatus){
            self.w.move(5, keyStatus)
        })
    }
}
