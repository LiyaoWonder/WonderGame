class SceneTitle extends WonderScene {
    constructor(game) {
        super(game)
        game.registerAction('Enter', function() {
            var scene = Scene(game)
            game.replaceScene(scene)
        } )
    }
    draw() {
        this.game.context.font = "40px serif"
        this.game.context.fillStyle = "yellow"
        this.game.context.fillText("Game Start", 100, 200)
        this.game.context.font = "20px serif"
        this.game.context.fillStyle = "yellow"
        this.game.context.fillText("Press Enter", 150, 300)
    }
}
