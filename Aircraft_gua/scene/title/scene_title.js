class GuaLabel {
    constructor(game, text, font, color, positionX, positionY) {
        this.game = game
        this.text = text
        this.font = font
        this.color = color
        this.positionX = positionX
        this.positionY = positionY
    }
    draw() {
        this.game.context.font = this.font
        this.game.context.fillStyle = this.color
        this.game.context.fillText(this.text, this.positionX, this.positionY)
    }
    update() {

    }
}

class WonderParticle extends WonderImg {
    constructor(game) {
        super(game, 'spark')
        this.setup()
    }
    setup() {
        this.life = 60
    }
    init(x, y, vx, vy) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }
    update() {
        this.life --
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
        this.numberOfParticles = 40
        this.particles = []
    }
    update() {
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
    }
    draw() {
        for (var p of this.particles) {
            p.draw()
        }
    }
}

class SceneTitle extends WonderScene {
    constructor(game) {
        super(game)
        var labelA = new GuaLabel(game, "Game Start", "40px serif", "green", 140, 200)
        var labelB = new GuaLabel(game, "Press Enter", "20px serif", "green", 190, 300)

        this.addElement(labelA)
        this.addElement(labelB)

        game.registerAction('Enter', function() {
            var scene = new Scene(game)
            game.replaceScene(scene)
        } )

        var ps = new WonderParticleSystem(game)
        this.addElement(ps)
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
}
