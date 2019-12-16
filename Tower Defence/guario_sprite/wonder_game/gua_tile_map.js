class GuaTileMap {
    constructor(game) {
        this.game = game
        // 8 x 5
        // 地图就是一种数据的抽象
        this.tiles = [
            5, 4, 0, 0, 1, 0, 0, 0, 0, 0, 5, 0, 0, 0, 1,
            5, 2, 3, 0, 1, 0, 0, 0, 0, 0, 5, 0, 3, 0, 1,
            5, 2, 3, 0, 1, 0, 0, 0, 0, 0, 5, 0, 3, 0, 1,
            5, 2, 3, 0, 1, 0, 0, 0, 0, 0, 5, 0, 3, 0, 1,
            5, 2, 3, 0, 1, 0, 0, 0, 0, 0, 5, 0, 3, 0, 1,
            5, 2, 3, 0, 1, 0, 0, 0, 0, 0, 5, 0, 3, 0, 1,
            5, 2, 3, 0, 1, 0, 0, 0, 0, 0, 5, 0, 3, 0, 1,
            5, 2, 3, 0, 1, 0, 0, 0, 0, 0, 5, 0, 3, 0, 1,
            5, 2, 3, 0, 1, 0, 0, 0, 0, 0, 5, 0, 3, 0, 1,
            5, 2, 3, 0, 1, 0, 0, 0, 0, 0, 5, 0, 3, 0, 1,
            5, 2, 3, 0, 1, 0, 0, 0, 0, 0, 5, 0, 3, 0, 1,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 1,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 1,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 1,
        ]
        this.th = 15
        // tw 应该是一个整数
        this.tw = this.tiles.length / this.th
        this.tileImages = [
            new WonderImg(game, 'block1'),
            new WonderImg(game, 'block2'),
            new WonderImg(game, 'block3'),
            new WonderImg(game, 'block4'),
            new WonderImg(game, 'block5'),
        ]
        this.tileSize = 32
    }
    onTheGround(i, j) {
        let index = i * this.th + j
        let tile = this.tiles[index]
        return tile != 0
    }
    update() {

    }
    draw() {
        let h = this.th
        for (let i = 0; i < this.tiles.length; i++) {
            let index = this.tiles[i] - 1
            if (index >= 0) {
                let x = Math.floor(i / h) * this.tileSize
                let y = (i % h) * this.tileSize
                let image = this.tileImages[index]
                this.game.context.drawImage(image.texture, x, y)
            }
        }
    }
}
