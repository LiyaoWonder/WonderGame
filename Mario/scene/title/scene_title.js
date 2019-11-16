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
}
