import { Time } from 'phaser'
import Explosion from './Explosion'
import HearthsUI from './HearthsUI'
import HittableObject from './HittableObject'

export default class Player extends HittableObject {
  isAttacking: boolean
  isInvulnerable: boolean
  static INVULNERABLE_TIME = 500
  static INVULNERABLE_BLINKS = 3
  static VELOCITY_TO_STOP = 20;
  static STOP_FACTOR = 0.055;
  #hearthsUI: HearthsUI
  #cursors
  #speed = 300
  #jumpSpeed = 400
  #mass = 1

  constructor(scene: Phaser.Scene, x, y) {
    super(scene, x, y, 'player_idle')
    this.setDisplaySize(75, 75)
    this.body.setMass(100)
    this.setFriction(0.5)
    this.setGravityY(500)
    this.setCollideWorldBounds(true)
    scene.cameras.main.startFollow(this)

    this.isInvulnerable = false

    scene.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('player_move', { start: 0, end: 10 }),
      frameRate: 10,
      repeat: 1
    })

    scene.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('player_idle', { start: 0, end: 5 }),
      frameRate: 5,
      repeat: -1
    })
    //TODO: jump animation
    scene.anims.create({
      key: 'attack',
      frames: this.anims.generateFrameNumbers('player_attack', { start: 0, end: 5 }),
      frameRate: 10,
      repeat: 0
    })

    this.isAttacking = false

    this.on('animationstart', (animation, frame) => {
      if (animation.key === 'attack') {
        this.isAttacking = true
      }
    })

    this.on('animationcomplete-attack', (animation, frame) => {
      this.isAttacking = false
    })

    this.#cursors = scene.input.keyboard.createCursorKeys()

    //Hp config
    this.MaxHP = 10
    this.CurrentHP = 7
    this.#hearthsUI = new HearthsUI(this.scene)
    this.#hearthsUI.update(this.CurrentHP, this.MaxHP)
  }

  update(time, delta) {
    super.update(time, delta)
    if (this.isAttacking) {
      if (this.flipX) this.setVelocityX(-this.#speed)
      else this.setVelocityX(this.#speed)
    } else if (this.#cursors.space.isDown) {
      this.anims.play('attack', true)
    } else if (this.#cursors.left.isDown) {
      this.setVelocityX(-this.#speed)
      this.anims.play('run', true)
      this.flipX = true
    } else if (this.#cursors.right.isDown) {
      this.setVelocityX(this.#speed)
      this.anims.play('run', true)
      this.flipX = false
    } else {
      this.setVelocityX(this.body.velocity.x  * delta * Player.STOP_FACTOR);
      if(Math.abs(this.body.velocity.x) < Player.VELOCITY_TO_STOP)
        this.setVelocityX(0);
      this.anims.play('idle', true)
    }
    
    const body = this.body as Phaser.Physics.Arcade.Body //typescript hack for onFloor() function
    if (this.#cursors.up.isDown && (body.touching.down || body.onFloor())) {
      this.setVelocityY(-this.#jumpSpeed)
    }
  }

  Hit(damage: number): void {
    if (this.isInvulnerable) return
    super.Hit(damage)
    this.#hearthsUI.update(this.CurrentHP, this.MaxHP)
    this.isInvulnerable = true
    setTimeout(() => (this.isInvulnerable = false), Player.INVULNERABLE_TIME)

    this.scene.tweens.add({
      targets: this,
      alpha: 0,
      ease: 'Cubic.easeOut',
      duration: Player.INVULNERABLE_TIME / (Player.INVULNERABLE_BLINKS * 2),
      repeat: Player.INVULNERABLE_BLINKS,
      yoyo: true,
      onComplete(tween, targets)
      {
        targets.forEach(e => e.alpha = 1)
      }
    })
  }
}
