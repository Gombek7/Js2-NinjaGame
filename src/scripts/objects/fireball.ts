import { DEFAULT_GRAVITY } from "../constants"

export default class Fireball extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x, y) {
    super(scene, x, y, 'fireball')
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.body.setSize(this.body.width * 0.4, this.body.height * 0.4) //set smaller hitbox
    const body = this.body as Phaser.Physics.Arcade.Body //typescript hack
    body.setAllowGravity(false);
    scene.anims.create({
      key: 'shot',
      frames: this.anims.generateFrameNumbers('fireball', { start: 0, end: 3 }),
      frameRate: 10
    })
    this.setVelocityX(200);
  }

  update() {
    setTimeout(() => {
      this.anims.play('shot', true)
    }, 100)
  }
}
