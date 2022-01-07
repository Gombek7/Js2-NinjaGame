import UpdateList from '../scenes/UpdateList'

export default class ScoreText extends Phaser.GameObjects.Text {
  score
  constructor(scene: Phaser.Scene) {
    super(scene, 650, 5, '', { color: 'black', fontSize: '20px', fontStyle: 'bold' })
    scene.add.existing(this)
    UpdateList.push(this)
    this.setOrigin(0)
    this.setScrollFactor(0)
    this.score = 9
  }

  increaseScore() {
    this.score = this.score + 1
  }
  updatePosition() {
    this.setStyle({ fontSize: '50px' })
    this.setPosition(100, 350)
    this.setText(`Score: ${this.score}\nPress F5 to Restart`)
    this.setStyle({ "color": "#a10000ff", "fontStyle": "bold", "stroke": "#000000ff", "strokeThickness":2,"shadow.offsetX":1,"shadow.offsetY":-1,"shadow.blur":1,"shadow.stroke":true});
  }

  public update() {
    this.setText(`Score: ${this.score}`)
  }
}
