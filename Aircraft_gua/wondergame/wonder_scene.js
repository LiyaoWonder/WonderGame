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
        this.elements.push(img)
    }

    draw() {
        for (var i = 0; i < this.elements.length; i++) {
            var e = this.elements[i]
            // log('elements', e)
            this.game.drawImage(e)
        }
    }

    update() {

    }
}
