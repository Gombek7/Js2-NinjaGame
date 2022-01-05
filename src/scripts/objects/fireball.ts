import Explosion from "./Explosion"
import HittableObject from "./HittableObject"

export default class Fireball extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x, y) {
    super(scene, x, y, 'fireball')
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.flipX = true
    this.body.setSize(this.body.width * 0.4, this.body.height * 0.4)
    const body = this.body as Phaser.Physics.Arcade.Body //typescript hack
    body.setAllowGravity(false)
    scene.anims.create({
      key: 'shot',
      frames: this.anims.generateFrameNumbers('fireball', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.play('shot', true)
    this.setVelocityX(-200)

    this.body.onOverlap = true;
    scene.physics.world.on(Phaser.Physics.Arcade.Events.OVERLAP, this.overlapHandler, this);
  }

  destroy(){
    this.scene.physics.world.off(Phaser.Physics.Arcade.Events.OVERLAP, this.overlapHandler, this)
    super.destroy();
  }

  overlapHandler(fireball, object){
    if(fireball != this)
      return;
    if(object instanceof(HittableObject))
    {
      object.Hit(1);
      object.setVelocityX(-1000);
    }
    new Explosion(this.scene, this.x, this.y);

    this.destroy();
  };


}
