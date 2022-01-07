import { PlayerLayer } from '../utils/CollisionLayers'
import HearthsUI from './HearthsUI'
import HittableObject from './HittableObject'

export default class Player extends HittableObject {
  isAttacking: boolean
  // hit objects once per attack
  attackedObjects: Object[]
  isInvulnerable: boolean
  static INVULNERABLE_TIME = 500
  static INVULNERABLE_BLINKS = 3
  static VELOCITY_TO_STOP = 20
  static STOP_FACTOR = 10
  static KNOCKBACK_STRENGTH = 300
  #hearthsUI: HearthsUI
  #cursors
  #speed = 300
  #jumpSpeed = 400
  #mass = 1

  constructor(scene: Phaser.Scene, x, y) {
    super(scene, x, y, 'player_idle')
    PlayerLayer.add(this)
    this.setDisplaySize(75, 75)
    this.setSize(120, 180)
    this.setOffset(40, 10)
    this.body.setMass(100)
    //this.setGravityY(500)
    this.setCollideWorldBounds(true)
    scene.cameras.main.startFollow(this)

    this.isInvulnerable = false

    scene.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('player_move', { start: 0, end: 10 }),
      frameRate: 10,
      repeat: 0
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
    this.attackedObjects = []
    this.on('animationstart', (animation, frame) => {
      if (animation.key === 'attack' && !this.isAttacking) {
        this.isAttacking = true
        this.setSize(240, 180)
        //FIXME: super speed when holding space
        this.setVelocityX(this.body.velocity.x + 0.5 * (this.flipX ? -this.#speed : this.#speed))
      }
    })

    this.on('animationcomplete-attack', (animation, frame) => {
      this.isAttacking = false
      this.attackedObjects = []
      this.setSize(120, 180)
      this.setOffset(40, 10)
    })

    this.#cursors = scene.input.keyboard.createCursorKeys()

    //Hp config
    this.#hearthsUI = new HearthsUI(this.scene)
    this.MaxHP = 5
    this.CurrentHP = 5
    this.hideHealthbar()
  }

  update(time, delta) {
    super.update(time, delta)
    if (this.#cursors.space.isDown) {
      this.anims.play('attack', true)
    } else if (this.#cursors.left.isDown) {
      this.setVelocityX(-this.#speed)
      if (!this.isAttacking) this.anims.play('run', true)
      this.flipX = true
    } else if (this.#cursors.right.isDown) {
      this.setVelocityX(this.#speed)
      if (!this.isAttacking) this.anims.play('run', true)
      this.flipX = false
    } else {
      this.setVelocityX(this.body.velocity.x * (Player.STOP_FACTOR/delta))
      if (Math.abs(this.body.velocity.x) < Player.VELOCITY_TO_STOP) this.setVelocityX(0)
      if (!this.isAttacking) this.anims.play('idle', true)
    }

    const body = this.body as Phaser.Physics.Arcade.Body //typescript hack for onFloor() function
    if (this.#cursors.up.isDown && (body.touching.down || body.onFloor())) {
      this.setVelocityY(-this.#jumpSpeed)
    }

    body.onOverlap = true
    this.scene.physics.world.on(Phaser.Physics.Arcade.Events.OVERLAP, this.overlapHandler, this)
  }
  overlapHandler(player, object) {
    if (player != this) return
    if (object instanceof HittableObject && this.isAttacking && !this.attackedObjects.includes(object)) {
      let direction = object.body.position.clone().subtract(this.body.position).normalize()
      object.body.velocity.add(direction.scale(Player.KNOCKBACK_STRENGTH))
      this.attackedObjects.push(object)
      object.Hit(1)
    }
  }
  
  set MaxHP(value: number) {
    super.MaxHP = value
    this.#hearthsUI?.update(this.CurrentHP, this.MaxHP)
  }
  get MaxHP(): number {
    return super.MaxHP
  }
  
  set CurrentHP(value: number) {
    super.CurrentHP = value;
    this.#hearthsUI?.update(this.CurrentHP, this.MaxHP)
  }
  get CurrentHP(): number {
    return super.CurrentHP
  }
  
  Hit(damage: number): void {
    if (this.isInvulnerable || this.isAttacking) return
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
      onComplete(tween, targets) {
        targets.forEach(e => (e.alpha = 1))
      }
    })
  }

  Heal(healedHP: number): void {
    super.Heal(healedHP)
    this.#hearthsUI.update(this.CurrentHP, this.MaxHP)
  }

  destroy(fromScene?: boolean): void {
    PlayerLayer.remove(this)
    this.#hearthsUI.destroy()
    super.destroy(fromScene)
  }
}
