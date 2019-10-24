var Paddle = function(game) {
    // var image = imageFromPath(path)
    // // o 初始化内容
    // var o = {
    //     image: image,
    //     width: 100,
    //     height: 25,
    //     x: 150,
    //     y: 450,
    //     speed: 10,
    // }
    var o = game.imageByName('paddle')

    o.width = 100
    o.height = 25
    o.x = 150
    o.y = 450
    o.speed = 10
    o.moveLeft = function() {
        o.x -= o.speed
    }
    o.moveRight = function() {
        o.x += o.speed
        log('o.x', o.x)
    }
    o.leftBoundary = function() {
        if (o.x <= -o.width) {
            // canvas width 400
            o.x = 400
        }
    }
    o.rightBoundary = function() {
        if (o.x >= 400) {
            o.x = -o.width
        }
    }

    var aInb = function(x, x1, x2) {
        return x>= x1 && x <= x2
    }

    o.collide = function(ball) {
        // if (ball.y + ball.height > o.y) {
        //     // log('ball.y + ball.height > o.y')
        //     // 一次有趣的 debug
        //     // log('o.x + o.image.width:', o.x + o.width, o.x, o.image.width)
        //     // log('ball.x', ball.x)
        //     if (ball.x > o.x && ball.x < o.x + o.width) {
        //         log('collide')
        //         return true
        //     }
        //     return false
        // }
        var a = o
        var b = ball
        if (aInb(a.x, b.x, b.x + b.width) || aInb(b.x, a.x, a.x + a.width)) {
            if (aInb(a.y, b.y, b.y + b.height) || aInb(b.y, a.y, a.y + a.height)) {
                return true
            }
        }
        return false
    }
    
    o.hasPoint = function(x, y) {
        var xIn = x >= o.x && x <= o.x + o.width
        var yIn = y >= o.y && y <= o.y + o.height
        return xIn && yIn
    }
    return o
}
