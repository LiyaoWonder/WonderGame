var Game = function() {

    var g = {
        actions: {},
        // 想要记录按键按下的状态
        keydowns: {},
    }

    var canvas = document.querySelector('#id-canvas')
    var context = canvas.getContext('2d')
    g.canvas = canvas
    g.context = context
    var canvasW = 400
    var canvasH = 500

    //
    g.image = function(gameImg) {
        g.context.drawImage(gameImg.image, 0, 0, gameImg.width, gameImg.height, gameImg.x, gameImg.y, gameImg.width, gameImg.height)
    }

    // events
    window.addEventListener('keydown', function(event) {
        g.keydowns[event.key] = true
    })
    window.addEventListener('keyup', function(event) {
        g.keydowns[event.key] = false
    })
    //
    g.registerAction = function(key, callback) {
        // 按键按下时要执行的动作保存在 actions 中
        g.actions[key] = callback
    }

    // timer
    setInterval(function() {
        // events 遍历所有的key
        var actions = Object.keys(g.actions)
        // log('actions', actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            // 如果 key 被按下 调用注册的 actions
            if (g.keydowns[key]) {
                log('key', key)
                // 错误1
                g.actions[key]()
            }
        }
        // update
        g.update()
        // clear
        context.clearRect(0, 0, g.canvas.width, g.canvas.height)
        // draw
        g.draw()
    }, 1000 / 60)

    return g
}
