/*
每一个文件，只有定义没有任何调用
 */

class Tower extends WonderImg {
    constructor(game, name) {
        name = name || 'tower1'
        super(game, name)
        // 在 setup 中设置所有的属性
        this.setup()
    }
    setup() {
        this.attack = 1
        this.attackRange = 100
        this.target = null
        // 有些参数不希望被外界访问 就用下划线标识一下
        this._cooldown = 5
        this._fireCount = 0
        this.rotation = 90
    }
    drawAttackRange() {
        //
        let context = this.game.context
        context.fillStyle = 'rgba(200, 200, 200, 0.5)'
        context.beginPath()
        // log('debug center', this, this.center())
        let v = this.center()
        context.arc(v.x, v.y, this.attackRange, 0, Math.PI * 2)
        context.fill()
    }
    draw() {
        this.drawAttackRange()
        // 后渲染图片
        super.draw()
    }
    updateRotation(target) {
        if (target !== null) {
            // target-->solider this-->tower  solider - tower
            let v = target.center().sub(this.center()).normal()
            let r = vectorBearing(v.x, v.y)
            log('rrrr', r, v.x, v.y)
            this.rotation = r
        }
    }
    update() {
        //TODO, 当敌人渐渐远去你要设置 target = null
        let target = this.target
        this.updateRotation(target)
        if (this.canAttack(target)) {
            log('攻击敌人')
            this.target.beAttacked(this.attack)
            if (this.target.dead) {
                this.target = null
            }
        }
    }
    canAttack(enemy) {
        //
        let e = enemy
        let enemyExist = e !== null && !e.dead
        if (enemyExist) {
            if (this._fireCount != 0) {
                this._fireCount --
            //  this._fireCount -= 1
                return false
            } else {
                this._fireCount = this._cooldown
                let can = this.center().distance(enemy.center()) < this.attackRange
                return can
            }
        } else {
            return false
        }
    }
    findTarget(enemies) {
        for (let e of enemies) {
            // if (this.center().distance(e.center())) {
            //   if 太长了 缩小 用函数去做
            // }
            // do what 不 do how 代码要描述做了什么，而不是怎么做的
            // 程序就是一层层的铺开 我不需要知道背后是什么
            if (this.canAttack(e)) {
                this.target = e
                break
            }
        }
    }
}