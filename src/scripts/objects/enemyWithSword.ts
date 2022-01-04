import HittableObject from './HittableObject'

export default class EnemyWithSword extends HittableObject {
  isAttacking: boolean
  attackInterval
  constructor(scene: Phaser.Scene, x, y) {
    super(scene, x, y, 'player_idle')
    this.setDisplaySize(150, 150)
    this.setGravityY(500)
    this.setCollideWorldBounds(true)

    this.flipX = true
    scene.anims.create({
      key: 'stay',
      frames: this.anims.generateFrameNumbers('ninja', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: 1
    })
    scene.anims.create({
      key: 'enemy_attack',
      frames: this.anims.generateFrameNumbers('ninja_attack', { start: 0, end: 3 }),
      frameRate: 16,
      repeat: 1
    })

    this.isAttacking = false

    this.on('animationstart', (animation, frame) => {
      if (animation.key === 'attack') {
        this.isAttacking = true
      }
    })

    this.on('animationcomplete-attack', (animation, frame) => {
      this.isAttacking = false
      this.anims.play('stay', true)
    })

    this.anims.play('stay', true)
    this.attackInterval = setInterval(() => {
      this.anims.play('enemy_attack', true)
    }, 1000)
  }

  coliderWithPlayer = () => {
    clearInterval(this.attackInterval)
    this.destroy()
  }

  update() {}
}
