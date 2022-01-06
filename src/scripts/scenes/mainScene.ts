import FpsText from '../objects/fpsText'
import Player from '../objects/player'
import { DEFAULT_WIDTH, DEFAULT_HEIGHT } from '../constants'
import Fireball from '../objects/fireball'
import HearthsUI from '../objects/HearthsUI'
import Explosion from '../objects/Explosion'
import EnemyWithSword from '../objects/enemyWithSword'
import Saw from '../objects/Saw'
import PickableHearth from '../objects/PickableHearth'
import HearthCrate from '../objects/HearthCrate'
import UpdateList from './UpdateList'
import ScoreText from '../objects/scoreText'
import GameOverText from '../objects/gameOverText'

const platformsHeights = [130, 230, 330, 450]
const platoformsWidth = [
  0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000,
  2100, 2200, 2300, 2400
]

export default class MainScene extends Phaser.Scene {
  fpsText
  scoreText
  gameOverText
  player
  enemiesWithSword
  platforms
  saws
  hearths
  fireballs
  boom
  intervalEnemies
  intervalFireball
  test_crate
  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    let background = this.add.tileSprite(0, 0, 1920, 600, 'background')
    this.fpsText = new FpsText(this)
    this.scoreText = new ScoreText(this)
    background.setOrigin(0)
    background.setScrollFactor(0.6) //fixedToCamera = true;
    this.cameras.main.setBounds(0, 0, DEFAULT_WIDTH + 1840, DEFAULT_HEIGHT)
    this.physics.world.setBounds(0, 0, DEFAULT_WIDTH + 1840, DEFAULT_HEIGHT, true, true, false, true)

    this.player = new Player(this, 50, 100)

    this.fireballs = []
    this.addFireballs()
    this.intervalFireball = setInterval(() => {
      this.addFireballs()
    }, 5000)

    this.enemiesWithSword = []
    this.addEnemiesWithSword()
    this.intervalEnemies = setInterval(() => {
      this.addEnemiesWithSword()
    }, 5000)

    this.platforms = this.physics.add.staticGroup()
    this.addPlatforms()

    this.saws = []
    this.addSaws()

    this.physics.add.overlap(this.saws, this.player)
    this.physics.add.overlap(this.saws, this.enemiesWithSword)

    //TODO: spawn healths on kill enemies and add overlap to player
    this.hearths = []
    this.hearths.push(new PickableHearth(this, 300, 300))
    this.physics.add.overlap(this.hearths, this.player)

    this.test_crate = new HearthCrate(this, 50, 50)
    this.physics.add.collider(this.test_crate, this.platforms)
    this.physics.add.overlap(this.player, this.test_crate)

    this.physics.add.collider(this.player, this.platforms)
    this.physics.add.collider(this.enemiesWithSword, this.platforms)
  }

  addFireballs() {
    for (let i = 0; i < 6; i++) {
      this.fireballs.push(
        new Fireball(this, 1900, platformsHeights[Math.floor(Math.random() * platformsHeights.length)] + 50)
      )
    }
    this.physics.add.overlap(this.fireballs, this.player)
  }

  addEnemiesWithSword() {
    for (let i = 0; i < 4; i++) {
      this.enemiesWithSword.push(
        new EnemyWithSword(this, platoformsWidth[Math.floor(Math.random() * platoformsWidth.length)], 0, () => {
          this.scoreText.increaseScore()
        })
      )
    }
    this.physics.add.overlap(this.enemiesWithSword, this.player)
    this.physics.add.overlap(this.player, this.enemiesWithSword)
  }

  addPlatforms() {
    for (let i = 0; i < 30; i++) {
      this.platforms.create(
        platoformsWidth[Math.floor(Math.random() * platoformsWidth.length)],
        platformsHeights[Math.floor(Math.random() * platformsHeights.length)],
        'platform'
      )
    }
    this.platforms
      .getChildren()
      .forEach(c => (c.setScale(0.8).setOrigin(0).refreshBody().body.checkCollision.down = false))
  }

  addSaws() {
    for (let i = 0; i < 10; i++) {
      this.saws.push(
        new Saw(
          this,
          platoformsWidth[Math.floor(Math.random() * platoformsWidth.length)],
          platformsHeights[Math.floor(Math.random() * platformsHeights.length)]
        )
      )
    }
  }

  update(time, delta) {
    UpdateList.forEach(o => o.update(time, delta))
    if (this.scoreText.score % 10 == 0 && this.scoreText.score != 0) {
      console.log('a')
      //TODO RESET MAP(platforms and saws)
    }
    if (this.player.CurrentHP == 0) {
      clearInterval(this.intervalFireball)
      clearInterval(this.intervalEnemies)
      this.platforms.getChildren().forEach(c => c.setScale(0))
      this.saws.forEach(c => {
        c.destroy()
      })
      this.scene.pause()
      this.scoreText.updatePosition()
      new GameOverText(this)
    }
  }
}
