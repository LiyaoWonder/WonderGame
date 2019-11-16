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
    var fps_bar = document.getElementById('id-input-speed')
    var fps_show = document.getElementById('id-input-speed-value')
    fps_show.value = fps_bar.value
}



// 定义一个入口，在入口中初始化
var __main = function() {
    var images = {
        bullet: 'resources/img/bullet-2.png',
        planet: 'resources/img/planet.png',
        player: 'resources/img/player.png',
        sky: 'resources/img/background.png',
        enemy1: 'resources/img/enemy1.png',
        enemy2: 'resources/img/enemy_2.png',
        enemy3: 'resources/img/enemy_3.png',
        spark: 'resources/img/spark.png',
        // 多动态动画
        silence1: 'resources/img/Mario_silence/Mario_silence1.png',
        silence2: 'resources/img/Mario_silence/Mario_silence2.png',
        silence3: 'resources/img/Mario_silence/Mario_silence3.png',
        walk1: 'resources/img/Mario_walk/Mario_walk1.png',
        walk2: 'resources/img/Mario_walk/Mario_walk2.png',
        walk3: 'resources/img/Mario_walk/Mario_walk3.png',
    }
    var game = new WonderGame(30, images, function(g){
        var scene = new Scene(game)
        // var scene = new SceneTitle(game)
        // var scene = new SceneBlank(game)

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


}


__main()
