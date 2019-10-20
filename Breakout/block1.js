var Block = function(path, position) {
    // position 是 [0, 0] 格式
    var p = position
    var image = imageFromPath(path)
    var o = {
        image: image,
        width: 60,
        height: 20,
        x: p[0],
        y: p[1],
        alive: true,
        // 注意这种有的含有参数，有的不包括参数的写法
        hp: p[2] || 1,
    }
    o.kill = function() {
        o.hp --
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
        return o.alive && (aInb(o, b) || aInb(b, o))
    }
    return o
}
