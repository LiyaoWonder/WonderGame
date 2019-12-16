var enableDebugMode = function(game, enable) {
    if (!enable) {
        return
    }

    // pause 用 register 有点问题
    window.pause = false

    window.addEventListener('keydown', function(event){
        log(event)
        // event.key 写太多可以提取出来
        if (event.key == 'ArrowDown') {
            window.pause = !window.pause
        } else if ('12345678'.includes(event.key)) {
            // 临时载入关卡功能
            // blocks = loadLevel(game, Number(event.key))
        }
        // else if (event.key == '2') {
        //     blocks = loadLevel(2)
        // }
    })

    // 控制速度
    // 给 input 绑定事件
    document.querySelector('#id-input-speed').addEventListener('input', function(event) {
        var input = event.target
        // 看一下事件
        // log(event, input.value)
        window.fps = Number(input.value)
    })

    // 游戏速度显示
    // var fps_bar = document.getElementById('id-input-speed')
    // var fps_show = document.getElementById('id-input-speed-value')
    // fps_show.value = fps_bar.value
}

// 定义一个入口，在入口中初始化
var __main = function() {
    var images = {
        bg: 'resources/img/bg.png',
        gun: 'resources/img/gun.png',
        s1: 'resources/img/s2.png',
        tower1: 'resources/img/tower1.png',
    }

    var game = new WonderGame(30, images, function(g){
        // var scene = new Scene(game)s
        // var scene = new SceneEditor(game)
        var scene = new SceneTitle(game)
        /*
        记录一次错误
        sceneTitle 显示 undefined
        debug:
        log('scene title', typeof SceneTitle)
         */
        game.update =  function() {
            scene.update()
        }

        game.draw = function() {
            scene.draw()
        }

        game.replaceScene = function(s) {
            scene = s
        }
    })
    // ajax(request)



}


__main()
