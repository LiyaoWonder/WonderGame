class WonderScene {
    constructor(game) {
        this.game = game
        this.elements = []
    }

    // 如果不喜欢 new Instance
    // static new(game) {
    //     var i = new this(game)
    //     return i
    // }
    //
    // SceneTitle.new

    addElement(img) {
        img.scene = this
        this.elements.push(img)
    }

    draw() {
        for (var e of this.elements) {
            // log('elements', e)
            // this.game.drawImage(e)
            // 抽象出来 调用他自己 自己是什么就去 draw 什么
            e.draw()
        }
    }

    update() {
        // 自动调用 update
        for (var i = 0; i < this.elements.length; i++) {
            var e = this.elements[i]
            // log('elements', e)
            // this.game.drawImage(e)
            e.update()
        }
    }
}
