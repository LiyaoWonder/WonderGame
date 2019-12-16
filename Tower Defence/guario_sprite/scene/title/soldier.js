class Soldier extends WonderImg {
    constructor(game, name) {
        name = name || 's1'
        super(game, name)
        // 在 setup 中设置所有的属性
        this.setup()
    }
    setup() {
        this.x = -this.w
        this.y = 200
        this.speed = 3
        this.maxHp = 5
        this.hp = this.maxHp
        this.destination = 500
    }
    drawLifeBar() {
        let context = this.game.context
        context.fillStyle = 'red'
        let [x, y, w, h] = [this.x, this.y - 10, this.w-20, 10]
        // 总血量
        context.fillRect(x, y, w, h)
        // 剩余血量
        context.fillStyle = 'green'
        let w1 = w * (this.hp / this.maxHp)
        context.fillRect(x, y, w1, h)
    }
    draw() {
        this.drawLifeBar()
        super.draw()
    }
    update() {
        if (this.dead) {
            return
        }
        this.x += this.speed
        if (this.x > this.destination) {
            log('敌人已经到达')
        }
    }
    beAttacked(ap) {
        // ap 就是攻击力
        this.hp -= ap
        if (this.hp <= 0) {
            this.die()
        }
    }
    die() {
        this.dead = true
        // 先应该播放闪动的动画
        this.scene.removeElement(this)
        // 这时候还应该把元素移除场景中
        log('敌人死亡')
    }
}