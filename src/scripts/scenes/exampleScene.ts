import PhaserLogo from '../objects/phaserLogo'
import FpsText from '../objects/fpsText'

export default class ExampleScene extends Phaser.Scene {
  fpsText

  constructor() {
    super({ key: 'ExampleScene' })
  }

  create() {
    new PhaserLogo(this, this.cameras.main.width / 2, 0)
    this.fpsText = new FpsText(this)

    // display the Phaser.VERSION
    this.add
      .text(this.cameras.main.width - 15, 15, `Phaser v${Phaser.VERSION}`, {
        color: '#000000',
        fontSize: '24px'
      })
      .setOrigin(1, 0)
  }

  update() {
    this.fpsText.update()
  }
}
