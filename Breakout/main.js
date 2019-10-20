var loadLevel = function(n){
    n = n - 1
    var level = levels[n]
    log('level', level)
    var blocks = []
    for (var j = 0; j < level.length; j++) {
        var p = level[j]
        log('p=', p)
        var b = Block('block2.png', p)
        log('b=', b)
        blocks.push(b)
    }
    return blocks
}

var blocks = loadLevel(1)
var enableDebugMode = function(mode) {
    if (!mode) {
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
            blocks = loadLevel(Number(event.key))
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
    var paddle = Paddle('paddle.png')
    var ball = Ball('ball4.png')
    var game = Game()
    var score = 0


    var yValue = 30


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

    enableDebugMode(true)

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
        if (ball.y > 500) {
            log("You are dead")
            var i = 24
            for (var j = 0; j < blocks.length; j ++) {
                if (blocks[j].alive) {
                    i -= 1;
                }
            }
            // log(i)
            window.pause = true
        }
    }

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
        game.context.fillText("Score:" + score, 10, 450)

    }

}


__main()
