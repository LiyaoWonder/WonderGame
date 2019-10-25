var Door = function(path) {
    var image = imageFromPath(path)
    var o = {
        image: image,
        width: 5,
        height: 50,
        x: 0,
        y: 300,
        collide: false,
    }

    o.collide = function(b) {
        return (aInb(o, b) || aInb(b, o))
    }

    return o
}