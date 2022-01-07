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
import {
  EnemiesLayer,
  TrapsLayer,
  PickablesLayer,
  PlayerLayer,
  DestroyablesLayer,
  PlatformsLayer
} from '../utils/CollisionLayers'
import ScoreText from '../objects/scoreText'
import GameOverText from '../objects/gameOverText'
import PickableGoldHearth from '../objects/PickableGoldHearth'
import GoldHearthCrate from '../objects/GoldHearthCrate'

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
  intervalEnemies
  intervalFireball
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

    PlayerLayer.setScene(this)
    PickablesLayer.setScene(this)
    EnemiesLayer.setScene(this)
    TrapsLayer.setScene(this)
    DestroyablesLayer.setScene(this)
    PlatformsLayer.setScene(this)

    this.player = new Player(this, 50, 100)

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

    this.addSaws()

    //TODO: spawn crates
    new PickableHearth(this, 300, 300)
    new HearthCrate(this, 50, 50)
    new PickableGoldHearth(this, 500, 300)
    new GoldHearthCrate(this, 250, 50)
  }

  addFireballs() {
    platformsHeights.forEach(h => {
      if (Math.random() > 0.4)
        new Fireball(this, DEFAULT_WIDTH + 1850, h + 50)
    })
    if (Math.random() > 0.4)
      new Fireball(this, DEFAULT_WIDTH + 1850, 80)
    /*
    for (let i = 0; i < 6; i++) {
        new Fireball(
          this,
          DEFAULT_WIDTH + 1850,
          platformsHeights[Math.floor(Math.random() * platformsHeights.length)] + 50
        )
    }*/
  }

  addEnemiesWithSword() {
    for (let i = 0; i < 4; i++) {
      this.enemiesWithSword.push(
        new EnemyWithSword(this, platoformsWidth[Math.floor(Math.random() * platoformsWidth.length)], 0, () => {
          this.scoreText.increaseScore()
        })
      )
    }
  }

  addPlatforms() {
    for (let i = 0; i < 30; i++) {
      this.platforms.create(
        platoformsWidth[Math.floor(Math.random() * platoformsWidth.length)],
        platformsHeights[Math.floor(Math.random() * platformsHeights.length)],
        'platform'
      )
    }
    this.platforms.getChildren().forEach(c => {
      c.setScale(0.8).setOrigin(0).refreshBody()
      c.body.checkCollision.down = false
      c.body.checkCollision.left = false
      c.body.checkCollision.right = false
      PlatformsLayer.add(c)
    })
  }

  addSaws() {
    for (let i = 0; i < 10; i++) {
      new Saw(
        this,
        platoformsWidth[Math.floor(Math.random() * platoformsWidth.length)],
        platformsHeights[Math.floor(Math.random() * platformsHeights.length)]
      )
    }
  }

  update(time, delta) {
    if (this.player.CurrentHP == 0) {
      clearInterval(this.intervalFireball)
      clearInterval(this.intervalEnemies)
      this.player.destroy()
      this.platforms.getChildren().forEach(c => {
        PlatformsLayer.remove(c)
        c.destroy()
      })
      TrapsLayer.objects.forEach(c => c.destroy())
      PickablesLayer.objects.forEach(c => c.destroy())
      DestroyablesLayer.objects.forEach(c => c.destroy())
      this.enemiesWithSword.forEach(c => {
        c.destroy()
      })
      //this.scene.pause() // gameobjects has no time to destroy themselves
      this.scoreText.updatePosition()
      new GameOverText(this)
    } else {
      UpdateList.forEach(o => o.update(time, delta))
      if (this.scoreText.score % 10 == 0 && this.scoreText.score != 0) {
        this.platforms.getChildren().forEach(c => {
          PlatformsLayer.remove(c)
          c.destroy()
        })
        TrapsLayer.objects.forEach(c => {
          c.destroy()
        })
        this.addPlatforms()
        this.addSaws()
        this.scoreText.increaseScore()
        console.log('a')
        //TODO RESET MAP(platforms and saws)
      }
    }
  }
}
