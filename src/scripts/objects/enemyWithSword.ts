import Explosion from './Explosion'
import HittableObject from './HittableObject'

export default class EnemyWithSword extends HittableObject {
  isAttacking: boolean
  attackInterval
  constructor(scene: Phaser.Scene, x, y) {
    super(scene, x, y, 'ninja')
    this.setDisplaySize(90, 90)

    this.#resetHitbox()
    //this.setDisplaySize(150, 150)
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
        this.setSize(90, 70);
        this.body.setOffset(80,40);
      }
    })

    this.on('animationupdate', (animation, frame) => {
      if (animation.key === 'enemy_attack') {
        switch(frame.textureFrame)
        {
          case 1:
            this.setSize(60, 70);
            this.body.setOffset(110,40);
            break;
          case 2:
            this.setSize(120, 70);
            this.body.setOffset(50,40);
            break;
          case 3:
            this.setSize(160, 70);
            this.body.setOffset(0,40);
            break;
        }
      }
    })

    this.on('animationcomplete-enemy_attack', (animation, frame) => {
      this.isAttacking = false
      this.anims.play('stay', true)
      this.#resetHitbox()
    })

    this.anims.play('stay', true)
    this.attackInterval = setInterval(() => {
      this.anims.play('enemy_attack', true)
    }, 2000)

    this.body.onOverlap = true;
    scene.physics.world.on(Phaser.Physics.Arcade.Events.OVERLAP, this.overlapHandler, this);
  }

  #resetHitbox()
  {
    this.setSize(70, 100);
    this.body.setOffset(15,10);
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
    this.setDrag(0);
    clearInterval(this.attackInterval)
    this.destroy();
  }
  update(time, delta) {
    const body = this.body as Phaser.Physics.Arcade.Body //typescript hack for onFloor() function
    if(body)
    {
      if (body.touching.down || body.onFloor()) {
        this.setDragX(400);
      }
    }
    super.update(time, delta)
  }
}
