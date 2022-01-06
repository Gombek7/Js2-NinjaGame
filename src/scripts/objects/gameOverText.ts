export default class GameOverText extends Phaser.GameObjects.Text {
  constructor(scene: Phaser.Scene) {
    super(scene, 70, 200, '', { color: 'black', fontSize: '120px', fontStyle: 'bold' })
    scene.add.existing(this)
    this.setOrigin(0)
    this.setScrollFactor(0)
    this.setText('GAME OVER')
  }
}
