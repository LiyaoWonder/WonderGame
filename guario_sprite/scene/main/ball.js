var Ball = function(game) {
    // var image = imageFromPath(path)
    // // o 初始化内容
    // var o = {
    //     image: image,
    //     width: 50,
    //     height: 50,
    //     x: 150,
    //     y: 200,
    //     speedX: 7,
    //     speedY: 7,
    //     fired: false,
    // }
    var o = game.imageByName('ball')
    // o 本质上只是给了图片 宽高要自己去设置
    o.width = 8
    o.height = 8
    o.x= 150
    o.y= 200
    o.speedX= 7
    o.speedY= 7
    o.fired= false
    o.dead = false

    o.fire = function() {
        o.fired = true
    }
    o.move = function() {
        if (o.fired) {
            if (o.x <= 0 || o.x >= 400 - o.width) {
                o.speedX = -o.speedX
                o.debounce = 5
            }
            if (o.y <= 0 || o.y >= 500 - o.height) {
                o.speedY = -o.speedY
                o.debounce = 5
            }
            // if (o.y > 500) {
            //     // o.y = 0
            //     // return false
            //
            // }
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
    o.hasPoint = function(x, y) {
        var xIn = x >= o.x && x <= o.x + o.width
        var yIn = y >= o.y && y <= o.y + o.height
        return xIn && yIn
    }
    return o
}
