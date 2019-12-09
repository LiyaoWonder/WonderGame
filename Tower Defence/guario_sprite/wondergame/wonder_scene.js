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
    removeElement(node) {
        // for (let e of this.elements) {
        //     if (e == node) {
        //         log('delete element', e)
        //
        //     }
        // }
        this.elements = this.elements.filter(e => {
            log('filter', e, node, e == node)
            return e != node
        })
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
        // 有 debug 就调用 否则不调用
        this.debug && this.debug()
        // 自动调用 update
        for (var i = 0; i < this.elements.length; i++) {
            var e = this.elements[i]
            // log('elements', e)
            // this.game.drawImage(e)
            e.update()
        }
    }
}
