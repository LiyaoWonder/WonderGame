var SceneEnd = function(game) {
    var s = {
        game: game,
    }

    s.draw = function() {
        game.context.font = "40px serif"
        game.context.fillStyle = "red"
        game.context.fillText("Game Over", 100, 200)
    }

    s.update = function() {

    }

    return s
}
