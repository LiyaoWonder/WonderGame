class Scene extends WonderScene {
    constructor(game) {
        super(game)

        // game.registerAction('Enter', function() {
        //     var scene = Scene(game)
        //     game.replaceScene(scene)
        // } )

        this.setup()
    }

    setup() {
        this.bg = new WonderImg(this.game, 'sky')
        this.player = new WonderImg(this.game, 'player')
        this.bomb = new WonderImg(this.game, 'bomb')
        this.player.x = 70
        this.player.y = 500

        this.game.registerAction('ArrowLeft', function() {
                paddle.moveLeft()
                paddle.leftBoundary()
            })
        this.game.registerAction('ArrowRight', function() {
            paddle.moveRight()
            paddle.rightBoundary()
        })
        this.game.registerAction('ArrowUp', function() {
            ball.fire()
        })

        this.addElement(this.bg)
        this.addElement(this.player)
        this.addElement(this.bomb)

    }

    // draw() {
        // this.game.context.font = "40px serif"
        // this.game.context.fillStyle = "yellow"
        // this.game.context.fillText("Game Start", 100, 200)
        // this.game.context.font = "20px serif"
        // this.game.context.fillStyle = "yellow"
        // this.game.context.fillText("Press Enter", 150, 300)
        // this.game.image(this.bg)
        // this.game.image(this.playser)
    // }

    update() {
        this.bomb.y += 2
    }
}


// var Scene = function(game) {
//     var s = {
//         game: game,
//     }
//     // initial
//     var paddle = Paddle(game)
//     var ball = Ball(game)
//
//     var score = 0
//
//     blocks = loadLevel(game, 1)
//
//     game.registerAction('ArrowLeft', function() {
//         paddle.moveLeft()
//         paddle.leftBoundary()
//     })
//     game.registerAction('ArrowRight', function() {
//         paddle.moveRight()
//         paddle.rightBoundary()
//     })
//     game.registerAction('ArrowUp', function() {
//         ball.fire()
//     })
//
//     s.draw = function() {
//         game.image(paddle)
//         game.image(ball)
//         for (var i = 0; i < blocks.length; i++) {
//             var block = blocks[i]
//             // log('draw block', block)
//             if (block.alive) {
//                 game.image(block)
//             }
//         }
//         // draw label
//         game.context.font = "20px serif"
//         game.context.fillStyle = "white"
//         game.context.fillText("Score:" + score, 10, 480)
//     }
//
//     // mouse event
//     var ballEnableDrag = false
//     var paddleEnableDrag = false
//     var blockEnableDrag = false
//     game.canvas.addEventListener('mousedown', function(event){
//         log(event)
//         var x = event.layerX
//         var y = event.layerY
//         // 检查是否点中了 ball
//         if (ball.hasPoint(x, y)) {
//             // 设置拖拽状态
//             log(x, y, 'Drag')
//             ballEnableDrag = true
//         } else if (paddle.hasPoint(x, y)) {
//             paddleEnableDrag = true
//         }
//
//         for (var i = 0; i < blocks.length; i++) {
//             var block = blocks[i]
//             // log('block', block)
//             if (block.hasPoint(x, y)) {
//                 block.blockEnableDrag = true
//             }
//         }
//     })
//
//     game.canvas.addEventListener('mousemove', function(event){
//         var x = event.offsetX
//         var y = event.offsetY
//         if (ballEnableDrag) {
//             log('Move', x, y)
//             ball.x = x
//             ball.y = y
//         } else if (paddleEnableDrag) {
//             paddle.x = x
//             paddle.y = y
//         }
//         for (var i = 0; i < blocks.length; i++) {
//             var block = blocks[i]
//             // log('block', block)
//             if (block.blockEnableDrag) {
//                 block.x = x
//                 block.y = y
//             }
//         }
//
//
//     })
//
//     game.canvas.addEventListener('mouseup', function(event){
//         ballEnableDrag = false
//         paddleEnableDrag = false
//         for (var i = 0; i < blocks.length; i++) {
//             var block = blocks[i]
//             // log('block', block)
//             block.blockEnableDrag = false
//
//         }
//
//     })
//
//     s.update = function() {
//         if (window.pause) {
//             game.context.fillText("PAUSE", 10, 10)
//             log("PAUSED")
//             return
//         }
//
//         ball.move()
//
//         if (ball.y > paddle.y + paddle.height) {
//             var end = new SceneEnd(game)
//             game.replaceScene(end)
//         }
//
//         if (paddle.collide(ball)) {
//             ball.rebound()
//         }
//
//         for (var i = 0; i < blocks.length; i++) {
//             var block = blocks[i]
//             // log('block', block)
//             if (block.collide(ball)) {
//                 log('kill')
//                 block.kill()
//                 ball.rebound()
//                 score += 100
//             }
//         }
//     }
//
//     return s
// }
