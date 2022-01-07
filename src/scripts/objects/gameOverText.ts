export default class GameOverText extends Phaser.GameObjects.Text {
  constructor(scene: Phaser.Scene) {
    super(scene, 70, 200, '', { color: 'black', fontSize: '120px', fontStyle: 'bold' })
    scene.add.existing(this)
    this.setOrigin(0)
    this.setScrollFactor(0)
    this.setText('GAME OVER')
    this.setStyle({ "color": "#a10000ff", "fontSize": "120px", "fontStyle": "bold", "stroke": "#000000ff", "strokeThickness":2,"shadow.offsetX":1,"shadow.offsetY":-1,"shadow.blur":1,"shadow.stroke":true});
  }
}
