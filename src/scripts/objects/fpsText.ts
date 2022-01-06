export default class FpsText extends Phaser.GameObjects.Text {
  camera
  constructor(scene: Phaser.Scene) {
    super(scene, 5, 5, '', { color: 'black', fontSize: '20px', fontStyle: 'bold' })
    scene.add.existing(this)
    this.setOrigin(0)

    this.setScrollFactor(0) //move with camera
  }

  public update() {
    this.setText(`fps ${Math.floor(this.scene.game.loop.actualFps)}`)
  }
}
