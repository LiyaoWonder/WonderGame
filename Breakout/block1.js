var Block = function(game, position) {
    // position 是 [0, 0] 格式
    var p = position
    var img = game.imageByName('block')
    var o = {
        x: p[0],
        y: p[1],
        alive: true,
        // 注意这种有的含有参数，有的不包括参数的写法
        hp: p[2] || 1,
        blockEnableDrag: false,
    }
    o.image = img.image
    o.width = img.w
    o.height = img.h
    o.kill = function() {
        o.hp--
        if (o.hp < 1) {
            o.alive = false
        }
    }
    // o.collide = function(b) {
    //     if (aInb(o, b) || aInb(b, o)) {
    //         return true
    //     }
    //     // log('collide false')
    //     return false
    // }
    o.collide = function(b) {
        return o.alive && (collide(o, b) || collide(b, o))
    }

    o.hasPoint = function(x, y) {
        var xIn = x >= o.x && x <= o.x + o.width
        var yIn = y >= o.y && y <= o.y + o.height
        return xIn && yIn
    }
    return o
}
