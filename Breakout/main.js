var loadLevel = function(game, n){
    n = n - 1
    var level = levels[n]
    // log('level', level)
    var blocks = []
    for (var j = 0; j < level.length; j++) {
        var p = level[j]
        // log('p=', p)
        var b = Block(game, p)
        // log('b=', b)
        blocks.push(b)
    }
    return blocks
}

var blocks = []
var enableDebugMode = function(game, enable) {
    if (!enable) {
        return
    }

    // pause 用 register 有点问题
    window.pause = false

    window.addEventListener('keydown', function(event){
        // event.key 写太多可以提取出来
        if (event.key == 'ArrowDown') {
            window.pause = !window.pause
        } else if ('12345678'.includes(event.key)) {
            // 临时载入关卡功能
            blocks = loadLevel(game, Number(event.key))
        }
        // else if (event.key == '2') {
        //     blocks = loadLevel(2)
        // }
    })

    // 控制速度
    // 给 input 绑定事件
    document.querySelector('#id-input-speed').addEventListener('input', function(event) {
        var input = event.target
        // 看一下事件
        // log(event, input.value)
        window.fps = Number(input.value)
    })

    // 游戏速度显示
    var fps_bar = document.getElementById('id-input-speed')
    var fps_show = document.getElementById('id-input-speed-value')
    fps_show.value = fps_bar.value
}



// 定义一个入口，在入口中初始化
var __main = function() {
    var images = {
        ball: 'ball.png',
        block: 'block.png',
        paddle: 'paddle.png',
    }
    var game = Game(30, images, function(g){
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

        game.update = function() {
            if (window.pause) {
                game.context.fillText("PAUSE", 10, 10)
                log("PAUSED")
                return
            }

            ball.move()

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

        // mouse event
        var ballEnableDrag = false
        var paddleEnableDrag = false
        var blockEnableDrag = false
        game.canvas.addEventListener('mousedown', function(event){
            log(event)
            var x = event.layerX
            var y = event.layerY
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

        game.draw = function() {
            // context.drawImage(paddle.image, 0, 0, paddle.width, paddle.height, paddle.x, paddle.y, paddle.width, paddle.height)
            // 再封装
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

    })

    enableDebugMode(game, true)


}


__main()
