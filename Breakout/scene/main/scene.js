var Scene = function(game) {
    var s = {
        game: game,
    }
    // initial
    var paddle = Paddle(game)
    var ball = Ball(game)

    var score = 0

    blocks = loadLevel(game, 1)

    game.registerAction('ArrowLeft', function() {
        paddle.moveLeft()
        paddle.leftBoundary()
    })
    game.registerAction('ArrowRight', function() {
        paddle.moveRight()
        paddle.rightBoundary()
    })
    game.registerAction('ArrowUp', function() {
        ball.fire()
    })

    // game.registerAction('i', function() {
    //     log('rrrrrrrrr')
    //     game.context.font = "30px serif"
    //     game.context.fillStyle = "white"
    //     game.context.fillText("Edit your Game Level", 110, 200)
    // })


    s.draw = function() {
        game.image(paddle)
        game.image(ball)
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            // log('draw block', block)
            if (block.alive) {
                game.image(block)
            }
        }
        // draw label
        game.context.font = "20px serif"
        game.context.fillStyle = "white"
        game.context.fillText("Score:" + score, 10, 480)
    }

    // mouse event
    var ballEnableDrag = false
    var paddleEnableDrag = false
    var blockEnableDrag = false
    game.canvas.addEventListener('mousedown', function(event){
        log(event)
        var x = event.layerX
        var y = event.layerY
        block_pos = [x, y]
        log('block_pos', block_pos)
        var currentLevel = blocks
        log('currentLevel', currentLevel)
        currentLevel.push(block_pos)
        // blocks = loadLevel(game, 1)

        // 检查是否点中了 ball
        if (ball.hasPoint(x, y)) {
            // 设置拖拽状态
            log(x, y, 'Drag')
            ballEnableDrag = true
        } else if (paddle.hasPoint(x, y)) {
            paddleEnableDrag = true
        }

        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            // log('block', block)
            if (block.hasPoint(x, y)) {
                block.blockEnableDrag = true
            }
        }
    })

    game.canvas.addEventListener('mousemove', function(event){
        var x = event.offsetX
        var y = event.offsetY
        if (ballEnableDrag) {
            log('Move', x, y)
            ball.x = x
            ball.y = y
        } else if (paddleEnableDrag) {
            paddle.x = x
            paddle.y = y
        }
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            // log('block', block)
            if (block.blockEnableDrag) {
                block.x = x
                block.y = y
            }
        }


    })

    game.canvas.addEventListener('mouseup', function(event){
        ballEnableDrag = false
        paddleEnableDrag = false
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            // log('block', block)
            block.blockEnableDrag = false

        }

    })

    s.update = function() {
        if (window.pause) {
            game.context.fillText("PAUSE", 10, 10)
            log("PAUSED")
            return
        }

        ball.move()

        if (ball.y > paddle.y + paddle.height) {
            var end = new SceneEnd(game)
            game.replaceScene(end)
        }

        if (paddle.collide(ball)) {
            ball.rebound()
        }

        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            // log('block', block)
            if (block.collide(ball)) {
                log('kill')
                block.kill()
                ball.rebound()
                score += 100
            }
        }
    }

    return s
}
