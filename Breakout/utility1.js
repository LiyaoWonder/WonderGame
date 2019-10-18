var log = console.log.bind(console)

var imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}

var aInb = function(a, b) {
    if (b.y > a.y && b.y < a.y + a.height) {
        if (b.x > a.x && b.x < a.x + a.width) {
            log('collide true')
            return true
        }
    }
    return false
}
