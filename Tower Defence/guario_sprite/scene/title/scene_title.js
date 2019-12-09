class SceneTitle extends WonderScene {
    constructor(game) {
        super(game)
        this.setup()
    }
    setup() {
        // 一切功能的使用，函数的定义都写入在 setup 中
        // bg
        let bg = new WonderImg(this.game, 'bg')
        this.addElement(bg)
        // gun ui
        let gun = new WonderImg(this.game, 'gun')
        gun.x = 400
        gun.y = 330
        // 给一个引用
        this.gun = gun
        this.addElement(gun)
        //
        this.setupInputs()
    }
    debug() {

    }
    update() {
        super.update()
    }
    draw() {
        // this.game.context.font = "40px serif"
        // this.game.context.fillStyle = "green"
        // this.game.context.fillText("Game Start", 140, 200)
        // this.game.context.font = "20px serif"
        // this.game.context.fillStyle = "green"
        // this.game.context.fillText("Press Enter", 190, 300)

        // 要不没有 draw 要不就是 super.draw() 否则就是覆盖
        super.draw()
    }
    setupInputs() {
        self = this
        // mouse inputs
        let startDrag = false
        this.game.registerMouse(function(event, status){
            let x = event.offsetX
            let y = event.offsetY
            if (status == 'down') {
                log('mouse x y', x, y)
                let isClicked = self.gun.pointInFrame(x, y)
                log('isClicked', isClicked)
                if (isClicked) {
                    startDrag = true
                    self.tower = self.gun.clone()

                    self.addElement(self.tower)
                }
            } else if (status == 'move') {
                self.tower.x = x
                self.tower.y = y
            } else {
                startDrag = false
                self.removeElement(self.tower)
            }
            // log('mouse event', status, event)
        })
        // keyboard inputs
    }
}
