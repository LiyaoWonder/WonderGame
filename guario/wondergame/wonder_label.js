class WonderLabel {
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
