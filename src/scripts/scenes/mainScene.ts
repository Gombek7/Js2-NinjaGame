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

const platformsHeights = [130, 230, 330, 450]
const platoformsWidth = [
  0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000,
  2100, 2200, 2300, 2400
]

export default class MainScene extends Phaser.Scene {
  fpsText
  player
  enemiesWithSword
  platforms
  saws
  hearths
  fireballs
  boom
  test_crate
  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    let background = this.add.tileSprite(0, 0, 1920, 600, 'background')
    this.fpsText = new FpsText(this)
    background.setOrigin(0)
    background.setScrollFactor(0.6) //fixedToCamera = true;
    this.cameras.main.setBounds(0, 0, DEFAULT_WIDTH + 1840, DEFAULT_HEIGHT)
    this.physics.world.setBounds(0, 0, DEFAULT_WIDTH + 1840, DEFAULT_HEIGHT,true,true,false,true)

    this.player = new Player(this, 50, 100)

    this.fireballs = []
    for (let i = 0; i < 6; i++) {
      this.fireballs.push(
        new Fireball(this, 1900, platformsHeights[Math.floor(Math.random() * platformsHeights.length)] + 50)
      )
      this.physics.add.overlap(this.fireballs[i], this.player);
    }

    this.enemiesWithSword = []
    for (let i = 0; i < 4; i++) {
      this.enemiesWithSword.push(
        new EnemyWithSword(this, platoformsWidth[Math.floor(Math.random() * platoformsWidth.length)], 0)
      )
      this.physics.add.overlap(this.enemiesWithSword[i], this.player)
    }

    this.platforms = this.physics.add.staticGroup()
    for (let i = 0; i < 30; i++) {
      this.platforms.create(
        platoformsWidth[Math.floor(Math.random() * platoformsWidth.length)],
        platformsHeights[Math.floor(Math.random() * platformsHeights.length)],
        'platform'
      )
    }
    this.platforms.getChildren().forEach(c => c.setScale(0.8).setOrigin(0).refreshBody().body.checkCollision.down = false)

    this.saws = [];
    for (let i = 0; i < 10; i++) {
      this.saws.push(
        new Saw(
          this,
          platoformsWidth[Math.floor(Math.random() * platoformsWidth.length)],
          platformsHeights[Math.floor(Math.random() * platformsHeights.length)],
        ));
    }
    this.physics.add.overlap(this.saws, this.player);
    this.physics.add.overlap(this.saws, this.enemiesWithSword);

    //TODO: spawn healths on kill enemies and add overlap to player
    this.hearths = [];
    this.hearths.push(new PickableHearth(this, 300, 300));
    this.physics.add.overlap(this.hearths, this.player);

    this.test_crate= new HearthCrate(this, 50,50);
    this.physics.add.collider(this.test_crate, this.platforms)
    this.physics.add.overlap(this.player, this.test_crate)

    this.physics.add.collider(this.player, this.platforms)
    this.physics.add.collider(this.enemiesWithSword, this.platforms)
    this.physics.add.overlap(this.player, this.enemiesWithSword)
  }

  update(time, delta) {
    this.player.update(time, delta)
    this.enemiesWithSword.forEach(enemy => {
      enemy.update(time, delta);
    });
    this.saws.forEach(saw => {
      saw.update(time, delta);
    });
    this.hearths.forEach(hearth => {
      hearth.update(time, delta);
    });
    this.fpsText.update()
    this.test_crate?.update(time, delta);
  }
}
