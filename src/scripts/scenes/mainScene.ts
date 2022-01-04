import FpsText from '../objects/fpsText'
import Player from '../objects/player'
import { DEFAULT_WIDTH, DEFAULT_HEIGHT } from '../constants'
import Fireball from '../objects/fireball'
import HearthsUI from '../objects/HearthsUI'
import Explosion from '../objects/Explosion'
import EnemyWithSword from '../objects/enemyWithSword'

const platformsHeights = [130, 230, 330, 450]
const platoformsWidth = [
  0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000,
  2100, 2200, 2300, 2400
]

export default class MainScene extends Phaser.Scene {
  fpsText
  player
  enemyWithSword
  platforms
  fireball
  boom
  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    this.fpsText = new FpsText(this)
    let background = this.add.tileSprite(0, 30, 1920, 600, 'background')
    background.setOrigin(0)
    background.setScrollFactor(0.6) //fixedToCamera = true;
    this.cameras.main.setBounds(0, 0, DEFAULT_WIDTH + 1840, DEFAULT_HEIGHT)
    this.physics.world.setBounds(0, 0, DEFAULT_WIDTH + 1840, DEFAULT_HEIGHT)

    this.player = new Player(this, 50, 100)

    this.fireball = []
    for (let i = 0; i < 6; i++) {
      this.fireball.push(
        new Fireball(this, 1900, platformsHeights[Math.floor(Math.random() * platformsHeights.length)] + 50)
      )
      this.physics.add.collider(this.player, this.fireball[i], () => {
        this.boom = new Explosion(this, this.fireball[i].x, this.fireball[i].y)
        this.fireball[i].coliderWithPlayer()
        this.player.Hit()
      })
    }

    this.enemyWithSword = []
    for (let i = 0; i < 4; i++) {
      this.enemyWithSword.push(
        new EnemyWithSword(this, platoformsWidth[Math.floor(Math.random() * platoformsWidth.length)], 0)
      )
      this.physics.add.collider(this.player, this.enemyWithSword[i], () => {
        if (this.player.isAttacking) {
          this.boom = new Explosion(this, this.enemyWithSword[i].x, this.enemyWithSword[i].y)
          this.enemyWithSword[i].coliderWithPlayer()
        } else {
          this.player.Hit()
        }
      })
    }

    this.platforms = this.physics.add.staticGroup()
    for (let i = 0; i < 30; i++) {
      this.platforms.create(
        platoformsWidth[Math.floor(Math.random() * platoformsWidth.length)],
        platformsHeights[Math.floor(Math.random() * platformsHeights.length)],
        'platform'
      )
    }

    this.platforms.getChildren().forEach(c => c.setScale(0.8).setOrigin(0).refreshBody())
    this.physics.add.collider(this.player, this.platforms)
    this.physics.add.collider(this.player, this.enemyWithSword)
  }

  update() {
    this.player.update()
    this.fpsText.update()
  }
}
