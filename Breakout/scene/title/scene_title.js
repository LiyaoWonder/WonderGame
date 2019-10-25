var SceneTitle = function(game) {
    var s = {
        game: game,
    }

    s.draw = function() {
        game.context.font = "40px serif"
        game.context.fillStyle = "yellow"
        game.context.fillText("Game Start", 100, 200)
        game.context.font = "20px serif"
        game.context.fillStyle = "yellow"
        game.context.fillText("Press Enter", 150, 300)
    }

    s.update = function( ) {

    }

    s.game.registerAction('Enter', function() {
        var scene = Scene(game)
        game.replaceScene(scene)
    } )

    return s
}
