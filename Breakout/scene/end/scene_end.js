var SceneEnd = function(game) {
    var s = {
        game: game,
    }

    s.draw = function() {
        game.context.font = "40px serif"
        game.context.fillStyle = "red"
        game.context.fillText("Game Over", 110, 200)
        game.context.font = "20px serif"
        game.context.fillStyle = "red"
        game.context.fillText("Press r to restart", 140, 300)
    }

    s.update = function() {

    }

    s.game.registerAction('r', function() {
        var scene = SceneTitle(game)
        game.replaceScene(scene)
    } )

    return s
}
