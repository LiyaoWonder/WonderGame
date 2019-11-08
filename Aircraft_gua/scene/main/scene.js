// 单例？ --> 全局变量
const config = {
    player_speed: 10,
    planet_speed: 3,
    enemy_speed: 5,
    bullet_speed: 5,
    bullet_cooldown: 10,
    planet_speed: 5,
}

class Bullet extends WonderImg {
    constructor(game) {
        super(game, 'bullet')
        this.setup()
    }
    setup() {
        this.speed = 7
    }
    update() {
        this.speed = config.bullet_speed
        this.y -= this.speed
    }
}

class Player extends WonderImg {
    constructor(game) {
        super(game, 'player')
        this.setup()
    }

    setup() {
        this.speed = 10
        this.cooldown = 0
    }

    update() {
        this.speed = config.player_speed
        if (this.cooldown > 0) {
            this.cooldown --
        }
    }

    fire() {
        if (this.cooldown == 0) {
            // 三帧之后发射
            this.cooldown =  config.bullet_cooldown
            var x = this.x + 20
            var y = this.y
            var b = new Bullet(this.game)
            b.x = x
            b.y = y
            this.scene.addElement(b)
        }
    }

    moveLeft() {
        this.x -= this.speed
    }

    moveRight() {
        this.x += this.speed
    }

    moveUp() {
        this.y -= this.speed
    }

    moveDown() {
        this.y += this.speed
    }

    leftBoundary() {
        if (this.x <= -this.width) {
            // canvas width 480
            this.x = 480
        }
    }

    rightBoundary() {
        if (this.x >= 480) {
            this.x = -this.width
        }
    }
}

const randomBetween = function(start, end) {
    // 左右都是闭区间
    var n = Math.random() * (end - start + 1)
    return Math.floor(n + start)
}

class Enemy extends WonderImg {
    constructor(game) {
        var type = randomBetween(1, 2)
        // js 自动转化为 string
        var name = 'enemy' + type
        super(game, name)
        this.setup()
    }

    setup() {
        this.speed = randomBetween(2, 5)
        // 初始化速度与初始化位置
        this.x = randomBetween(0, 350)
        this.y = randomBetween(-120, -100)
    }

    update() {
        this.y += this.speed
        if (this.y > 800) {
            // 一大于800就重置
            this.setup()
        }
    }

}

class Planet extends WonderImg {
    constructor(game) {
        super(game, 'planet')
        this.setup()
    }

    setup() {
        this.speed = randomBetween(3, 7)
        // 初始化速度与初始化位置
        this.x = randomBetween(0, 350)
        this.y = randomBetween(-700, -400)
    }

    update() {
        this.speed = config.planet_speed
        this.y += this.speed
        if (this.y > 800) {
            // 一大于800就重置
            this.setup()
        }
    }

}


class Scene extends WonderScene {
    constructor(game) {
        super(game)

        // game.registerAction('Enter', function() {
        //     var scene = Scene(game)
        //     game.replaceScene(scene)
        // } )

        this.setup()
        this.setupInputs()
    }

    setup() {
        var game = this.game
        this.bg = new WonderImg(game, 'sky')
        this.planet = new Planet(game)


        this.player = new Player(game)
        this.player.x = 70
        this.player.y = 500

        this.numberOfEnemies = 10

        this.addElement(this.bg)
        this.addElement(this.planet)
        this.addElement(this.player)
        //
        this.addEnemies()
    }

    addEnemies() {
        var enemies = []
        for (let i = 0; i < this.numberOfEnemies; i++) {
            var e = new Enemy(this.game)
            enemies.push(e)
            this.addElement(e)
        }
        this.enemies = enemies
    }

    setupInputs() {
        var g = this.game
        var s = this

        g.registerAction('ArrowLeft', function() {
            s.player.moveLeft()
            // s.player.leftBoundary()
        })
        g.registerAction('ArrowRight', function() {
            s.player.moveRight()
            // s.player.rightBoundary()
        })
        g.registerAction('ArrowUp', function() {
            s.player.moveUp()
        })
        g.registerAction('ArrowDown', function() {
            s.player.moveDown()
        })
        g.registerAction(' ', function() {
            s.player.fire()
        })
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
        super.update()
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
