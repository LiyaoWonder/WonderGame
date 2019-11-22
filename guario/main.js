var loadLevel = function(game, n){
    n = n - 1
    var level = levels[n]
    // log('level', level)
    var blocks = []
    for (var j = 0; j < level.length; j++) {
        var p = level[j]
        // log('p=', p)
        var b = Block(game, p)
        // log('b=', b)
        blocks.push(b)
    }
    return blocks
}

var blocks = []
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

const ajax = request => {
    let r = new XMLHttpRequest()
    // true 代表可以异步
    r.open(request.method, request.url, true)
    r.responseType = 'arraybuffer'
    r.onreadystatechange = event => {
        if (r.readyState == 4) {
            request.callback(r.response)
        }
    }
    r.send()
}

// 定义一个入口，在入口中初始化
var __main = function() {
    var images = {
        bg: 'resources/img/background-day.png',
        pipe: 'resources/img/pipe-green-mid.png',
        ground: 'resources/img/base.png',
        fly1: 'resources/img/yellowbird-downflap.png',
        fly2: 'resources/img/yellowbird-midflap.png',
        fly3: 'resources/img/yellowbird-upflap.png',
    }

    let request = {
        method: 'GET',
        url: 'mario.nes',
        callback(r) {
            window.bytes = new Uint8Array(r)
            log('window.bytes', window.bytes)
            var game = new WonderGame(30, images, function(g){
                // var scene = new Scene(game)
                var scene = new SceneTitle(game)

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
            enableDebugMode(game, true)
        },
    }
    ajax(request)




}


__main()
