
// mouse event
var mouse = function(game) {
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

}
