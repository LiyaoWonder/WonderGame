var e = sel => document.querySelector(sel)
//
// var log = function(s){
//     e('#id-text-log').value += '\n' + s
// }

var log = console.log.bind(console)

var imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}

var aInb = function(x, x1, x2) {
    return x>= x1 && x <= x2
}

var collide = function(a, b) {
    if (aInb(a.x, b.x, b.x + b.width) || aInb(b.x, a.x, a.x + a.width)) {
        if (aInb(a.y, b.y, b.y + b.height) || aInb(b.y, a.y, a.y + a.height)) {
            return true
        }
    }
    return false
}

const randomBetween = function(start, end) {
    // 左右都是闭区间
    var n = Math.random() * (end - start + 1)
    return Math.floor(n + start)
}
// var mousePoint = function(o, x, y) {
//     var xIn = x >= o.x && x <= o.x + o.width
//     var yIn = y >= o.y && y <= o.y + o.height
//     return xIn && yIn
// }
