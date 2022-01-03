import FpsText from '../objects/fpsText'
import Player from '../objects/player'
import { DEFAULT_WIDTH, DEFAULT_HEIGHT } from '../constants'
import Fireball from '../objects/fireball'

const platformsHeights = [130, 230, 330, 450]
const platoformsWidth = [
  0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000,
  2100, 2200, 2300, 2400
]

export default class MainScene extends Phaser.Scene {
  fpsText
  player
  platforms
  fireball
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
    this.fireball = new Fireball(this, 100, 100).setGravity(0)

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
  }

  update() {
    this.player.update()
    this.fpsText.update()
    this.fireball.update()
  }
}
