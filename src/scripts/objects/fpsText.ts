import UpdateList from "../scenes/UpdateList";

export default class FpsText extends Phaser.GameObjects.Text {
  camera
  constructor(scene: Phaser.Scene) {
    super(scene, 5, 5, '', { color: 'black', fontSize: '20px', fontStyle: 'bold' })
    scene.add.existing(this)
    UpdateList.push(this);
    this.setOrigin(0)

    this.setScrollFactor(0) //move with camera
  }

  public update() {
    this.setText(`fps ${Math.floor(this.scene.game.loop.actualFps)}`)
  }

  destroy(fromScene?: boolean): void {
    const index = UpdateList.indexOf(this);
		if (index > -1)
			UpdateList.splice(index, 1);
      super.destroy(fromScene);
  }
}
