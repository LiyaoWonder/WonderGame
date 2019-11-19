class WonderParticle extends WonderImg {
    constructor(game) {
        super(game, 'spark')
        this.setup()
    }
    setup() {
        this.life = 20
    }
    init(x, y, vx, vy) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }
    update() {
        this.life--
        this.x += this.vx
        this.y += this.vy
        var factor = 0.01
        this.vx += factor * this.vx
        this.vy += factor * this.vy
    }
}

class WonderParticleSystem {
    constructor(game) {
        this.game = game
        this.setup()
    }
    setup() {
        this.x = 150
        this.y = 200
        this.numberOfParticles = 20
        this.particles = []
        this.duration = 30
    }
    update() {
        this.duration--
        // 添加小火花
        if (this.particles.length < this.numberOfParticles) {
            var p = new WonderParticle(this.game)
            var speed = 10
            var vx = randomBetween(-speed, speed)
            var vy = randomBetween(-speed, speed)
            p.init(this.x, this.y, vx, vy)
            this.particles.push(p)
        }
        // 更新所有的小火花
        for (var p of this.particles) {
            p.update()
        }
        // 删除死掉的小火花
        this.particles = this.particles.filter(p => p.life > 0)
    }
    draw() {
        if (this.duration < 0) {
            // 这是一个临时的方案
            // 应该从 scene 中删除自己才对
            return
        }
        for (var p of this.particles) {
            p.draw()
        }
    }
}
