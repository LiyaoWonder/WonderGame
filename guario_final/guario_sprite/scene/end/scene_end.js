class SceneEnd extends WonderScene {
    constructor(game) {
        super(game)
        game.registerAction('r', function() {
            var scene = new SceneTitle(game)
            game.replaceScene(scene)
        } )
    }
    draw() {
        this.game.context.font = "40px serif"
        this.game.context.fillStyle = "red"
        this.game.context.fillText("Game Over", 110, 200)
        this.game.context.font = "20px serif"
        this.game.context.fillStyle = "red"
        this.game.context.fillText("Press r to restart", 140, 300)
    }
}
