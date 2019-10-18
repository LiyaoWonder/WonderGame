var Ball = function(path) {
    var image = imageFromPath(path)
    // o 初始化内容
    var o = {
        image: image,
        width: 50,
        height: 50,
        x: 150,
        y: 200,
        speedX: 7,
        speedY: 7,
        fired: false,
    }
    o.fire = function() {
        o.fired = true
    }
    o.move = function() {
        if (o.fired) {
            if (o.x < 0 || o.x > 400) {
                o.speedX = -o.speedX
            }
            if (o.y < 0) {
                o.speedY = -o.speedY
            }
            if (o.y > 500) {
                // o.y = 0
                return false
            }
            o.x += o.speedX
            o.y += o.speedY
        }
    }
    o.rebound = function() {
        o.speedY *= -1
    }
    o.fly = function() {
        o.y = 100
        o.x = 380
    }
    return o
}