var Paddle = function(path) {
    var image = imageFromPath(path)
    // o 初始化内容
    var o = {
        image: image,
        width: 100,
        height: 25,
        x: 150,
        y: 450,
        speed: 10,
    }
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

    o.collide = function(ball) {
        if (ball.y + ball.height > o.y) {
            log('ball.y + ball.height > o.y')
            // 一次有趣的 debug
            // log('o.x + o.image.width:', o.x + o.width, o.x, o.image.width)
            // log('ball.x', ball.x)
            if (ball.x > o.x && ball.x < o.x + o.width) {
                log('collide')
                return true
            }
            return false
        }

    }
    return o
}
