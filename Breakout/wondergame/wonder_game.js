class WonderGame {
    constructor(fps, images, runCallback) {
        // 全局
        window.fps = fps
        this.images = images
        this.runCallback = runCallback
        this.scene = null
        this.actions = {}
        this.keydowns = {}
        this.canvas = document.querySelector('#id-canvas')
        this.context = this.canvas.getContext('2d')

        // events
        var self = this

        window.addEventListener('keydown', function(event) {
            self.keydowns[event.key] = true
        })
        window.addEventListener('keyup', event => {
            this.keydowns[event.key] = false
        })

        this.init()
    }

    image(img) {
        this.context.drawImage(img.image, img.x, img.y)
    }

    update = () => {
        this.scene.update()
    }

    draw = ()=> {
        this.scene.draw()
    }

    registerAction = (key, callback) => {
        // 按键按下时要执行的动作保存在 actions 中
        this.actions[key] = callback
    }

    runloop = () => {
        var g = this
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
        g.context.clearRect(0, 0, g.canvas.width, g.canvas.height)
        // draw
        g.draw()

        // next runloop
        // 递归的 setTimeout
        setTimeout(function(fps) {
            g.runloop()
        }, 1000 / window.fps)
    }

    init = () => {
        var g = this
        var loads = []
        // 预先载入所有图片
        var names = Object.keys(g.images)
        for (var i = 0; i < names.length; i++) {
            let name = names[i]
            var path = g.images[name]
            let img = new Image()
            img.src = path
            log('img.path', img, path)
            // 每一个图片载入成功之后都会调用一个 onload 事件
            img.onload = function() {
                log('img', img)
                // 存入 g.images 中
                g.images[name] = img
                // 所有图片都载入成功之后调用 run
                loads.push(1)
                log('image load', loads.length, names.length)
                if (loads.length == names.length) {
                    log('loads.length == names.length')
                    g.run()
                }
            }
        }
    }

    imageByName = (name) => {
        log('image by name', this.images)
        var img = this.images[name]
        var image = {
            w: img.width,
            h: img.height,
            image: img,
        }
        return image
    }

    // 开始运行程序
    run = () => {
        var g = this
        g.runCallback(this)
        // timer
        setTimeout(function(fps) {
            g.runloop()
        }, 1000 / window.fps)

    }


}

// var Game = function(fps, images, runCallback) {
//     // images 是一个对象，里面是图片的引用名字与图片的路径
//     // 程序会在所有图片载入成功之后才运行
//
//     var g = {
//         actions: {},
//         // 想要记录按键按下的状态
//         keydowns: {},
//         images: {},
//     }
//
//     var canvas = document.querySelector('#id-canvas')
//     var context = canvas.getContext('2d')
//     g.canvas = canvas
//     g.context = context
//     var canvasW = 400
//     var canvasH = 500
//
//     //
//     g.image = function(guaImage) {
//         g.context.drawImage(guaImage.image, guaImage.x, guaImage.y)
//     }
//
//     // events
//     window.addEventListener('keydown', function(event) {
//         g.keydowns[event.key] = true
//     })
//     window.addEventListener('keyup', function(event) {
//         g.keydowns[event.key] = false
//     })
//     //
//     g.registerAction = function(key, callback) {
//         // 按键按下时要执行的动作保存在 actions 中
//         g.actions[key] = callback
//     }
//
//     window.fps = fps
//
//     var runloop = function(fps) {
//         // events 遍历所有的key
//         var actions = Object.keys(g.actions)
//         // log('actions', actions)
//         for (var i = 0; i < actions.length; i++) {
//             var key = actions[i]
//             // 如果 key 被按下 调用注册的 actions
//             if (g.keydowns[key]) {
//                 log('key', key)
//                 // 错误1
//                 g.actions[key]()
//             }
//         }
//         // update
//         g.update()
//         // clear
//         context.clearRect(0, 0, g.canvas.width, g.canvas.height)
//         // draw
//         g.draw()
//
//         // next runloop
//         // 递归的 setTimeout
//         setTimeout(function(fps) {
//             runloop()
//         }, 1000 / window.fps)
//     }
//
//     var loads = []
//     // 预先载入所有图片
//     var names = Object.keys(images)
//     for (var i = 0; i < names.length; i++) {
//         let name = names[i]
//         var path = images[name]
//         let img = new Image()
//         img.src = path
//         log('img.path', img, path)
//         // 每一个图片载入成功之后都会调用一个 onload 事件
//         img.onload = function() {
//             log('img', img)
//             // 存入 g.images 中
//             g.images[name] = img
//             // 所有图片都载入成功之后调用 run
//             loads.push(1)
//             log('image load', loads.length, names.length)
//             if (loads.length == names.length) {
//                 log('loads.length == names.length')
//                 g.run()
//             }
//         }
//     }
//
//     g.imageByName = function(name) {
//         log('image by name', g.images)
//         var img = g.images[name]
//         var image = {
//             w: img.width,
//             h: img.height,
//             image: img,
//         }
//         return image
//     }
//
//
//     // 开始运行程序
//     g.run = function() {
//         runCallback(g)
//         // timer
//         setTimeout(function(fps) {
//             runloop()
//         }, 1000 / window.fps)
//
//     }
//
//
//     return g
// }
