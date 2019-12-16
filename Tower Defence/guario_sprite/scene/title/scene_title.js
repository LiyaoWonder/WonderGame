class SceneTitle extends WonderScene {
    constructor(game) {
        super(game)
        this.setup()
    }
    setup() {
        // 先初始化属性
        this.enemies = []
        this.towers = []
        this.setupBG()
        //
        this.setupTower()
        this.setupGameElements()
        // gun Head-up display HUD(ui)
        this.setupHUD()
        //
        this.setupInputs()
    }
    setupTower() {
        let t1 = new Tower(this.game, 'tower1')
        t1.x = 300
        t1.y = 270
        this.addElement(t1)
        this.towers.push(t1)
    }
    setupBG() {
        let bg = new WonderImg(this.game, 'bg')
        this.addElement(bg)
    }
    setupGameElements() {
        let e1 = new Soldier(this.game, 's1')
        this.addElement(e1)
        let e2 = new Soldier(this.game, 's1')
        e2.x = - (e2.w * 2)
        log('e2', e2.x)
        this.addElement(e2)
        //
        this.enemies.push(e1)
        this.enemies.push(e2)
    }
    setupHUD() {
        let gun = new WonderImg(this.game, 'gun')
        gun.x = 400
        gun.y = 330
        // 给一个引用
        this.gun = gun
        this.addElement(gun)
    }
    debug() {

    }
    update() {
        super.update()
        // 给所有没有 target 的 tower 寻找目标
        for (let t of this.towers) {
            if (t.target === null) {
                t.findTarget(this.enemies)
            }
        }
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
