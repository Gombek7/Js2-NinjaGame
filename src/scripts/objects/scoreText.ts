export default class ScoreText extends Phaser.GameObjects.Text {
  score
  constructor(scene: Phaser.Scene) {
    super(scene, 650, 5, '', { color: 'black', fontSize: '20px', fontStyle: 'bold' })
    scene.add.existing(this)
    this.setOrigin(0)
    this.setScrollFactor(0)
    this.score = 0
  }

  increaseScore() {
    this.score = this.score + 1
  }
  updatePosition() {
    this.setStyle({ fontSize: '50px' })
    this.setPosition(100, 300)
    this.setText(`Score: ${this.score}\nPress F5 to Restart`)
  }

  public update() {
    this.setText(`Score: ${this.score}`)
  }
}
