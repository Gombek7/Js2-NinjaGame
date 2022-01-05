import Explosion from './Explosion'
import HittableObject from './HittableObject'

export default class EnemyWithSword extends HittableObject {
  isAttacking: boolean
  attackInterval
  constructor(scene: Phaser.Scene, x, y) {
    super(scene, x, y, 'player_idle')
    this.setDisplaySize(150, 150)
    //this.setGravityY(500)
    this.setCollideWorldBounds(true)

    this.MaxHP = 3;
    this.CurrentHP = 3;

    this.flipX = true
    scene.anims.create({
      key: 'stay',
      frames: this.anims.generateFrameNumbers('ninja', { start: 0, end: 2 }),
      frameRate: 8,
      repeat: -1
    })
    scene.anims.create({
      key: 'enemy_attack',
      frames: this.anims.generateFrameNumbers('ninja_attack', { start: 0, end: 3 }),
      frameRate: 8,
      repeat: 0
    })

    this.isAttacking = false

    this.on('animationstart', (animation, frame) => {
      if (animation.key === 'enemy_attack') {
        this.isAttacking = true
      }
    })

    this.on('animationcomplete-enemy_attack', (animation, frame) => {
      this.isAttacking = false
      this.anims.play('stay', true)
    })

    this.anims.play('stay', true)
    this.attackInterval = setInterval(() => {
      this.anims.play('enemy_attack', true)
    }, 2000)

    this.body.onOverlap = true;
    scene.physics.world.on(Phaser.Physics.Arcade.Events.OVERLAP, this.overlapHandler, this);
  }

  overlapHandler(enemy, object){
    if(enemy != this)
      return;
    if(object instanceof(HittableObject) && this.isAttacking)
    {
      object?.setVelocityX(-100);
      object.Hit(1);
    }
  };

  onDead(){
    new Explosion(this.scene, this.x, this.y);
    clearInterval(this.attackInterval)
    this.destroy();
  }
  update(time, delta) {
    super.update(time, delta)
  }
}
