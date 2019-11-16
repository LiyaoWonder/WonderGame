class SceneBlank extends WonderScene {
    constructor(game) {
        super(game)

        var walk = new WonderAnimation(game)
        walk.x = 100
        walk.y = 200
        this.addElement(walk)
    }
    draw() {

        // 要不没有 draw 要不就是 super.draw() 否则就是覆盖
        super.draw()
    }
}
