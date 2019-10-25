var Block = function(path) {
    var image = imageFromPath(path)
    var o = {
        image: image,
        width: 60,
        height: 20,
        x: 50,
        y: 50,
        alive: true,
    }
    o.kill = function() {
        o.alive = false
    }
    o.collide = function(b) {
        if (aInb(o, b) || aInb(b, o)) {
            return true
        }
        return false
    }
    // o.collide = function(b) {
    //     return o.alive && (aInb(o, b) || aInb(b, o))
    // }
    return o
}
