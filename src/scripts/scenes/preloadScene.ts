export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    //images
    this.load.image('background', 'assets/img/background.jpg')

    //sprites
    this.load.image('platform', 'assets/sprites/block.png')
    this.load.image('hearth', 'assets/sprites/hearth.png')
    this.load.image('gold_hearth', 'assets/sprites/gold_hearth.png')
    this.load.image('empty_hearth', 'assets/sprites/empty_hearth.png')
    this.load.image('hearth_crate', 'assets/sprites/hearth_crate.png')
    this.load.image('gold_hearth_crate', 'assets/sprites/gold_hearth_crate.png')
    this.load.image('saw', 'assets/sprites/saw.png')

    //spritessheets
    this.load.spritesheet('player_attack', 'assets/spritesheets/player_attack.png', {
      frameWidth: 270,
      frameHeight: 200
    })
    this.load.spritesheet('player_fire', 'assets/spritesheets/player_fire.png', { frameWidth: 200, frameHeight: 200 })
    this.load.spritesheet('player_idle', 'assets/spritesheets/player_idle.png', { frameWidth: 200, frameHeight: 200 })
    this.load.spritesheet('player_jump_attack', 'assets/spritesheets/player_jump_attack.png', {
      frameWidth: 270,
      frameHeight: 200
    })
    this.load.spritesheet('player_jump', 'assets/spritesheets/player_jump.png', { frameWidth: 200, frameHeight: 200 })
    this.load.spritesheet('player_move', 'assets/spritesheets/player_move.png', { frameWidth: 200, frameHeight: 200 })

    this.load.spritesheet('ninja', 'assets/spritesheets/ninja.png', { frameWidth: 120, frameHeight: 120 })
    this.load.spritesheet('ninja_attack', 'assets/spritesheets/ninja_attacks.png', {
      frameWidth: 180,
      frameHeight: 120
    })
    this.load.spritesheet('boom', 'assets/spritesheets/boom.png', { frameWidth: 105, frameHeight: 98 })
    // this.load.spritesheet('enemy','assets/spritesheets/enemy.png', { frameWidth: 105, frameHeight: 98 } )
    this.load.spritesheet('fireball', 'assets/spritesheets/fireball.png', { frameWidth: 109, frameHeight: 48 })
    this.load.spritesheet('explosion', 'assets/spritesheets/boom.png', { frameWidth: 103, frameHeight: 103 })
  }

  create() {
    this.scene.start('MainScene')

    /**
     * This is how you would dynamically import the mainScene class (with code splitting),
     * add the mainScene to the Scene Manager
     * and start the scene.
     * The name of the chunk would be 'mainScene.chunk.js
     * Find more about code splitting here: https://webpack.js.org/guides/code-splitting/
     */
    // let someCondition = true
    // if (someCondition)
    //   import(/* webpackChunkName: "mainScene" */ './mainScene').then(mainScene => {
    //     this.scene.add('MainScene', mainScene.default, true)
    //   })
    // else console.log('The mainScene class will not even be loaded by the browser')
  }
}
